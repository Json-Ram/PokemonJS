import { makeCharacter } from "./character.js";

export function makePlayer(p, x, y) {
  return {
    ...makeCharacter(p),
    speed: 200,
    x,
    y,
    screenX: x,
    screenY: y,
    spriteX: 0,
    spriteY: -15,
    freeze: false,
    
    load() {
      this.spriteRef = p.loadImage("./assets/boy_run.png");
    },

    prepareAnims() {
      

      this.anims = {
        "idle-down": 0,
        "idle-side": 6,
        "idle-up": 12,
        "run-down": { from: 0, to: 3, loop: true, speed: 8 },
        "run-side": { from: 4, to: 7, loop: true, speed: 8 },
        "run-up": { from: 12, to: 15, loop: true, speed: 8 },
      };
    },
  }
}