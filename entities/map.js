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

    },

    getSpawnPoints() {

    },

    draw(camera, player) {
      
    }
  };
}