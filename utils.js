export function getFramesPos(spriteCols, spriteRows, tileWidth, tileHeight) {
  const framesPos = [];
  
  let currentTileX = 0;
  let currentTileY = 0;

  for (let i = 0; i < spriteRows; i++) {
    for (let j = 0; j < spriteCols; j++) {
      framesPos.push({ x: currentTileX, y: currentTileY });
      currentTileX += tileWidth;
    }
    currentTileX = 0;
    currentTileY += tileHeight;
  }

  return framesPos;

}