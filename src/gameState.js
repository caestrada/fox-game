import { modFox, modScene } from "./ui.js";
import { RAIN_CHANCE, SCENES } from "./constants.js";

const gameState = {
  current: "INIT",
  clock: 1,
  wakeTime: -1,

  tick() {
    this.clock++;
    console.log('clock', this.clock);


    if (this.clock === this.wakeTime) {
      this.wake();
    }

    return this.clock;
  },
  startGame() {
    console.log('hatching');
    this.current = 'HATCHING';
    this.wakeTime = this.clock + 3;
    modFox('egg');
    modScene('day');
  },
  wake() {
    console.log('awoken');
    this.current = 'IDLING';
    this.wakeTime = -1;
    modFox('idling');
    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
    modScene(SCENES[this.scene]);
  },
  handleUserAction(icon) {
    if(['SLEEP', 'FEEDING', 'CELEBRATING', 'HATCHING'].includes(this.current)) {
      // do nothing
      return;
    }

    if(this.current === 'INIT' || this.current === 'DEAD') {
      this.startGame();
      return;
    }

    switch(icon) {
      case 'weather':
        this.changeWeather();
        break;

      case 'poop':
        this.cleanUpPoop();
        break;

      case 'fish':
        this.feed();
        break;
    }
  },
  changeWeather() {
    console.log('changeWeather');
  },
  cleanUpPoop() {
    console.log('cleanUpPoop');
  },
  feed() {
    console.log('feed');
  }
};

export const handleUserAction = gameState.handleUserAction.bind(gameState);
export default gameState;
