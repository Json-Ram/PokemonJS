export function makeCollidable(p, x, y, width, height) {
  return {
    x,
    y,
    screenX: x,
    screenY: y,
    width,
    height,

    preventPassthroughFrom(entity) {

    },

    update(camera) {

    },

    draw() {
      
    }
  }
}