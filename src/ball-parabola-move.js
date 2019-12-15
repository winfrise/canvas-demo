var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    maxWidth = window.innerWidth,
    maxHeight = window.innerHeight,
    balls = [],
    endBalls = []

    canvas.width = maxWidth
    canvas.height = maxHeight

/**
 * 小球对象
 * @param {*} x - 小球 x 轴开始坐标
 * @param {*} y - 小球 y 轴开始坐标
 * @param {*} r - 小球半径
 * @param {*} color - 小球颜色
 * @param {*} deg - 小球运动的角度
 * @param {*} velocity  - 小球速度
 * @param {*} acceleration  - 加速度
 * @param {*} mass - 小球重量
 */
function Ball (x, y, r, color, deg, velocity, mass, accelerationX, accelerationY) {
  this.end = false
  this.startX   = x
  this.startY = y
  this.x = x
  this.y = y
  this.r = r
  this.color = color
  this.angle = Math.PI / 180 * deg // 度数转为弧度
  this.velocity = velocity
  this.velocityX = Math.cos(this.angle) * velocity
  this.velocityY = Math.sin(this.angle) * velocity
  this.mass = mass || 10
  this.accelerationX = accelerationX || 0
  this.accelerationY = accelerationY || 9.8 / 20 // 默认为重力加速度(9.8)
}

Ball.prototype = {
  /**
   * 计算速度
   */
  calcVelocity () {
    this.velocityX += this.accelerationX
    this.velocityY += this.accelerationY
  },

  /**
   * 计算小球是否出界
   */
  checkWallColisions () {
    if (this.x < 0 || this.x > maxWidth || this.y > maxHeight) {
      this.end = true
    }
  },
  /**
   * 计算位置
   */
  calcPosition () {
    this.x += this.velocityX
    this.y += this.velocityY
  },

  update () {
    this.calcVelocity()
    this.calcPosition()
    this.checkWallColisions()
  },

  draw () {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.closePath()
  },

  reset () {
    this.x = this.startX
    this.y = this.startY
    this.velocityX = Math.cos(this.angle) * this.velocity
    this.velocityY = Math.sin(this.angle) * this.velocity
    this.end = false
  }
}

/**
 * 创建小球
 */
;(function () {
  var x = 400,
      y = 400,
      r = 20,
      angle 
  for (var i = 0; i < 20; i++) {
    angle = Math.random() * 360
    balls.push(new Ball(x, y, r, 'red', angle, 6))
  }
})()

function render () {
  ctx.clearRect(0, 0, maxWidth, maxHeight)

  if (balls.length === 0) {
    balls = endBalls.slice(0)
    endBalls = []
  }

  balls.forEach((ball, index) => {
    if (!ball.end) {
      ball.update()
      ball.draw()
    } else {
      let endBall = balls.splice(index, 1)[0]
      endBall.reset()
      endBalls.push(endBall) // 移除已结束的小球
    }
  })    

  requestAnimationFrame(render)
}
render()

