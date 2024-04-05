import { debugMode } from "./entities/debugMode.js";
import { makeMenu } from "./scenes/menu.js";
import { makeWorld } from "./scenes/world.js";
import { makeBattle } from "./scenes/battle.js";
import { makeEnding } from "./scenes/ending.js";

new p5((p) => {
  
  let font;

  const scenes = ["menu", "world", "battle", "ending"];
  let currentScene = "menu";

  function setScene(name) {
    if (!scenes.includes(name)) return;
    currentScene = name;
  }

  const menuTheme = new Audio("assets/menuTheme.mp3");
  const worldTheme = new Audio("assets/citySong.mp3");
  const battleTheme = new Audio("assets/battleSong.mp3");
  const endTheme = new Audio("assets/endSong.mp3");

  const menu = makeMenu(p, menuTheme);
  const world = makeWorld(p, setScene, menuTheme, worldTheme, battleTheme);
  const battle = makeBattle(p, setScene, battleTheme);
  const ending = makeEnding(p, battleTheme, endTheme);
  
  p.preload = () => {
    font = p.loadFont("./assets/power-clear.ttf");
    menuTheme.load();
    worldTheme.load();
    battleTheme.load();
    endTheme.load();
    menu.load();
    world.load();
    battle.load();
    ending.load();
  };

  p.setup = () => {
    const canvasEl = p.createCanvas(512, 384, document.getElementById("game"));
    p.pixelDensity(3);
    canvasEl.canvas.style = "";

    p.textFont(font);
    p.noSmooth();

    world.setup();
    battle.setup();
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
        battle.update();
        battle.draw();
        break;
      case "ending":
        ending.update();
        ending.draw();
      default:
    }

    debugMode.drawFpsCounter(p);
  }; 

  p.keyPressed = (keyEvent) => {

    if (keyEvent.key === "Shift") {
      debugMode.toggle();
    }

    if (keyEvent.key === "Enter" && currentScene === "menu") {
      setScene("world");
    }

    if (currentScene === "battle") battle.onKeyPressed(keyEvent);
  };

  p.keyReleased = () => {
    if (currentScene === "world") {
      world.keyReleased();
    }
  };
});