import { makeMenu } from "./scenes/menu.js";
import { makeWorld } from "./scenes/world.js";

new p5((p) => {
  
  let font;

  const scenes = ["menu", "world", "battle"];
  let currentScene = "menu";

  function setScene(name) {
    if (!scenes.includes(name)) return;
    currentScene = name;
  }

  const menu = makeMenu(p);
  const world = makeWorld(p, setScene);
  
  p.preload = () => {
    font = p.loadFont("./assets/power-clear.ttf");
    menu.load();
    world.load();
  };

  p.setup = () => {
    const canvasEl = p.createCanvas(512, 384, document.getElementById("game"));
    p.pixelDensity(3);
    canvasEl.canvas.style = "";

    p.textFont(font);
    p.noSmooth();

    world.setup();
  };

  p.draw = () => {
    switch (currentScene) {
      case "menu":
        menu.update();
        menu.draw();
        break;
      case "world":
        world.update();
        world.draw();
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
    if (currentScene === "world") {
      world.keyReleased();
    }
  };
});