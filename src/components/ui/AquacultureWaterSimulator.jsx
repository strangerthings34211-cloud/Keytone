import React, { useEffect, useRef } from 'react'

/**
 * AquacultureWaterSimulator - High-performance dynamic canvas simulation
 * featuring realistic swimming fish and Vannamei prawns/shrimp with organic
 * movement, light caustics, and aeration bubbles for aquaculture showcase.
 */
export default function AquacultureWaterSimulator({
  className = "absolute inset-0 pointer-events-none z-[2]",
  opacity = 0.85,
  speciesCount = { fish: 7, prawns: 6, bubbles: 35 },
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth)
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight)

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }
    window.addEventListener('resize', handleResize)

    // ── 1. Realistic Fish Class ──────────────────────────────────────────
    class SwimmingFish {
      constructor() {
        this.reset(true)
      }

      reset(initial = false) {
        this.direction = Math.random() > 0.4 ? 1 : -1 // 1 = swim right, -1 = swim left
        this.x = initial
          ? Math.random() * width
          : this.direction === 1
          ? -80
          : width + 80
        this.y = Math.random() * (height * 0.85) + height * 0.05
        this.size = Math.random() * 22 + 18 // Fish body size
        this.speed = (Math.random() * 0.8 + 0.65) * this.direction
        this.targetSpeed = this.speed
        this.wiggleSpeed = Math.random() * 0.08 + 0.08
        this.wiggleOffset = Math.random() * Math.PI * 2
        this.depth = Math.random() * 0.6 + 0.4 // Depth perspective (0.4 = far/dim, 1 = near/vibrant)
        this.verticalOscillation = Math.random() * 0.4 + 0.2
        this.angle = 0
        this.turnTimer = Math.random() * 300 + 100
        this.hue = Math.random() > 0.5 ? '180, 85%, 65%' : '160, 80%, 60%' // Cyan / Teal aquaculture tone
      }

      update(time) {
        this.x += this.speed
        this.y += Math.sin(time * 0.002 + this.wiggleOffset) * this.verticalOscillation

        // Periodic natural turns or swimming bursts
        this.turnTimer--
        if (this.turnTimer <= 0) {
          this.turnTimer = Math.random() * 400 + 200
          this.targetSpeed = (Math.random() * 0.9 + 0.6) * this.direction
        }
        this.speed += (this.targetSpeed - this.speed) * 0.02

        // Wrap around boundaries smoothly
        if (this.direction === 1 && this.x > width + 120) {
          this.reset(false)
        } else if (this.direction === -1 && this.x < -120) {
          this.reset(false)
        }
      }

      draw(ctx, time) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.scale(this.direction * this.depth, this.depth)

        const wiggle = Math.sin(time * this.wiggleSpeed + this.wiggleOffset)
        const alpha = 0.35 * this.depth

        // Ambient bioluminescent fish aura
        const glow = ctx.createRadialGradient(0, 0, 2, 0, 0, this.size * 1.6)
        glow.addColorStop(0, `hsla(${this.hue}, ${alpha * 0.8})`)
        glow.addColorStop(1, `hsla(${this.hue}, 0)`)
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(0, 0, this.size * 1.6, 0, Math.PI * 2)
        ctx.fill()

        // Fish Body Path
        ctx.fillStyle = `hsla(${this.hue}, ${alpha})`
        ctx.strokeStyle = `hsla(180, 95%, 85%, ${alpha * 0.9})`
        ctx.lineWidth = 1.2

        ctx.beginPath()
        // Head & Body curve
        ctx.moveTo(this.size * 1.2, 0)
        ctx.bezierCurveTo(
          this.size * 0.6,
          -this.size * 0.45,
          -this.size * 0.3,
          -this.size * 0.35,
          -this.size * 0.8,
          wiggle * 4
        )
        // Tail junction
        ctx.lineTo(-this.size * 1.3, wiggle * 9 - this.size * 0.4)
        // Forked caudal tail fin
        ctx.lineTo(-this.size * 1.05, wiggle * 6)
        ctx.lineTo(-this.size * 1.35, wiggle * 9 + this.size * 0.4)
        ctx.lineTo(-this.size * 0.8, wiggle * 4)
        // Ventral belly curve
        ctx.bezierCurveTo(
          -this.size * 0.3,
          this.size * 0.35,
          this.size * 0.6,
          this.size * 0.45,
          this.size * 1.2,
          0
        )
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        // Dorsal fin (Top)
        ctx.fillStyle = `hsla(170, 90%, 75%, ${alpha * 0.7})`
        ctx.beginPath()
        ctx.moveTo(-this.size * 0.1, -this.size * 0.38)
        ctx.quadraticCurveTo(
          -this.size * 0.4,
          -this.size * 0.75 + wiggle * 2,
          -this.size * 0.65,
          -this.size * 0.25
        )
        ctx.closePath()
        ctx.fill()

        // Pectoral fin
        ctx.beginPath()
        ctx.moveTo(this.size * 0.2, 0)
        ctx.quadraticCurveTo(
          0,
          this.size * 0.5 + Math.sin(time * 0.1) * 3,
          -this.size * 0.25,
          this.size * 0.2
        )
        ctx.closePath()
        ctx.fill()

        // Eye with shiny reflection
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 1.5})`
        ctx.beginPath()
        ctx.arc(this.size * 0.8, -this.size * 0.1, 2, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      }
    }

    // ── 2. Realistic Vannamei Prawn / Shrimp Class ───────────────────────
    class SwimmingPrawn {
      constructor() {
        this.reset(true)
      }

      reset(initial = false) {
        this.direction = Math.random() > 0.45 ? 1 : -1
        this.x = initial
          ? Math.random() * width
          : this.direction === 1
          ? -90
          : width + 90
        this.y = Math.random() * (height * 0.8) + height * 0.1
        this.size = Math.random() * 20 + 22 // Prawn length
        this.speed = (Math.random() * 0.65 + 0.45) * this.direction
        this.depth = Math.random() * 0.5 + 0.5
        this.swimCycle = Math.random() * 10
        this.antennaeOffset = Math.random() * Math.PI
        this.boostTimer = Math.random() * 250 + 150
      }

      update(time) {
        this.swimCycle += 0.08
        this.x += this.speed

        // Gentle arched prawn glide and occasional tail kick
        this.y += Math.sin(this.swimCycle * 0.7) * 0.35

        this.boostTimer--
        if (this.boostTimer <= 0) {
          // Prawn swift kick forward
          this.boostTimer = Math.random() * 300 + 180
          this.speed = (Math.random() * 1.1 + 0.8) * this.direction
        } else {
          const normalSpeed = (0.55 * this.direction)
          this.speed += (normalSpeed - this.speed) * 0.02
        }

        if (this.direction === 1 && this.x > width + 130) {
          this.reset(false)
        } else if (this.direction === -1 && this.x < -130) {
          this.reset(false)
        }
      }

      draw(ctx, time) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.scale(this.direction * this.depth, this.depth)

        const alpha = 0.38 * this.depth
        const swimmeretWiggle = Math.sin(time * 0.015 + this.swimCycle)

        // Soft Translucent Prawn Body (Vannamei segmented curved carapace)
        ctx.fillStyle = `hsla(185, 75%, 70%, ${alpha * 0.75})`
        ctx.strokeStyle = `hsla(175, 90%, 85%, ${alpha * 0.95})`
        ctx.lineWidth = 1.1

        // 1. Rostrum & Head (Cephalothorax)
        ctx.beginPath()
        ctx.moveTo(this.size * 1.3, -this.size * 0.1) // Pointed Rostrum serrated tip
        ctx.lineTo(this.size * 0.6, -this.size * 0.3)
        ctx.quadraticCurveTo(0, -this.size * 0.45, -this.size * 0.4, -this.size * 0.3)
        ctx.quadraticCurveTo(-this.size * 0.8, -this.size * 0.1, -this.size * 1.1, swimmeretWiggle * 2)
        // Tail Uropods (Fan)
        ctx.lineTo(-this.size * 1.45, -this.size * 0.25 + swimmeretWiggle * 3)
        ctx.lineTo(-this.size * 1.3, swimmeretWiggle * 2)
        ctx.lineTo(-this.size * 1.45, this.size * 0.25 + swimmeretWiggle * 3)
        ctx.lineTo(-this.size * 1.0, this.size * 0.1)
        // Curved Abdomen Segments
        ctx.quadraticCurveTo(-this.size * 0.5, this.size * 0.3, 0, this.size * 0.25)
        ctx.quadraticCurveTo(this.size * 0.7, this.size * 0.15, this.size * 1.3, -this.size * 0.1)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        // 2. Translucent Internal Organs / Hepatopancreas highlight (Golden Bio Glow)
        ctx.fillStyle = `rgba(45, 212, 191, ${alpha * 0.9})`
        ctx.beginPath()
        ctx.arc(this.size * 0.35, -this.size * 0.08, this.size * 0.18, 0, Math.PI * 2)
        ctx.fill()

        // 3. Waving Long Antennae
        ctx.strokeStyle = `hsla(180, 100%, 80%, ${alpha * 0.85})`
        ctx.lineWidth = 0.85
        const wave1 = Math.sin(time * 0.005 + this.antennaeOffset) * 8
        const wave2 = Math.cos(time * 0.005 + this.antennaeOffset) * 6

        // Long top feeler
        ctx.beginPath()
        ctx.moveTo(this.size * 0.9, -this.size * 0.2)
        ctx.bezierCurveTo(
          this.size * 1.6,
          -this.size * 0.6 + wave1,
          this.size * 2.2,
          -this.size * 0.8 + wave2,
          this.size * 2.8,
          -this.size * 0.5 + wave1
        )
        ctx.stroke()

        // Second feeler
        ctx.beginPath()
        ctx.moveTo(this.size * 0.9, -this.size * 0.1)
        ctx.bezierCurveTo(
          this.size * 1.5,
          -this.size * 0.2 + wave2,
          this.size * 2.0,
          this.size * 0.2 + wave1,
          this.size * 2.5,
          this.size * 0.5 + wave2
        )
        ctx.stroke()

        // 4. Rhythmic Swimming Legs (Pleopods under abdomen)
        ctx.strokeStyle = `hsla(170, 90%, 75%, ${alpha * 0.8})`
        ctx.lineWidth = 1
        for (let i = 0; i < 4; i++) {
          const legX = -this.size * (0.1 + i * 0.22)
          const legWave = Math.sin(time * 0.02 + i * 0.8) * 5
          ctx.beginPath()
          ctx.moveTo(legX, this.size * 0.15)
          ctx.quadraticCurveTo(
            legX - 4 + legWave,
            this.size * 0.45,
            legX - 8 + legWave,
            this.size * 0.35
          )
          ctx.stroke()
        }

        // Prawn dark stalk eye
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 1.6})`
        ctx.beginPath()
        ctx.arc(this.size * 0.7, -this.size * 0.22, 1.8, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      }
    }

    // ── 3. Aeration Micro-Bubbles Class ─────────────────────────────────
    class PondBubble {
      constructor() {
        this.reset(true)
      }

      reset(initial = false) {
        this.x = Math.random() * width
        this.y = initial ? Math.random() * height : height + 15
        this.radius = Math.random() * 3 + 1.2
        this.speedY = Math.random() * 0.9 + 0.6
        this.wobbleSpeed = Math.random() * 0.03 + 0.02
        this.wobbleAmp = Math.random() * 1.8 + 0.8
        this.alpha = Math.random() * 0.4 + 0.2
      }

      update(time) {
        this.y -= this.speedY
        this.x += Math.sin(time * this.wobbleSpeed) * 0.45

        if (this.y < -15) {
          this.reset(false)
        }
      }

      draw(ctx) {
        ctx.save()
        ctx.strokeStyle = `rgba(6, 182, 212, ${this.alpha * 0.75})`
        ctx.fillStyle = `rgba(45, 212, 191, ${this.alpha * 0.25})`
        ctx.lineWidth = 0.8

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        // Highlight shine
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * 0.9})`
        ctx.beginPath()
        ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.3, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      }
    }

    // ── 4. Sunbeam Caustics Overlay ──────────────────────────────────────
    function drawCaustics(ctx, time) {
      ctx.save()
      const causticGrad = ctx.createLinearGradient(0, 0, width, height)
      causticGrad.addColorStop(0, 'rgba(6, 182, 212, 0.03)')
      causticGrad.addColorStop(0.5, 'rgba(45, 212, 191, 0.02)')
      causticGrad.addColorStop(1, 'rgba(2, 6, 23, 0)')
      ctx.fillStyle = causticGrad
      ctx.fillRect(0, 0, width, height)

      // Dynamic shimmering light ray lines
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.04)'
      ctx.lineWidth = 40
      for (let i = 0; i < 3; i++) {
        const offset = Math.sin(time * 0.0008 + i) * 60
        ctx.beginPath()
        ctx.moveTo(width * (0.2 + i * 0.3) + offset, 0)
        ctx.lineTo(width * (0.1 + i * 0.35) + offset * 1.5, height)
        ctx.stroke()
      }
      ctx.restore()
    }

    // Initialize instances
    const fishes = Array.from({ length: speciesCount.fish }, () => new SwimmingFish())
    const prawns = Array.from({ length: speciesCount.prawns }, () => new SwimmingPrawn())
    const bubbles = Array.from({ length: speciesCount.bubbles }, () => new PondBubble())

    let startTime = performance.now()

    // ── Render Loop ──────────────────────────────────────────────────────
    const render = (currentTime) => {
      const elapsed = currentTime - startTime
      ctx.clearRect(0, 0, width, height)

      // 1. Water Caustics
      drawCaustics(ctx, elapsed)

      // 2. Aeration Bubbles
      for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].update(elapsed)
        bubbles[i].draw(ctx)
      }

      // 3. Swimming Prawns (Shrimp)
      for (let i = 0; i < prawns.length; i++) {
        prawns[i].update(elapsed)
        prawns[i].draw(ctx, elapsed)
      }

      // 4. Swimming Fish
      for (let i = 0; i < fishes.length; i++) {
        fishes[i].update(elapsed)
        fishes[i].draw(ctx, elapsed)
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [speciesCount])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    />
  )
}
