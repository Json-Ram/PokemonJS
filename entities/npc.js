import { getFramesPos } from "../utils.js";
import { makeCharacter } from "./character.js";

export function makeNPC(p, x, y) {
  return {
    ...makeCharacter(p),
    x,
    y,
    screenX: x,
    screenY: y,
    spriteX: 0,
    spriteY: -15,
    
    load() {
      this.spriteRef = p.loadImage("assets/char_f.png");
    },

    prepareAnims() {
      this.frames = getFramesPos(4, 4, this.tileWidth, this.tileHeight);

      this.anims = {
        "idle-down": 0,
      };
    }
  };
}