let canv = document.getElementById('canv')
let monthDOm = document.getElementById('month')
let mvRight = document.getElementById('mvRight')
let mvLeft = document.getElementById('mvLeft')
let longestStrk = document.getElementById('longestStrk')
let currentStreak = document.getElementById('currentStreak')
let daysLnd = document.getElementById('DaysLnd')
let ctx = canv.getContext('2d')
const RADIUS = 5
const HEIGHT = 22
const WIDTH = 22
const DATE = new Date()
let month = DATE.getMonth()
let year = DATE.getFullYear()
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function drawSquare(posX, posY, fillColour = null, alpha = 0.5) {

  ctx.beginPath()
  ctx.strokeStyle = 'black'

  ctx.moveTo(posX, posY + RADIUS);
  ctx.arcTo(posX, posY + HEIGHT, posX + RADIUS, posY + HEIGHT, RADIUS);
  ctx.arcTo(posX + WIDTH, posY + HEIGHT, posX + WIDTH, posY + HEIGHT - RADIUS, RADIUS);
  ctx.arcTo(posX + WIDTH, posY, posX + WIDTH - RADIUS, posY, RADIUS);
  ctx.arcTo(posX, posY, posX, posY + RADIUS, RADIUS);
  ctx.fillStyle = fillColour
  ctx.fill()
  ctx.stroke();
}
let columns = canv.width / 12
let rows = canv.height / 6

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}


let data = await readData()

function foo(mth) {
  let colourAlphas = []
  let n;
  n = data[`${year}`]
  if (n != undefined && n[`${months[mth]}`] != undefined) {
    n = n[`${months[mth]}`]
    n.forEach((m) => {
      colourAlphas.push(m / 10)
    })
  }
  return colourAlphas
}


class viewStreak {
  constructor(m, y, alphas = []) {
    this.month = m
    this.yr = y
    this.alps = alphas
  }
  create() {

    let days = daysInMonth(this.month, this.yr) + 1
    if (this.alps.length != days) {
      let looptimes = days - this.alps.length
      for (let i = 0; i < looptimes; i++) {
        this.alps.push(0)
      }
    }
    let x = 0
    let y = 0
    ctx.clearRect(0, 0, canv.width, canv.height)
    for (let i = 0; i < days; i++) {
      if (Math.round(x) == canv.width) {
        x = 0
        y += rows
      }
      else {
        drawSquare(x, y + 5, `rgba(0,160,0,${this.alps[i]}`)
        x += columns;
      }
    }
    monthDOm.textContent = months[this.month] + ', ' + this.yr

  }
}
new viewStreak(month, year, foo(month)).create()
mvRight.addEventListener('click', function() {
  month -= 1
  if (month == -1) {
    month += 12
    year -= 1
    new viewStreak(month, year, foo(month)).create()
  } else {
    new viewStreak(month, year, foo(month)).create()
  }
})

mvLeft.addEventListener('click', function() {
  month += 1
  if (month == 12) {
    month = 0
    year += 1
    new viewStreak(month, year, foo(month)).create()
  }
  else {
    new viewStreak(month, year, foo(month)).create()
  }
})

function addStreakValue() {
  let overallLength = 0;

  for (let y in data) {
    for (let m in data[y]) {
      overallLength += data[y][m].length;
    }
  }
  return overallLength
}
longestStrk.textContent = currentStreak.textContent = addStreakValue() + ' days';
let target = 1000
daysLnd.textContent = Math.round((addStreakValue() / target) * 100) + '%'



async function readData() {
  return fetch('data.json')
    .then(res => res.json())
    .then(jsonResponse => jsonResponse)
}