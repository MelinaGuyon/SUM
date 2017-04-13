import TweenLite from 'gsap'

const PIXI = require('pixi.js')
const FILTERS = require('pixi-filters')

class ImageDeformation {

  constructor(options) {
    STORAGE.deformationFonction = this

    this.imageTexture = PIXI.Texture.fromImage(options.image)
		this.image = new PIXI.Sprite(this.imageTexture)
    this.image.alpha = 0

    this.angle = 'up'
    this.displacement = 'up'

    this.animateBool = true

    this.twist

    this.replaceImage()

    this.doBlurFilter()
    this.doTwistFilter()
    this.doDisplacementFilter()
  }

  replaceImage() {
    this.image.scale = new PIXI.Point(STORAGE.ratioVertical, STORAGE.ratioVertical)
    STORAGE.stage.addChild(this.image)

    let margin = Math.abs(this.image.width - window.innerWidth)

    if (this.image.width > window.innerWidth) {
      this.image.position.x -= margin
    }

    if (this.image.width < window.innerWidth) {
      this.image.position.x += margin
    }
  }

  doBlurFilter() {
    this.blurFilter = new PIXI.filters.BlurFilter()
    this.blurFilter.blur = 2
  }

  doTwistFilter() {
    this.twist = new FILTERS.TwistFilter()
    this.twist.radius = 1000
		this.twist.angle = 0
		this.twist.offset = [700, 700]
  }

  doDisplacementFilter() {
    this.displacementSprite = PIXI.Sprite.fromImage('assets/displacement_map.png')
    this.displacementSprite.scale = new PIXI.Point(STORAGE.ratioVertical, STORAGE.ratioVertical )

		STORAGE.stage.addChild(this.displacementSprite)

    this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite)
    this.displacementFilter.scale.x = 60
    this.displacementFilter.scale.y = 60
  }

  animate(that) {
    let it = that

    let requestID = window.requestAnimationFrame(function() {
      setTimeout(function() {
        it.animateBool = false
        return
      }, 20000)

      if (it.animateBool) {
        it.animate(it);
      }
    })

    if (that.animateBool == false) {
      window.cancelAnimationFrame(requestID)
      that.animateBool = true
    }

    if (this.image.alpha < 1) {
      this.image.alpha += 0.05
    }

    if (that.twist.angle < -0.5) {
      that.angle = 'up'
    } else if (that.twist.angle > 0.5){
      that.angle = 'low'
    }

    if (that.angle == 'low') {
      that.twist.angle -= 0.004
    } else {
      that.twist.angle +=  0.004
    }

    if (that.displacementSprite.x < -400) {
      that.displacement = 'up'
    } else if (that.displacementSprite.x > 400){
      that.displacement = 'low'
    }

    if (that.displacement == 'low') {
      that.displacementSprite.x -= 6
      that.displacementSprite.y -= 6
    } else {
      that.displacementSprite.x += 6
      that.displacementSprite.y += 6
    }

    if (this.displacementFilter.scale.x < 200) {
      this.displacementFilter.scale.x += 5
      this.displacementFilter.scale.y += 5
    } else if (this.displacementFilter.scale.x < 600) {
      this.displacementFilter.scale.x += 20
      this.displacementFilter.scale.y += 20
    }

    this.image.filters = [
      this.displacementFilter,
      this.twist,
      this.blurFilter
		]
  }
}

export default ImageDeformation
