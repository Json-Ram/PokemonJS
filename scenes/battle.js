import { makeDialogBox } from "../entities/dialogBox.js"
import { makePlayer } from "../entities/player.js";
import { sleep } from "../utils.js";

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

export function makeBattle(p, setScene) {
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
        {name: "BODY SLAM", power: 40 },
        {name: "SWIFT", power: 30 },
        {name: "CRUNCH", power: 60 },
        {name: "HYPER VOICE", power: 50 },
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
        {name: "DREAM EATER", power: 60 },
        {name: "PHANTOM FORCE", power: 50 },
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
      p.push();
      p.angleMode(p.DEGREES);
      p.rotate(360);
      p.noStroke();

      if (pokemon.dataBox.healthBarLength > 50) {
        p.fill(0, 200, 0);
      }
      if (pokemon.dataBox.healthBarLength < 50) {
        p.fill(255, 165, 0);
      }
      if (pokemon.dataBox.healthBarLength < 20) {
        p.fill(200, 0, 0);
      }

      p.rect(
        pokemon.dataBox.x + pokemon.dataBox.healthBarOffset.x,
        pokemon.dataBox.y + pokemon.dataBox.healthBarOffset.y,
        pokemon.dataBox.healthBarLength,
        6
      );
      p.pop();
    },

    async dealDamage(targetPokemon, attackingPokemon) {
      targetPokemon.hp -= attackingPokemon.selectedAttack.power;
      if (targetPokemon.hp > 0) {
        targetPokemon.dataBox.healthBarLength = 
          (targetPokemon.hp * targetPokemon.dataBox.maxHealthBarLength) /
          targetPokemon.maxHp;
          return;
      }
      targetPokemon.dataBox.healthBarLength = 0;
      targetPokemon.isFainted = true;
      await sleep(1000);
      this.currentState = states.battleEnd;
    },

    load() {
      this.battleBackgroundImage = p.loadImage("assets/battle-background.png");
      this.npc.spriteRef = p.loadImage("assets/POKEMONRANGER_F.png");
      this.npcPokemon.spriteRef = p.loadImage("assets/EEVEE.png");
      this.playerPokemon.spriteRef = p.loadImage("assets/GENGAR.png");
      this.playerPokemon.dataBox.spriteRef = p.loadImage("assets/databox_thin.png");
      this.npcPokemon.dataBox.spriteRef = p.loadImage("assets/databox_thin_foe.png");

      this.dialogBox.load();
    },

    setup() {
      this.dialogBox.displayText(
        "Champion May wants to battle!",
        async () => {
          await sleep(2000);
          this.currentState = states.npcIntro;
          this.dialogBox.clearText();
          this.dialogBox.displayText(
            `Champion May sends out ${this.npcPokemon.name}.`,
            async () => {
              this.currentState = states.npcPokemonIntro;
              await sleep(2000);
              this.dialogBox.clearText();
              this.dialogBox.displayText(
                `Go get em' ${this.playerPokemon.name}!`,
                async () => {
                  this.currentState = states.playerPokemonIntro;
                  await sleep(2000);
                  this.dialogBox.clearText();
                  this.dialogBox.displayText(
                    `What will ${this.playerPokemon.name} do?`,
                    async () => {
                      await sleep(2000);
                      this.currentState = states.playerTurn;
                    }
                  );
                }
              );
            }
          );
        }
      );
      this.dialogBox.setVisibility(true);
    },

    update() {

      //Slide npc sprite into scene
      if (this.currentState === states.npcIntro) {
        this.npc.x += 0.5 * p.deltaTime;
      }

      //Slide npc pokem0n onto scene
      if (
        this.currentState === states.npcPokemonIntro &&
        this.npcPokemon.x >= this.npcPokemon.finalX
      ) {
        this.npcPokemon.x -= 0.5 * p.deltaTime;
        if (this.npcPokemon.dataBox.x <= 0) {
          this.npcPokemon.dataBox.x += 0.5 * p.deltaTime;
        }
      }

      //Slide player pokemon into scene
      if (
        this.currentState === states.playerPokemonIntro &&
        this.playerPokemon.x <= this.playerPokemon.finalX
      ) {
        this.playerPokemon.x += 0.5 * p.deltaTime;
        this.playerPokemon.dataBox.x -= 0.65 * p.deltaTime;
      }

      //Slide Fainted pokemon out of scene
      if (this.playerPokemon.isFainted) {
        this.playerPokemon.y += 0.8 * p.deltaTime;
      }

      if (this.npcPokemon.isFainted) {
        this.npcPokemon.y += 0.8 * p.deltaTime;
      }

      this.dialogBox.update();
    },

    draw() {
      p.clear();
      p.background(0);
      p.image(this.battleBackgroundImage, 0, 0);

      p.image(this.npcPokemon.spriteRef, this.npcPokemon.x, this.npcPokemon.y);

      this.drawDataBox(this.npcPokemon);

      p.image(
        this.playerPokemon.spriteRef,
        this.playerPokemon.x,
        this.playerPokemon.y
      );

      this.drawDataBox(this.playerPokemon);

      if (
        this.currentState === states.default ||
        this.currentState === states.npcIntro
      ) {
        p.image(this.npc.spriteRef, this.npc.x, this.npc.y);
      }
      
      if (
        this.currentState === states.playerTurn &&
        !this.playerPokemon.selectedAttack
      ) {
        this.dialogBox.displayTextImmediately(
          `1 - ${this.playerPokemon.attacks[0].name}        2 - ${this.playerPokemon.attacks[2].name}\n3 - ${this.playerPokemon.attacks[1].name}      4 - ${this.playerPokemon.attacks[3].name}`
        );
      }

      if (
        this.currentState === states.playerTurn &&
        this.playerPokemon.selectedAttack &&
        !this.playerPokemon.isAttacking &&
        !this.playerPokemon.isFainted
      ) {
        this.dialogBox.clearText();
        this.dialogBox.displayText(
          `${this.playerPokemon.name} used ${this.playerPokemon.selectedAttack.name} !`,
          async () => {
            await this.dealDamage(this.npcPokemon, this.playerPokemon);
            if (this.currentState !== states.battleEnd) {
              await sleep(2000);
              this.dialogBox.clearText();
              this.currentState = states.npcTurn;
            }
          }
        );
        this.playerPokemon.isAttacking = true;
      }

      if (this.currentState === states.npcTurn && !this.npcPokemon.isFainted) {
        this.npcPokemon.selectedAttack =
          this.npcPokemon.attacks[
            Math.floor(Math.random() * this.npcPokemon.attacks.length)
          ];
        this.dialogBox.clearText();
        this.dialogBox.displayText(
          `The foe's ${this.npcPokemon.name} used ${this.npcPokemon.selectedAttack.name}`,
          async () => {
            await this.dealDamage(this.playerPokemon, this.npcPokemon);
            if (this.currentState !== states.battleEnd) {
              await sleep(2000);
              this.playerPokemon.selectedAttack = null;
              this.playerPokemon.isAttacking = false;
            }
          }
        )
        this.currentState = states.playerTurn;
      }

      if (this.currentState === states.battleEnd) {
        if (this.npcPokemon.isFainted) {
          this.dialogBox.clearText();
          this.dialogBox.displayText(
            `${this.npcPokemon.name} fainted.`,
            async () => {
              await sleep(2000);
              this.currentState = states.npcIntro;
              this.dialogBox.clearText();
              this.dialogBox.displayText(
                `You've defeated Champion May.`,
                async () => {
                  await sleep(2000);
                  this.currentState = states.npcIntro;
                  this.dialogBox.clearText();
                  this.dialogBox.displayText(
                    `You're the new Champion!`
                    )
                  await sleep(2000);
                  setScene("credits");   
                  }
                )
              }
            )
          this.currentState = states.winnerDeclared;
        }

        if (this.playerPokemon.isFainted) {
          this.dialogBox.clearText();
          this.dialogBox.displayText(
            `Your ${this.playerPokemon.name} fainted.`,
            async () => {
              await sleep(2000);
              this.currentState = states.npcIntro;
              this.dialogBox.clearText();
              this.dialogBox.displayText(
                `You blacked out.`
                )
              await sleep(2000);
              setScene("credits");
              }
          );
          this.currentState = states.winnerDeclared;
        }
      }

      p.rect(0, 288, 512, 200); //draws black rectangle for pokemon to slide into scene from
      this.dialogBox.draw();
    },

    onKeyPressed(keyEvent) {
      if (this.currentState === states.playerTurn) {
        switch (keyEvent.key) {
          case "1":
            this.playerPokemon.selectedAttack = this.playerPokemon.attacks[0]
            break;
          case "2":
            this.playerPokemon.selectedAttack = this.playerPokemon.attacks[1]
            break;
          case "3":
            this.playerPokemon.selectedAttack = this.playerPokemon.attacks[2]
            break;
          case "4":
            this.playerPokemon.selectedAttack = this.playerPokemon.attacks[3]
            break;
          default:
        }
      }
    }
  };
}