export function makeMenu(p, menuTheme) {
  return {
    startScreenImgRef: null,
    startTextImgRef: null,
    easing: 0.5,
    alpha: 255,
    blinkBack: false,
    load() {
      this.startScreenImgRef = p.loadImage("./assets/GengarIvysaurTitle2.png");
      this.startTextImgRef = p.loadImage("./assets/start.png");
    },
    update() {
      //Blinks the "Start Game" Prompt
      if (this.alpha <= 0) this.blinkBack = true;
      if (this.alpha >= 255) this.blinkBack = false;

      if (this.blinkBack) {
        this.alpha += 0.7 * this.easing * p.deltaTime;
        return;
      }
      this.alpha -= 0.7 * this.easing * p.deltaTime;
    },
    draw() {
      menuTheme.play();
      p.clear();
      p.image(this.startScreenImgRef, 0, 0);
      p.tint(255, this.alpha);
      p.image(this.startTextImgRef, 0, 320);
      p.noTint();
    },
  };
}