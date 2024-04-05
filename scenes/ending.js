export function makeEnding(p, battleTheme, endTheme) {
  return {
    line:null,

    load() {
      this.endScreenImgRef = p.loadImage("assets/credits.png");
      this.line = `     And that's it folks!\nThank you for playing. :)`;
    },

    update() {
      //future use
    },

    draw() {
      battleTheme.pause();
      endTheme.play();
      p.clear();
      p.image(this.endScreenImgRef, 0, 0);
      p.fill("black");
      p.textSize(24);
      p.text(this.line, 150, 150);
    }
  };
}