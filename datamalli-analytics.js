/* datamalli.fi — ensimmäisen osapuolen anonyymi käyttöanalytiikka.
 *
 * Eventit lähetetään GET-pyyntöinä staattiseen /dm-e.gif-kuvaan, jolloin ne
 * päätyvät Apachen access-logiin, jonka olemassa oleva ETL-putki jo hakee.
 * Ei collector-backendia, ei evästeitä, ei pysyvää tunnistetta, ei kolmansia
 * osapuolia. Sessio-id elää vain sessionStoragessa (poistuu kun välilehti
 * suljetaan). IP:tä/selaintietoja ei koskaan tallenneta eventtiriveille
 * tietokannassa (pudotetaan ETL-parsinnassa).
 *
 * Eventit:
 *   page_view  — sivulataus (+ referrer)
 *   click      — klikkaus seurattavaan objektiin
 *   impression — objekti oli näkyvissä viewportissa; dur = näyttöaika ms.
 *                Aika kertyy vain kun välilehti on esillä; min 1 s, katto 120 s
 *                per altistus (parkkeerattu välilehti ei kerrytä).
 *   hover      — hiiri/näppäimistöfokus objektin päällä; dur = kesto ms, min 300 ms.
 *
 * Seurattavat objektit: joko eksplisiittinen <div data-dm-object="termi-x">
 * tai termistösivun valmis rakenne <dl class="termi" id="termi-x"> — id toimii
 * objektitunnisteena, joten termikortteihin ei tarvita lisäattribuutteja.
 */
