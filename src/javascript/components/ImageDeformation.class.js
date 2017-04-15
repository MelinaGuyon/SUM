const PIXI = require('pixi.js')
const FILTERS = require('pixi-filters')

class ImageDeformation {

  constructor(options) {
    this.deformationContainer = new PIXI.Container()
    this.deformationContainer.alpha = 0
    STORAGE.deformationClass = this
    STORAGE.deformation = this.deformationContainer

    this.assets = {}

    this.image

    this.angle = 'up'
    this.displacement = 'up'

    this.animateBool = true

    this.twist
    this.displacementFilter
    this.blurFilter

    this.init()
  }

  init() {
    STORAGE.loaderClass.loadDeformationPictures([
      'assets/deformation-eye3.jpg',
      'assets/displacement_map.png'
    ])
  }

  setupDeformationPicturesLoaded() {
    this.replaceImage()

    this.doBlurFilter()
    this.doTwistFilter()
    this.doDisplacementFilter()
    this.image.filters = [
      this.displacementFilter,
      this.twist,
      this.blurFilter
    ]
    let that = this
    TweenLite.to(this.deformationContainer, 0.7, {
      alpha: 1
    })
    this.animate(that)
  }

  replaceImage() {
    this.assets.resources = STORAGE.loader.resources

    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 0) {
        that.image = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })

    this.image.scale = new PIXI.Point(STORAGE.ratioVertical, STORAGE.ratioVertical)
    this.deformationContainer.addChild(this.image)

    STORAGE.stage.addChild(this.deformationContainer)

    let initialDiff = this.image.width / 2 - window.innerWidth

    if (initialDiff > 0) {
      this.deformationContainer.position.x -= this.image.width / 2 + Math.abs(initialDiff)
      this.deformationContainer.position.x += this.image.width / 16
    } else {
      this.deformationContainer.position.x -= this.image.width / 2
      this.deformationContainer.position.x += Math.abs(initialDiff) + this.image.width / 16
    }

    this.deformationContainer.position.y -= this.image.height / 8
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
    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 1) {
        that.displacementSprite = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })
    this.displacementSprite.scale = new PIXI.Point(6, 6)
    this.displacementSprite.position.y -= this.displacementSprite.height / 12
		this.deformationContainer.addChild(this.displacementSprite)

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
      }, 7000)

      if (it.animateBool) {
        it.animate(it);
      }
    })

    if (that.animateBool == false) {
      window.cancelAnimationFrame(requestID)
      that.animateBool = true
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
      that.displacementSprite.x -= 20
      that.displacementSprite.y -= 20
    } else {
      that.displacementSprite.x += 20
      that.displacementSprite.y += 20
    }

    if (this.displacementFilter.scale.x < 200) {
      this.displacementFilter.scale.x += 20
      this.displacementFilter.scale.y += 20
    } else if (this.displacementFilter.scale.x < 700) {
      this.displacementFilter.scale.x += 25
      this.displacementFilter.scale.y += 25
    }

    this.image.filters = [
      this.displacementFilter,
      this.twist,
      this.blurFilter
		]
  }
}

export default ImageDeformation
