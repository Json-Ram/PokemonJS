import { makePlayer } from "../entities/player.js";
import { makeCamera } from "../entities/camera.js";

export function makeWorld(p, setScene) {
  return {
    camera: makeCamera(p, 100, 0),
    player: makePlayer(p, 0, 0),

    load() {
      this.player.load();
    },

    setup() {
      this.player.setup();
      this.camera.attachTo(this.player);
    },

    update() {
      this.camera.update();
      this.player.update();
    },

    draw() {
      p.clear();
      p.background(0);
      p.rect(100 + this.camera.x, 100 + this.camera.y, 50, 50);
      this.player.draw(this.camera);
    },

    keyReleased() {
      for (const key of [
        p.RIGHT_ARROW,
        p.LEFT_ARROW,
        p.UP_ARROW,
        p.DOWN_ARROW,
      ]) {
        if (p.keyIsDown(key)) {
          return;
        }
      }

      switch (this.player.direction) {
        case "up":
          this.player.setAnim("idle-up");
          break;
        case "down":
          this.player.setAnim("idle-down");
          break;
        case "left":
        case "right":
          this.player.setAnim("idle-side");
          break;
        default:
      }
    }
  };
}