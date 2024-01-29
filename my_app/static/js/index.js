import Phaser from "../lib/phaser.js";
import { ProgArc } from "./progArc.js";
let opts;
let videos = [
  "asthetic-anime.mp4",
  "lo-fi-is-strange-true-colors-lo-fi-is-strange.mp4", "lofi-girl-music.mp4",
  "lofi-lofi-study.mp4", "rain-study.mp4",
  "will-smith-studying.mp4"
  ]
let dropDownList = document.createElement('select');

let DATE = new Date()
let [curDate, curMonth, curYear] = DATE.toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).split(' ')


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
  preload() {
    this.load.video("vid1", "static/images/" + videos[Math.floor(Math.random() * videos.length)], 'loadeddata', false, true)
  }
  create() {
    let vd = this.add.video(0, 0, 'vid1').setOrigin(0);
    vd.play()
    vd.setDisplaySize(this.scale.gameSize._width, this.scale.gameSize._height)
    vd.setLoop(true)
    let x_pos = this.scale.gameSize._width * 0.15
    let y_pos = this.scale.gameSize._height * 0.15
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
          vd.setLoop(false)
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
document.getElementById('app').appendChild(document.getElementById('droplist'))

let chartCtx = document.getElementById('StreakChart')
let dat = fetch('/studyOverview', {method:'GET'}).then(l=>l.json()).then(function(studyData){
  let myData=studyData[curYear][curMonth]
  let myDays=[]
  for (let i = 0; i < myData.length; i++) {
    myDays.push(`D${i}`)
  }
  new Chart(chartCtx, {
    type: 'line',
    data: {
      labels: myDays,
      datasets: [{
        label: "minutes",
        data: myData,
        borderWidth: 1
          }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
})
// const myChart = 