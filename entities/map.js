import { drawTile, getFramesPos } from "../utils";

export function makeTiledMap(p, x, y) {
  return {
    tileWidth: 32,
    tileHeight: 32,
    x,
    y,

    async load(tilesetURL, tiledMapURL) {
      this.mapImage = p.loadImage(tilesetURL);
      const response = await fetch(tiledMapURL);
      this.tileData = await response.json();
    },

    prepareTiles() {
      this.tilePos = getFramesPos(8, 55, this.tileWidth, this.tileHeight);
    },

    getSpawnPoints() {
      for (const layer of this.tileData.layers) {
        if (layer.name === "SpawnPoints") {
          return layer.objects;
        }
      }
    },

    draw(camera, player) {
      for (const layer of this.tileData.layers) {
        if (layer.type ===  "tilelayer") {
          const currentTilePos = {
            x: this.x,
            y: this.y
          }
          
          let numberOfTilesDrawn = 0;
          for (const tileNumber of layer.data) {
            if (numberOfTilesDrawn % layer.width === 0) {
              currentTilePos.x = this.x;
              currentTilePos.y = this.tileHeight;              
            } else {
              currentTilePos.x += this.tileWidth;
            }

            numberOfTilesDrawn++;

            if (tileNumber === 0) continue;

            drawTile(
              p,
              this.mapImage,
              Math.round(currentTilePos.x + camera.x),
              Math.round(currentTilePos.y),
              this.tilePos[tileNumber - 1].x,
              this.tilePos[tileNumber - 1].y,
              this.tileWidth,
              this.tileHeight
              );
          }
        }

        if (layer.type === "objectgroup" && layer.name === "Boundaries") {
          for (const boundary of layer.objects) {
            const collidable = 0; // placeholder
          }
        }
      }
    }
  };
}