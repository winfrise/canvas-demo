var canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      maxWidth = window.innerWidth,
      maxHeight = window.innerHeight

var pieces = []

canvas.width = maxWidth
canvas.height = maxHeight

class Piece {
  constructor (ctx, x, y, r, v, accX, accY, deg, tailLength) {
    this.ctx = ctx
    this.startX  = x
    this.startY = y
    this.x = x  || 0
    this.y = y  || 0
    this.r = r || 2
    this.v = v || 4
    this.accX = accX
    this.accY = accY
    this.angle = Math.PI / 180 * deg
    this.velocityY = Math.cos(this.angle) * v
    this.velocityX = Math.sin(this.angle) * v
    this.tailLength = tailLength  || 60
    this.opacity = 1
  }
  
  calcVelocity () {
    this.velocityX += this.accX
    this.velocityY += this.accY
  }

  calcPosition () {
    this.x += this.velocityX
    this.y -= this.velocityY
    this.opacity -= 0.015
  }

  update () {
    this.calcVelocity()
    this.calcPosition()
  }

  draw () {
    let { ctx, x, y, r, angle, startX, startY, history } = this
    let tailLen  = this.tailLength // 尾巴长度
    let dist = Math.sqrt((x - startX) * (x - startX) + (y - startY) * (y - startY))
    if (dist < tailLen) {
      tailLen = dist
    }

    ctx.beginPath()
    ctx.fillStyle = `rgba(100, 0, 130, ${this.opacity})`
    ctx.arc(x, y, r, angle, Math.PI + angle, true)
    ctx.lineTo(x - Math.sin(angle) * tailLen, y + Math.cos(angle) * tailLen)
    ctx.save()
    ctx.closePath()
    ctx.fill()
  }
}

;(function () {
  setInterval(function () {
    pieces = []
    initPieces()
  }, 2000)
  initPieces()

  function initPieces () {
    function createPieces (startDeg = 0) {
      let x = 500,
      y = 500,
      r = 10,
      v = 4,
      accX = 0,
      accY = 0
      for (let i = 0; i < 12; i++) {
        deg = 30 * i
        pieces.push(new Piece(ctx, x, y, r, v, accX, accY, startDeg + deg)) // ctx, x, y, r, v, accX, accY, deg 
      }
    }
  
    createPieces()
  
    setTimeout(function () {
      createPieces(15)
    }, 200)
  
    setTimeout(function () {
      createPieces(0)
    }, 500)
  }



})()


function render () {
  ctx.clearRect(0, 0, maxWidth, maxHeight)

  pieces.forEach(piece => {
    if (!piece.end) {
      piece.update()
      piece.draw()
    }
  })

  window.requestAnimationFrame(render)
}
render()