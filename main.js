new p5((p) => {
  
  let font;
  
  p.preload = () => {
    font = p.loadFont("./assets/power-clear.ttf");
  };

  p.setup = () => {
    const canvasEl = p.createCanvas(512, 384, document.getElementById("game"));
    p.pixelDensity(3);
    canvasEl.canvas.style = "";

    p.textFont(font);
  };

  p.draw = () => {

  }; 

  p.keyPressed = (keyEvent) => {

  };

  p.keyReleased = () => {

  };
});