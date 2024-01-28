import Phaser from "../lib/phaser.js";
import { ProgArc } from "./progArc.js";

let dropDownList = document.createElement('select');
let DATE = new Date()

let [curDate, curMonth, curYear] = DATE.toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).split(' ')

let opts;
for (let i = 1; i <= 10; i++) {
  opts = document.createElement('option')
  opts.innerText = i * 30
  opts.setAttribute('value', i * 30)
  dropDownList.appendChild(opts)
}
document.getElementById('droplist').appendChild(dropDownList)


class progress_bar extends Phaser.Scene {
  constructor() {
    super({ key: "progress_bar" })
  }
  create() {
    let x_pos = 90
    let y_pos = 100
    let rad_sz = 150
    let circle = this.add.circle(x_pos, y_pos, rad_sz).setOrigin(0)
    circle.setStrokeStyle(5, 0xffffff, 1);
    let arc = new ProgArc(this, x_pos, y_pos, rad_sz, -90, 268, false)

    document.getElementById('startBtn').addEventListener('click', function() {
      let timeTaken = dropDownList.value
      arc.intiEndAngle()
      let foo = new EventSource(`/stream/${timeTaken}`)
      foo.onmessage = function(event) {
        if (event.data == 'done') {
          foo.close(); // Close the connection when the timer is done
          fetch('/saveTimeSpent', {
            method: 'POST',
            headers: {
              'content-type': "application/json"
            },
            body: JSON.stringify({
              "curMonth": curMonth,
              "curDate": curDate,
              "curYear": curYear,
              "timeTaken": timeTaken
            })
          })
        } else {
          arc.upDateTimer(event.data, timeTaken); // Update the timer
        }
      };
    })
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
  parent: 'app',
  width: 440,
  height: 440,
  scale: {
    mode: Phaser.Scale.FIT
  },

  scene: [progress_bar]
};
var game = new Phaser.Game(config);