var canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d'),
		maxWidth = window.innerWidth,
		maxHeight = window.innerHeight

	canvas.width = maxWidth
	canvas.height = maxHeight

var rockets = []
	particles = [],
	maxParticles = 400


	function Particle (ctx, x, y, r, deg, v, accX, accY) {
		this.ctx = ctx
		this.startX = x
		this.startY = y
		this.x = x
		this.y = y
		this.r = r
		this.angle = Math.PI / 180 * deg
		this.v = v
		this.vx = Math.cos(this.angle) * v
		this.vy = Math.sin(this.angle) * v
		this.accX = accX || 0
		this.accY = accY || 9.8 / 20
		this.alpha = 1
		this.fade = 0.02
		this.color = Math.floor(Math.random() * 360 / 10) * 10
		this.end = false
		this.history = []
	}
	
	Particle.prototype = {
		calcVelocity () {
			this.vx += this.accX
			this.vy += this.accY
		},
		calcPosition () {
			this.x += this.vx
			this.y += this.vy
			this.alpha -= this.fade 
			
			if (this.alpha < 0) {
				this.end = true
				this.alpha = 0
			}

			this.history.push([this.x, this.y])
			if (this.history.length > 20) {
				this.history.shift()
			}
		},
		update () {
			this.calcVelocity()
			this.calcPosition()
		},
		draw () {
			const ctx = this.ctx
	
			// ctx.fillStyle = 'green'
			ctx.globalCompositeOperation = 'lighter'
			let gradient = ctx.createRadialGradient(this.x, this.y, 0.1, this.x, this.y, this.r)
			gradient.addColorStop(0.1, `rgba(255, 255, 255 , ${ this.alpha })`)
			gradient.addColorStop(0.8, `hsla( ${this.color}, 100%, 50%, ${this.alpha})`)
			gradient.addColorStop(1, `rgba(0, 0, 0, ${ this.alpha })`)
			ctx.beginPath()
			this.history.forEach(pos => {
				if (Math.abs(pos[0] - this.x) > 5 || Math.abs(pos[1] -this.y) > 5) {
					return
				} 
				ctx.arc(pos[0], pos[1], this.r, 0, Math.PI * 2, true)
				ctx.fill()
				ctx.closePath()
			})
		},
		reset () {
			this.x = this.startX
			this.y = this.startY
			this.vx = Math.cos(this.angle) * this.v
			this.vy = Math.sin(this.angle) * this.v
			this.end = false
		}
	}


function Rocket (ctx, x, y, r, h, v, acc) {
	this.ctx = ctx
	this.startX = x
	this.startY = y
	this.startV = v
	this.x = x
	this.y = y
	this.r = r
	this.h = h || 500
	this.v = v || -18
	this.acc = acc || 9.8 / 20

	this.end = false
	this.history = []
}

Rocket.prototype = {
	calcVelocity () {
		this.v += this.acc
	},
	calcPosition () {
		this.y += this.v

		this.history.push([this.x, this.y])
		if (this.history.length > 25) {
			this.history.shift()
		}
	},
	checkHeight () {
		if (this.startY - this.y >= this.h || this.v >= 0) {
			this.end = true
			this.bomb()
		}
	},
	bomb () {
		let x = this.x
		let y = this.y
		let r = 2
		let v = -2
		let accX = 0
		let accY = 0.05

		let count = Math.floor(Math.random() * 20) + 40
		for (let i = 0; i < count; i++) {
			let deg = Math.floor(Math.random() * 360)
			particles.push(new Particle(ctx, x, y, r, deg, v, accX, accY))
		}
	},
	update () {
		this.calcVelocity()
		this.calcPosition()
		this.checkHeight()
	},
	draw () {
		const ctx = this.ctx

		this.history.forEach(pos => {
			ctx.beginPath()
			ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
			ctx.arc(pos[0], pos[1], this.r, 0, Math.PI * 2, true)
			ctx.fill()
			ctx.closePath()
		})

	},
	reset () {
		this.x = this.startX
		this.y = this.startY
		this.v = startV
		this.end = false
	}
}



;(function () {
	for (var i = 0; i < 2; i++) {
		let x = Math.random() * maxWidth
		let y = maxHeight - 100
		let r = 4
		rockets.push(new Rocket(ctx, x, y, r))
	}
})()


function render () {
	ctx.clearRect(0, 0, maxWidth, maxHeight)
	rockets.forEach(rocket => {
		if (!rocket.end) {
			rocket.update()
			rocket.draw()
		}
	})

	particles.forEach(particle => {
		if (!particle.end) {
			particle.update()
			particle.draw()
		}
	})
	requestAnimationFrame(render)
}
render()