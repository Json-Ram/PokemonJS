import { makePlayer } from "../entities/player.js";
import { makeCamera } from "../entities/camera.js";
import { makeTiledMap } from "../entities/map.js";
import { makeNPC } from "../entities/npc.js";

export function makeWorld(p, setScene) {
  return {
    camera: makeCamera(p, 100, 0),
    player: makePlayer(p, 0, 0),
    npc: makeNPC(p, 0, 0),
    map: makeTiledMap(p, 100, -150),

    load() {
      this.map.load("./assets/Outside.png", "./maps/world.json");
      this.player.load();
      this.npc.load();
    },

    setup() {
      this.map.prepareTiles();
      const spawnPoints = this.map.getSpawnPoints();

      for (const spawnPoint of spawnPoints) {
        switch (spawnPoint.name) {
          case "Player":
            this.player.x = this.map.x + spawnPoint.x;
            this.player.y = this.map.y + spawnPoint.y + this.map.tileHeight;
            break;
          case "Npc":
            this.npc.x = this.map.x + spawnPoint.x;
            this.npc.y = this.map.y + spawnPoint.y + this.map.tileHeight;
            break;
          default:
        }
      }

      this.player.setup();
      this.camera.attachTo(this.player);

      this.npc.setup();
    },

    update() {
      this.camera.update();
      this.player.update();
      this.npc.update();
      this.npc.handleCollisionsWith(this.player, () => {
        console.log("collision");
      });
    },

    draw() {
      p.clear();
      p.background(0);
      this.map.draw(this.camera, this.player);
      this.player.draw(this.camera);
      this.npc.draw(this.camera);
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