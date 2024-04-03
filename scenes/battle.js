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
    ncpPokemon: {},
    playerPokemon: {},

    drawDataBox() {

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