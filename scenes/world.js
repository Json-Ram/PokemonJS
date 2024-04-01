import { makePlayer } from "../entities/player.js";
import { makeCamera } from "../entities/camera.js";
import { makeTiledMap } from "../entities/map.js";
import { makeNPC } from "../entities/npc.js";
import { makeDialogBox } from "../entities/dialogBox.js";

export function makeWorld(p, setScene) {
  return {
    camera: makeCamera(p, 100, 0),
    player: makePlayer(p, 0, 0),
    npc: makeNPC(p, 0, 0),
    map: makeTiledMap(p, 100, -150),
    dialogBox: makeDialogBox(p, 0, 285),
    makeScreenFlash: false,
    alpha: 0,
    blinkBack: false,
    easing: 3,

    load() {
      this.map.load("./assets/Outside.png", "./maps/world.json");
      this.player.load();
      this.npc.load();
      this.dialogBox.load();
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
        this.dialogBox.displayText(
          "Let's battle!",
          async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000 ));
            this.dialogBox.setVisibility(false);
          }
        );

        this.dialogBox.setVisibility(true);
      });

      this.dialogBox.update();

      // To do - Make Reusable func in utils 

      if (this.alpha <= 0) this.blinkBack = true;
      if (this.alpha >= 255) this.blinkBack = false;

      if (this.blinkBack) {
        this.alpha += 0.7 * this.easing * p.deltaTime;
      } else {
        this.alpha -= 0.7 * this.easing * p.deltaTime;
      }
    },

    draw() {
      p.clear();
      p.background(0);
      this.map.draw(this.camera, this.player);
      this.player.draw(this.camera);
      this.npc.draw(this.camera);
      this.dialogBox.draw();

      if (this.makeScreenFlash) {
        p.fill(0, 0, 0, this.alpha);
        p.rect(0, 0, 512, 384);
      }
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