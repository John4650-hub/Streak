import Phaser from "../lib/phaser.js";
import { ProgArc } from "./progArc.js";

class progress_bar extends Phaser.Scene {
  constructor() {
    super({ key: "progress_bar" })
  }

  create() {
    let x_pos = 90
    let y_pos = 100
    let rad_sz = 150
    let tim_ = 3
    let circle = this.add.circle(x_pos, y_pos, rad_sz).setOrigin(0)
    circle.setStrokeStyle(5, 0xffffff, 1);
    let arc = new ProgArc(this, x_pos, y_pos, rad_sz, -90, 268, false, tim_)
    // let tim = new TimerText(this,x_pos,y_pos,tim_,{})
    //, endAngle, anticlockwise, fillColor);
    // var arc
  }
}

class Streak extends Phaser.Scene {
  constructor() {
    super({ key: 'Streak' })
  }
  create() {

  }
}

var config = {
  type: Phaser.AUTO,
  // parent: 'progress',
  width: 440,
  height: 640,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },

  scene: [progress_bar]
};
var game = new Phaser.Game(config);
// game.events.off('hidden',game.onHidden,game)
// game.events.off('visible',game.onVisible,game)
// game.events.off('blur',game.onBlur,game)
// game.events.off('focus',game.onFocus,game)