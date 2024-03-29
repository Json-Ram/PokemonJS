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

export function drawTile(
  p,
  src,
  destinationX,
  destinationY,
  srcX,
  srcY,
  tileWidth,
  tileHeight
) {
  p.image (
    src,
    destinationX,
    destinationY,
    tileWidth,
    tileHeight,
    srcX,
    srcY,
    tileWidth,
    tileHeight
  );
}

export function isMaxOneKeyDown(p) {
  let isOnlyOneKeyDown = false;

  for (const key of [p.RIGHT_ARROW, p.LEFT_ARROW, p.UP_ARROW, p.DOWN_ARROW]) {
    
    if (!isOnlyOneKeyDown && p.keyIsDown(key)) {
      isOnlyOneKeyDown = true;
      continue;
    }

    if (isOnlyOneKeyDown && p.keyIsDown(key)) {
      return false;
    }
  }

  return true;
}

export function checkCollision(objA, objB) {
  return !(
    objA.x + objA.width < objB.x ||

    objA.x > objB.x + objB.width ||

    objA.y + objA.height < objB.y ||
    
    objA.y > objB.y + objB.height
  );
}