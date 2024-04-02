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
}

export function makeBattle(p) {
  return {
    dialogBox: makeDialogBox(p, 0, 288),
    currentState: states.default,
    npc: {},
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