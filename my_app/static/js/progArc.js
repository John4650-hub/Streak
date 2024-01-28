import Phaser from "../lib/phaser.js";

export class ProgArc extends Phaser.GameObjects.Arc {
  constructor(scene, x, y, radius, startAngle, endAngle, anticlockwise) {
    super(scene, x, y, radius, startAngle, endAngle, anticlockwise);
    this.setClosePath(false)
    this.setStrokeStyle(10, 0xff0000, 1)
    this.timerTxt = scene.add.text(0, 0, "00:00", { font: '40px serif', color: '#05ff00' }).setOrigin(0)
    this.timerTxt.setFontStyle('bold');
    // this.timerTxt.setStroke('#ff66ff', 10)
    this.setOrigin(0)
    Phaser.Display.Align.In.Center(this.timerTxt, this);
    scene.add.existing(this);
  }
  upDateTimer(timerText,tm) {
    this.timerTxt.setText(timerText)
    this.endAngle -= (355/ (60 * tm))
    // this.endAngle -= (this.endAngle+89)/60
  }
  intiEndAngle(){
    this.endAngle=268
  }
}