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
  };
}