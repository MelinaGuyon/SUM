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
    this.twist.radius = window.innerWidth / 2.5
		this.twist.angle = 0
		this.twist.offset = [window.innerWidth / 2, window.innerHeight / 2]
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

    if (this.twist.angle < -4.5) {
      this.angle = 'up'
    } else if (this.twist.angle > 4.5){
      this.angle = 'low'
    }

    if (this.angle == 'low') {
      this.twist.angle -= 0.01
    } else {
      this.twist.angle += 0.01
    }

    if (this.displacementSprite.x < -400) {
      this.displacement = 'up'
    } else if (this.displacementSprite.x > 400){
      this.displacement = 'low'
    }

    if (this.displacement == 'low') {
      this.displacementSprite.x -= 25
      this.displacementSprite.y -= 25
    } else {
      this.displacementSprite.x += 25
      this.displacementSprite.y += 25
    }

   if (this.displacementFilter.scale.x < 600) {
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
