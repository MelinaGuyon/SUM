import TweenLite from 'gsap'

class SecondChallenge {

  constructor(options) {
    this.SecondChallengeContainer = new PIXI.Container()
    this.SecondChallengeContainer.alpha = 1
    this.SecondChallengeContainer.interactive = true
    STORAGE.SecondChallengeClass = this
    STORAGE.SecondChallengeContainer = this.SecondChallengeContainer
    STORAGE.stage.addChild(this.SecondChallengeContainer)

    this.assets = {}

    this.background
    this.sum1
    this.container = new PIXI.Container()
    this.stepIndex = 0

    this.init()
    this.bind()
  }

  init() {
    STORAGE.loaderClass.loadSecondChallengePictures([
      'assets/second-challenge/step_1.png',
      'assets/second-challenge/step_2.png',
      'assets/second-challenge/step_3.png',
      'assets/second-challenge/step_4.png',
      'assets/second-challenge/step_5.png',
      'assets/second-challenge/step_6.png',
      'assets/second-challenge/step_7.png'
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
    console.log(this.SecondChallengeContainer)
  }

  createSum() {
    let that = this
    this.container.position.x = window.innerWidth / 2
    this.container.position.y = window.innerHeight / 2

    Object.keys(this.assets.resources).map(function(objectKey, index) {
          console.log("sum creation")

      if (index == 1) {
        that.sum1 = new PIXI.Sprite(that.assets.resources[objectKey].texture)
        console.log(that.sum1)
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
    this.mask.moveTo(100, 100)
    this.SecondChallengeContainer.addChild(this.mask)
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
    this.stepIndex++
    console.log(this.stepIndex)

    if (this.mask) {
      TweenLite.to(this.mask, 0, {
        alpha: 0, onComplete: () => { this.mask.clear(); this.createMask() }
      })
    }

    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (that.stepIndex == 1 && index == 2) {
        that.new_sum = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
      if (that.stepIndex == 2 && index == 3) {
        that.new_sum = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
      if (that.stepIndex == 3 && index == 4) {
        that.new_sum = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
      if (that.stepIndex == 4 && index == 5) {
        that.new_sum = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
      if (that.stepIndex == 5 && index == 6) {
        that.new_sum = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
      if (that.stepIndex > 5) {
        // phrase de conclu + recompense
      }
    })
    this.new_sum.anchor.x = 0.5
    this.new_sum.anchor.y = 0.5
    this.container.addChild(this.new_sum)
  }

  onMouseMove(mouseData) {
    //console.log("over")
    this.mask.lineStyle(100, 0)
    this.mask.lineTo(mouseData.data.global.x, mouseData.data.global.y)
  }

}

export default SecondChallenge
