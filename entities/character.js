export function makeCharacter(p) {
  return {
    spriteRef: null,
    anims: {},
    currentAnim: null,
    currentFrame: 0,
    currentFrameData: null,
    animationTimer: 0,
    previousTime: 0,
    tileWidth: 32,
    tileHeight: 48,
    width: 32,
    height: 32,

    setAnim(name) {
      if (this.currentAnim !== name) {
        this.currentAnim = name;
        this.currentFrame = 0;
        this.animationTrainer = 0;
        this.previousTime = 0;
      }
    },

    setDirection(direction) {
      if (this.direction !== direction) {
        this.direction = direction;
      } 
    },

    setAnimFrame(animData) {
      if (typeof animData === "number") {
        this.currentFrame = animData;
        return this.frames[this.currentFrame];
      }

      if (this.currentFrame === 0) {
        this.currentFrame = animData.from;
      }
    }
  };
}