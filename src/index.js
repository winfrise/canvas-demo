var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
  max_width = window.innerWidth,
  max_height = window.innerHeight,
  spaceHeight = max_height,
  spaceWidth = max_width,
  acc = 9.81,
  dt = 1,
  balls = [],
  ballIndex = 0,
  bounce = 0.7,
  surfaceResistance = 0.999

canvas.width = max_width
canvas.height = max_height
ctx.fillStyle = '#ccc'

window.onresize = function () {
  max_width = window.innerWidth
  max_height = window.innerHeight
  canvas.width = max_width
  canvas.height = max_height
}

var current = [],
    end = [],
    trigger = false

document.onmousedown = function (e) {
  trigger = true
  end = [e.pageX, e.pageY]
}

document.onmousemove = function (e) {
  current = [e.pageX, e.pageY]
}

document.onmouseup = function (e) {
  if (trigger) {
    new Ball(current, [(end[0] - current[0]) / 10, (end[1] - current[1]) / 10], [0, acc], 10, 20);
    new Ball(current, [(end[0] - current[0]) / 10, (end[1] - current[1]) / 10], [0, acc], 10, 20) 
  }
  trigger = false
}

function aimArrow(start, stop) {
  console.log(trigger)
  if (trigger) {
    ctx.beginPath()
    ctx.moveTo(start[0], start[1])
    ctx.lineTo(stop[0], stop[1])
    ctx.stroke()
  }
}

function Ball(position, velocity, acceleration, mass, radius) {
  this.prevPosition = position
  this.position = position
  this.velocity = velocity
  this.acceleration = acceleration
  this.mass  = mass
  this.radius = radius

  ballIndex++
  balls[ballIndex] = this
  this.Id = ballIndex

  this.calcAcceleration = function () {
    this.acceleration[1] = acc / 20
  }

  this.calcVelocity = function () {
    this.velocity[0] += this.acceleration[0]
    this.velocity[1] += this.acceleration[1]
  }

  this.calcPosition = function () {
    this.position[0] += this.velocity[0]
    this.position[1] += this.velocity[1]
    this.prevPosition = this.position
  }

  this.checkWallColisions = function () {
    if (this.position[1] >= spaceHeight - this.radius) {
      this.position[1] = spaceHeight - this.radius
      this.velocity[1] *= -bounce

      if (this.velocity[1] > -0.1 && this.velocity[1] < 0.1) {
        this.velocity[1] = 0

        this.velocity[0] * surfaceResistance
        if (Math.abs(this.velocity[0]) <= 0.1) {
          this.velocity[0] = 0
        }
      }
    } else if (this.position[1] <= this.radius) {
      this.position[1] = this.radius
      this.velocity[1] *= -bounce
    }

    if (this.position[0] <=0 + this.radius) {
      this.position[0] = 0+ this.radius
      this.velocity[0] *= -bounce
    } else if (this.position[0] >= spaceWidth - this.radius) {
      this.position[0] = spaceWidth - this.radius
      this.velocity[0] *= -bounce
    }
  }

  this.updatePosition = function () {
    this.calcAcceleration()
    this.checkWallColisions()
    this.calcVelocity()
    this.calcPosition()
  }

  this.draw = function () {
    ctx.beginPath()
    ctx.arc(this.position[0], this.position[1], this.radius, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.closePath()
  }
}

function Updater () {
  ctx.clearRect(0, 0, max_width, max_height)
  aimArrow(end, current)
  for (var i in balls) {
    balls[i].updatePosition()
    balls[i].draw()
  }
  requestAnimationFrame(Updater)
}

Updater()
