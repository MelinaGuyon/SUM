import datas from '../datas.js'
import TweenLite from 'gsap'

const PIXI = require('pixi.js')
const FILTERS = require('pixi-filters')

class ImageDeformation {

    constructor(options) {
      this.imageTexture = PIXI.Texture.fromImage('assets/deformation.png')
  		this.image = new PIXI.Sprite(this.imageTexture)

      this.ratioVertical = window.innerHeight / 2700

      this.image.scale = new PIXI.Point(this.ratioVertical, this.ratioVertical)

      this.blurFilter = new PIXI.filters.BlurFilter()
      this.blurFilter.blur = 2

      this.twist = new FILTERS.TwistFilter()
      this.twist.radius = 1000
  		this.twist.angle = 0
  		this.twist.offset = [700, 700]

      this.angle = 'up'
      this.displacement = 'up'

      options.renderer.stage.addChild(this.image)

      this.displacementSprite = PIXI.Sprite.fromImage('assets/displacement_map.jpg')


      this.displacementSprite.scale = new PIXI.Point(2, 4)

  		options.renderer.stage.addChild(this.displacementSprite)

      this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite)
      this.displacementFilter.scale.x = 60
      this.displacementFilter.scale.y = 60

      this.image.filters = [
        this.displacementFilter,
        this.twist,
        this.blurFilter
  		]

    }

    render() {
      if (this.twist.angle < -0.5) {
        this.angle = 'up'
      } else if (this.twist.angle > 0.5){
        this.angle = 'low'
      }

      if (this.angle == 'low') {
        this.twist.angle -= 0.004
      } else {
        this.twist.angle +=  0.004
      }

      if (this.displacementSprite.x < -400) {
        this.displacement = 'up'
      } else if (this.displacementSprite.x > 400){
        this.displacement = 'low'
      }

      if (this.displacement == 'low') {
        this.displacementSprite.x -= 6
        this.displacementSprite.y -= 6
      } else {
        this.displacementSprite.x += 6
        this.displacementSprite.y += 6
      }

      if (this.displacementFilter.scale.x < 200) {
        this.displacementFilter.scale.x += 1
        this.displacementFilter.scale.y += 1
      } else if (this.displacementFilter.scale.x < 600) {
        this.displacementFilter.scale.x += 3
        this.displacementFilter.scale.y += 3
      }

      this.image.filters = [
        this.displacementFilter,
        this.twist,
        this.blurFilter
  		]
    }


}

export default ImageDeformation
