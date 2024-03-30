export function makeDialogBox(p, x, y) {
  return {
    x,
    y,
    spriteRef: null,
    currentTime: 0,
    previousTime: 0,
    lineChars: null,
    line: "",
    isVisible: false,
    onCompleteCallback: null,
    isComplete: false,

    load() {
      this.spriteRef = p.loadImage("assets/overlay_message.png");
    },

    setVisibility(isVisible) {
      this.isVisible = isVisible;
    }
  };
}