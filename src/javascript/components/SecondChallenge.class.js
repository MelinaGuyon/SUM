import datas from '../datas.js'
import TweenLite from 'gsap'

class SecondChallenge {

  constructor(options) {
    this.SecondChallengeContainer = new PIXI.Container()
    this.SecondChallengeContainer.alpha = 0
    this.SecondChallengeContainer.interactive = true
    STORAGE.SecondChallengeClass = this
    STORAGE.stage.addChild(this.SecondChallengeContainer)

    this.assets = {}

    this.background
    this.container = new PIXI.Container()

    this.init()
    this.bind()
  }

  init() {
    STORAGE.loaderClass.loadSecondChallengePictures([
      'assets/second-challenge/fond.png',
      'assets/second-challenge/frite.png',
      'assets/second-challenge/frite_bleue.png'
    ])

    TweenLite.set(STORAGE.stage, {
      alpha: 1
    })
    TweenLite.to(this.SecondChallengeContainer, 0.6, {
      alpha: 1
    })
  }

  setupSecondChallengePicturesLoaded() {
    this.assets.resources = STORAGE.loader.resources

    this.createBackground()
    this.createSum()
    this.createMask()
  }

  createBackground() {
    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 0) {
        that.background = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })

    let ratioVertical = window.innerHeight / this.background.texture.height
    let ratioHorizontal = window.innerWidth / this.background.texture.width
    if (ratioHorizontal < ratioVertical) {
      this.background.scale = new PIXI.Point(ratioVertical, ratioVertical)
      this.background.x = - (this.background.texture.width * this.background.scale.x - window.innerWidth) / 2
    } else {
      this.background.scale = new PIXI.Point(ratioHorizontal, ratioHorizontal)
      this.background.y = - (this.background.texture.height * this.background.scale.x - window.innerHeight) / 2
    }

    this.SecondChallengeContainer.addChild(this.background)
  }

  createSum() {
    let that = this
    this.container.position.x = window.innerWidth / 2
    this.container.position.y = window.innerHeight / 2

    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 1) {
        that.sum1 = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })
    this.sum1.anchor.x = 0.5
    this.sum1.anchor.y = 0.5
    this.SecondChallengeContainer.addChild(this.container)
    this.container.addChild(this.sum1)
  }

  createMask() {
    this.mask = new PIXI.Graphics()
    this.mask.beginFill(0)
    this.mask.drawCircle(100,100,30)
    this.SecondChallengeContainer.addChild(this.mask)
    this.mask.position.x = window.innerWidth / 2 - 100
    this.mask.position.y = window.innerHeight / 2 - 100
    this.container.mask = this.mask
  }

  bind() {
    let that = this
    this.SecondChallengeContainer.mousedown = function(){
      that.onMouseDown()
    }
    this.SecondChallengeContainer.mousemove = function(mouseData){
      that.onMouseMove(mouseData)
    }
  }

  onMouseDown() {
    console.log("click")
    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 2) {
        that.background = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })
    this.background.anchor.x = 0.5
    this.background.anchor.y = 0.5
    this.container.addChild(this.background)
  }

  onMouseMove(mouseData) {
    console.log("over")
    this.mask.position.x = mouseData.data.global.x - 100
    this.mask.position.y = mouseData.data.global.y - 100
  }

}

export default SecondChallenge
