export function makeDebugMode() {
  return {
    enabled: false,

    drawFpsCounter(p) {
      if (!this.enabled) return;
      p.push();
      p.fill("yellow");
      p.textSize(24);
      p.text(Math.trunc(p.frameRate()), 10, 20);
      p.pop();
    },

    toggle() {
      this.enabled = !this.enabled;
    }
  }
}