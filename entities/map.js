import { drawTile, getFramesPos } from "../utils.js";
import { makeCollidable } from "./collidable.js";

export function makeTiledMap(p, x, y) {
  return {
    tileWidth: 32,
    tileHeight: 32,
    x,
    y,

    async load(tilesetURL, tiledMapURL) {
      this.mapImage = p.loadImage(tilesetURL);
      const response = await fetch(tiledMapURL);
      this.tiledData = await response.json();
    },

    prepareTiles() {
      this.tilesPos = getFramesPos(8, 502, this.tileWidth, this.tileHeight); //update params with res of tileset / 32
    },

    getSpawnPoints() {
      for (const layer of this.tiledData.layers) {
        if (layer.name === "SpawnPoints") {
          return layer.objects;
        }
      }
    },

    draw(camera, player) {
      for (const layer of this.tiledData.layers) {
        if (layer.type === "tilelayer") {
          const currentTilePos = {
            x: this.x,
            y: this.y
          };
          
          let numberOfTilesDrawn = 0;

          for (const tileNumber of layer.data) {
            if (numberOfTilesDrawn % layer.width === 0) {
              currentTilePos.x = this.x;
              currentTilePos.y += this.tileHeight;              
            } else {
              currentTilePos.x += this.tileWidth;
            }

            numberOfTilesDrawn++;

            if (tileNumber === 0) continue;

            drawTile(
              p,
              this.mapImage,
              Math.round(currentTilePos.x + camera.x),
              Math.round(currentTilePos.y + camera.y),
              this.tilesPos[tileNumber - 1].x,
              this.tilesPos[tileNumber - 1].y,
              this.tileWidth,
              this.tileHeight
              );
          }
        }

        if (layer.type === "objectgroup" && layer.name === "Boundaries") {
          for (const boundary of layer.objects) {
            const collidable = makeCollidable(
              p,
              this.x + boundary.x,
              this.y + boundary.y + 32,
              boundary.width,
              boundary.height
            );

            collidable.preventPassthroughFrom(player);
            collidable.update(camera);
            collidable.draw();
          }
        }
      }
    }
  };
}