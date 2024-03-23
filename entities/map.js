import { getFramesPos } from "../utils";

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
      
    }
  };
}