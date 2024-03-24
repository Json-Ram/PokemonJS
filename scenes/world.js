import { makePlayer } from "../entities/player.js";
import { makeCamera } from "../entities/camera.js";
import { makeTiledMap } from "../entities/map.js";

export function makeWorld(p, setScene) {
  return {
    camera: makeCamera(p, 100, 0),
    player: makePlayer(p, 0, 0),
    npc: null,
    map: makeTiledMap(p, 100, -150),

    load() {
      this.map.load("./assets/Trainer Tower interior.png", "./maps/world.json");
      this.player.load();
    },

    setup() {
      this.map.prepareTiles();
      const spawnPoints = this.map.getSpawnPoints();

      for (const spawnPoint of spawnPoints) {
        switch (spawnPoint.name) {
          case "Player":
            this.player.x = this.map.x + spawnPoint.x;
            this.player.y = this.map.y + spawnPoint.y + 32
            break;
          case "npc":
            //this.npc.x = spawnPoint.x;
            //this.player.y = this.map.y + spawnPoint.y + 32
            break;
          default:
        }
      }

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
      this.map.draw(this.camera, this.player);
      //p.rect(100 + this.camera.x, 100 + this.camera.y, 50, 50);
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