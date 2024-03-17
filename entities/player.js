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
  }
}