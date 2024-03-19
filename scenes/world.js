import { makeCamera } from "../entities/camera.js";
import { makePlayer } from "../entities/player.js";

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
      this.player.update();
      this.camera.update();
    },

    draw() {
      p.clear();
      this.player.draw(this.camera);
    }
  };
}