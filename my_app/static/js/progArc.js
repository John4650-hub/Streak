import Phaser from "../lib/phaser.js";

export class ProgArc extends Phaser.GameObjects.Arc {
  constructor(scene, x, y, radius, startAngle, endAngle, anticlockwise, tim_) {
    super(scene, x, y, radius, startAngle, endAngle, anticlockwise);
    this.setClosePath(false)
    this.setStrokeStyle(10, 0xff0000, 1)
    this.timerTxt = scene.add.text(0, 0, "0" + tim_,{font:'40px serif',color:'#05ff00'}).setOrigin(0)
    this.timerTxt.setFontStyle('bold');
    // this.timerTxt.setStroke('#ff66ff', 10)
    this.setOrigin(0)
    Phaser.Display.Align.In.Center(this.timerTxt, this);

    this.drawA(tim_)
    scene.add.existing(this);
  }
  drawA(tm) {
    let ang = this.endAngle + 89
    let c_tm = tm * 60
    let len2 = true
    let secs = 59
    let mins = tm - 1

    this.scene.time.addEvent({
      delay: 1000,
      repeat: c_tm - 1,
      callback: function() {
        this.endAngle -= (ang) / c_tm
        if (secs.toString().length == 1) {
          this.timerTxt.setText(mins + " : 0" + secs)
        }
        if (secs.toString().length == 2) {
          this.timerTxt.setText(mins + " : " + secs)
        }
        if (secs == 0) {
          secs = 60
          mins -= 1
        }
        secs -= 1
      },
      callbackScope: this
    })
  }
}
// export class TimerText extends Phaser.GameObjects.Text{
//   constructor(scene, x, y, text, style){
//     super(scene, x, y, text, style)
//     scene.add.existing(this)
//   }
//   makeTick(){
//     this.scene.time.addEvent({
//       delay:1000,
//       repeat:
//     })
//   }
// }