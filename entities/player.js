import { makeCharacter } from "./character.js";
import { getFramesPos } from "../utils.js";

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
      this.frames = getFramesPos(4, 4, this.tileWidth, this.tileHeight);

      this.anims = {
        "idle-down": 0,
        "idle-side": 6,
        "idle-up": 12,
        "run-down": { from: 0, to: 3, loop: true, speed: 8 },
        "run-side": { from: 4, to: 7, loop: true, speed: 8 },
        "run-up": { from: 12, to: 15, loop: true, speed: 8 },
      };
    },

    movePlayer(moveBy) {

      if (p.keyIsDown(p.RIGHT_ARROW)) {
        this.setDirection("right");
        this.setAnim("run-side");
        this.x += moveBy;
      }

      if (p.keyIsDown(p.LEFT_ARROW)) {
        this.setDirection("left");
        this.setAnim("run-side");
        this.x -= moveBy;
      }

      if (p.keyIsDown(p.UP_ARROW)) {
        this.setDirection("up");
        this.setAnim("run-up");
        this.y -= moveBy;
      }

      if (p.keyIsDown(p.DOWN_ARROW)) {
        this.setDirection("down");
        this.setAnim("run-down");
        this.y += moveBy;
      }
    },

    setup() {
      this.prepareAnims();
      this.direction = "down";
      this.setAnim("idle-down");
    },
  };
}