(function () {
  "use strict";

  // Automatisoidut selaimet (testit, botit joilla webdriver-lippu) ohitetaan.
  if (navigator.webdriver) return;

  var BEACON_PATH = "/dm-e.gif";
  var SCHEMA_VERSION = 1;
  var OBJECT_SELECTOR = "[data-dm-object], dl.termi[id]";
  var IMPRESSION_MIN_MS = 1000;
  var IMPRESSION_CAP_MS = 120000;
  var HOVER_MIN_MS = 300;
  var HOVER_CAP_MS = 120000;

  function objectId(el) {
    return el.getAttribute("data-dm-object") || el.id || null;
  }

  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    // Vanhojen selainten varapolku (ei kryptografisesti vahva, riittää anonyymiksi tunnisteeksi)
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  // Sessio-id: vain sessionStorage — kuolee välilehden mukana. Jos tallennus on
  // estetty (private mode tms.), pudotaan muistinvaraiseen id:hen.
  var sid;
  try {
    sid = sessionStorage.getItem("dm_sid");
    if (!sid) {
      sid = uuid();
      sessionStorage.setItem("dm_sid", sid);
    }
  } catch (e) {
    sid = uuid();
  }
  var plid = uuid();

  function send(type, extra) {
    var params = [
      "v=" + SCHEMA_VERSION,
      "t=" + type,
      "sid=" + sid,
      "plid=" + plid,
      "ts=" + Date.now(),
      "pt=" + encodeURIComponent(location.pathname),
      "vw=" + window.innerWidth,
      "vh=" + window.innerHeight,
    ];
    for (var key in extra) {
      if (extra[key] !== undefined && extra[key] !== null) {
        params.push(key + "=" + encodeURIComponent(extra[key]));
      }
    }
    var url = BEACON_PATH + "?" + params.join("&");
    // GET fetch keepalive:llä toimii myös pagehide-tilanteissa; Image-varapolku
    // vanhoille selaimille. cache no-store estää selainta vastaamasta välimuistista.
    if (window.fetch) {
      fetch(url, { method: "GET", keepalive: true, mode: "no-cors", cache: "no-store" }).catch(function () {});
    } else {
      new Image().src = url;
    }
  }

  // --- Impressiot: näyttöaika viewportissa --------------------------------
  //
  // Per objekti: visibleSince (ms-aikaleima kun tuli näkyviin, null jos ei
  // näkyvissä) + acc (kertynyt aika tästä altistuksesta). Aika kertyy vain kun
  // document on esillä; välilehden piilotus sulkee altistuksen ja lähettää
  // eventin. Yksi impression-eventti per altistus (enter->exit), EI heartbeatteja.
  var impState = new WeakMap();
  var intersecting = []; // elementit jotka ovat juuri nyt viewportissa

  function isDocVisible() {
    return document.visibilityState === "visible";
  }

  // Iso kortti mobiilissa voi olla viewportia korkeampi, jolloin 50 % kortista
  // ei koskaan mahdu ruudulle — silloin riittää että kortti täyttää ≥ 50 %
  // viewportin korkeudesta.
  function isElementVisible(entry) {
    return entry.isIntersecting &&
      (entry.intersectionRatio >= 0.5 ||
       entry.intersectionRect.height >= window.innerHeight * 0.5);
  }

  function startExposure(el) {
    var st = impState.get(el);
    if (st && st.visibleSince === null) st.visibleSince = Date.now();
  }

  function closeExposure(el, emit) {
    var st = impState.get(el);
    if (!st) return;
    if (st.visibleSince !== null) {
      st.acc += Date.now() - st.visibleSince;
      st.visibleSince = null;
    }
    if (emit) {
      var dur = Math.min(st.acc, IMPRESSION_CAP_MS);
      if (dur >= IMPRESSION_MIN_MS) {
        send("impression", { oid: objectId(el), dur: dur });
      }
      st.acc = 0;
    }
  }

  function setupImpressions(elements) {
    if (!window.IntersectionObserver) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var el = entry.target;
        var idx = intersecting.indexOf(el);
        if (isElementVisible(entry)) {
          if (idx === -1) intersecting.push(el);
          if (isDocVisible()) startExposure(el);
        } else {
          if (idx !== -1) intersecting.splice(idx, 1);
          closeExposure(el, true); // altistus päättyi -> eventti
        }
      });
    }, { threshold: [0, 0.25, 0.5, 0.75] });

    elements.forEach(function (el) {
      impState.set(el, { visibleSince: null, acc: 0 });
      observer.observe(el);
    });

    document.addEventListener("visibilitychange", function () {
      if (isDocVisible()) {
        // Välilehti taas esiin: käynnistä kello uudelleen näkyvillä oleville.
        intersecting.forEach(startExposure);
      } else {
        // Piilotus sulkee altistukset ja lähettää kertyneet (keepalive-GET
        // ehtii perille vaikka välilehti suljettaisiin).
        intersecting.forEach(function (el) { closeExposure(el, true); });
      }
    });
    window.addEventListener("pagehide", function () {
      intersecting.forEach(function (el) { closeExposure(el, true); });
    });
  }

  // --- Hover/korostus: hiiri tai näppäimistöfokus objektin päällä ----------
  function setupHover(elements) {
    elements.forEach(function (el) {
      var since = null;
      function start() {
        if (since === null) since = Date.now();
      }
      function stop() {
        if (since === null) return;
        var dur = Math.min(Date.now() - since, HOVER_CAP_MS);
        since = null;
        if (dur >= HOVER_MIN_MS) send("hover", { oid: objectId(el), dur: dur });
      }
      el.addEventListener("mouseenter", start);
      el.addEventListener("mouseleave", stop);
      el.addEventListener("focusin", start);  // näppäimistönavigointi = sama signaali
      el.addEventListener("focusout", stop);
    });
  }

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  onReady(function () {
    send("page_view", { r: document.referrer ? document.referrer.slice(0, 300) : null });

    // Yksi delegoitu kuuntelija kaikille seurattaville objekteille.
    document.addEventListener("click", function (ev) {
      var el = ev.target && ev.target.closest ? ev.target.closest(OBJECT_SELECTOR) : null;
      if (!el) return;
      var oid = objectId(el);
      if (oid) send("click", { oid: oid.slice(0, 200) });
    });

    var elements = Array.prototype.slice.call(document.querySelectorAll(OBJECT_SELECTOR));
    setupImpressions(elements);
    setupHover(elements);
  });
})();
