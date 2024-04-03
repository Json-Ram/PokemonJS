import { makeDialogBox } from "../entities/dialogBox.js"

const states = {
  default: "default",
  npcIntro: "npc-intro",
  npcPokemonIntro: "npc-pokemon-intro",
  playerPokemonIntro: "player-pokemon-intro",
  playerTurn: "player-turn",
  playerAttack: "player-attack",
  npcTurn: "npc-turn",
  battleEnd: "battle-end",
  winnerDeclared: "winner-declared"
};

function makePokemon(
  name,
  x,
  finalX,
  y,
  maxHp,
  attacks,
  dataBox
) {
  return {
    name,
    x,
    finalX,
    y,
    spriteRef: null,
    maxHp,
    hp: maxHp,
    attacks,
    selectedAttack: null,
    isFainted: false,
    dataBox
  };
}

function makeDataBox(
  x,
  y,
  nameX,
  nameY,
  healthBarX,
  healthBarY
) {
  return {
    x,
    y,
    nameOffset: {
      x: nameX,
      y: nameY
    },
    healthBarOffset: {
      x: healthBarX,
      y: healthBarY
    },
    spriteRef: null,
    maxHealthBarLength: 96, // Shows total health
    healthBarLength: 96 // Shows current health
  };
}

export function makeBattle(p) {
  return {
    dialogBox: makeDialogBox(p, 0, 288),
    currentState: states.default,
    npc: {
      x: 350,
      y: 20,
      spriteRef: null
    },
    npcPokemon: makePokemon(
      "EEVEE",
      600,
      310,
      20,
      200, //health
      [
        {name: "BODY SLAM", power: 60 },
        {name: "SWIFT", power: 40 },
        {name: "CRUNCH", power: 80 },
        {name: "HYPER VOICE", power: 100 },
      ],
      makeDataBox(-300, 40, 15, 30, 118, 40)
    ),
    playerPokemon: makePokemon(
      "GENGAR",
      -170,
      20,
      128,
      200, //health
      [
        {name: "SHADOW BALL", power: 90 },
        {name: "SUCKER PUNCH", power: 20 },
        {name: "HYPER BEAM", power: 120 },
        {name: "THUNDERBOLT", power: 70 },
      ],
      makeDataBox(510, 220, 38, 30, 136, 40)
    ),

    drawDataBox(pokemon) {
      //Draws pokemon name within dataBox image
      p.image(pokemon.dataBox.spriteRef, pokemon.dataBox.x, pokemon.dataBox.y);
      p.text(
        pokemon.name,
        pokemon.dataBox.x + pokemon.dataBox.nameOffset.x,
        pokemon.dataBox.y + pokemon.dataBox.nameOffset.y
      );

      //Draws pokemon health bar
    },

    async dealDamage(targetPokemon, attackingPokemon) {

    },

    load() {

    },

    setup() {

    },

    update() {

    },

    draw() {

    },

    onKeyPressed(keyEvent) {

    }
  };
}