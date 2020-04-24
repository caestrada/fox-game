import game from "./gameState";
const TICK_RATE = 3000;

function init() {
  console.log('starting game');

  let nextTimeToTick = Date.now();

  function nextAnimationFrame() {
    const now = Date.now();

    if (nextTimeToTick <= now) {
      game.tick();
      nextTimeToTick = now + TICK_RATE;
    }

    requestAnimationFrame(nextAnimationFrame);
  }

  // All browsers have the animationFrame function built into them.
  requestAnimationFrame(nextAnimationFrame);
}

init();
