// 4. The "Comic Sans" Curse
// Font switches to Comic Sans after 30s idle or when window is inactive.
// Moving the mouse lifts the curse.

(function () {
  const IDLE_MS = 30_000;
  let idleTimer = null;
  let cursed = false;

  function applyCurse() {
    if (cursed) return;
    cursed = true;
    document.body.style.fontFamily = '"Comic Sans MS", "Comic Sans", cursive';
  }

  function liftCurse() {
    if (!cursed) return;
    cursed = false;
    document.body.style.fontFamily = '';
    resetIdleTimer();
  }

  function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(applyCurse, IDLE_MS);
  }

  // Idle timer resets on any mouse move; curse lifts on mouse move
  document.addEventListener('mousemove', () => {
    liftCurse();
    resetIdleTimer();
  });

  // Curse immediately when window loses focus, lift when it regains it
  window.addEventListener('blur', applyCurse);
  window.addEventListener('focus', () => {
    liftCurse();
    resetIdleTimer();
  });

  // Start the timer on page load
  resetIdleTimer();
})();
