import { makeMenu } from "./scenes/menu.js";

new p5((p) => {
  
  let font;

  const scenes = ["menu", "world", "battle"];
  const currentScene = "menu";

  function setScene(name) {
    if (!scenes.includes(name)) return;
    currentScene = name;
  }

  const menu = makeMenu(p);
  
  p.preload = () => {
    font = p.loadFont("./assets/power-clear.ttf");
    menu.load();
  };

  p.setup = () => {
    const canvasEl = p.createCanvas(512, 384, document.getElementById("game"));
    p.pixelDensity(3);
    canvasEl.canvas.style = "";

    p.textFont(font);
    p.noSmooth();
  };

  p.draw = () => {
    switch (currentScene) {
      case "menu":
        menu.update();
        menu.draw();
        break;
      case "world":
        //to do
        break;
      case "battle":
        //to do
        break;
      default:
    }
  }; 

  p.keyPressed = (keyEvent) => {
    if (keyEvent.key === "Enter" && currentScene === "menu") {
      setScene("world");
    }
  };

  p.keyReleased = () => {

  };
});