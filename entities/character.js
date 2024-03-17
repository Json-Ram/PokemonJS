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
  };
}