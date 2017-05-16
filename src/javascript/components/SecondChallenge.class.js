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
    this.sum
    this.container = new PIXI.Container()
    this.stepIndex = 0

    this.init()
    this.bind()
  }

  init() {
    STORAGE.loaderClass.loadSecondChallengePictures([
      'assets/second-challenge/step_0.png',
      'assets/second-challenge/step_1.png',
      'assets/second-challenge/step_2.png',
      'assets/second-challenge/step_3.png',
      'assets/second-challenge/step_4.png',
      'assets/second-challenge/step_5.png',
      'assets/second-challenge/step_6.png'
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

    this.createBackground(this.stepIndex)
    this.createSum(this.stepIndex)
    this.createMask()
  }

  createBackground(stepIndex) {
    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (that.stepIndex == 0 && index == 0) {
        that.background = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
      if (that.stepIndex == 1 && index == 1) {
        that.background = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
      if (that.stepIndex == 2 && index == 2) {
        that.background = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
      if (that.stepIndex == 3 && index == 3) {
        that.background = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
      if (that.stepIndex == 4 && index == 4) {
        that.background = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
      if (that.stepIndex == 5 && index == 5) {
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

  createSum(stepIndex) {
    let that = this
    this.container.position.x = window.innerWidth / 2
    this.container.position.y = window.innerHeight / 2

    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (that.stepIndex == 0 && index == 1) {
        that.sum = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
      if (that.stepIndex == 1 && index == 2) {
        that.sum = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
      if (that.stepIndex == 2 && index == 3) {
        that.sum = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
      if (that.stepIndex == 3 && index == 4) {
        that.sum = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
      if (that.stepIndex == 4 && index == 5) {
        that.sum = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
      if (that.stepIndex == 5 && index == 6) {
        that.sum = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })

    this.sum.scale = this.background.scale
    this.sum.x = this.sum.x
    this.sum.y = this.sum.y

    this.sum.anchor.x = 0.5
    this.sum.anchor.y = 0.5
    this.SecondChallengeContainer.addChild(this.container)
    this.container.addChild(this.sum)
  }

  createMask() {
    this.mask = new PIXI.Graphics()
    this.mask.beginFill(0)
    this.mask.moveTo(window.innerWidth/2, window.innerHeight/2)
    this.SecondChallengeContainer.addChild(this.mask)
    this.container.mask = this.mask
  }

  bind() {
    let that = this
    this.SecondChallengeContainer.mousedown = function(mouseData){
      that.onMouseDown(mouseData)
    }
    this.SecondChallengeContainer.mousemove = function(mouseData){
      that.onMouseMove(mouseData)
    }
  }

  onMouseDown(mouseData) {
    this.stepIndex++
    console.log(this.stepIndex)

    if (this.mask) {
      TweenLite.to([this.background, this.sum, this.mask], 0, { // augmenter delta pour transi
        alpha: 0, onComplete: () => { 
          //this.background.clear()
          //this.sum.clear()
          this.createBackground(this.stepIndex)
          this.createSum(this.stepIndex)
          this.createMask() 
          /*TweenLite.to([this.background, this.sum, this.mask], 0.4, {
            alpha: 1
          })*/
        }
      })
    }
  }

  onMouseMove(mouseData) {
    // mouseData.data.global.x -= 50
    // mouseData.data.global.y = 500
    this.mask.lineStyle(500, 0, 1) // ou lineWidth = window.innerHeight
    this.mask.lineTo(mouseData.data.global.x, mouseData.data.global.y)
  }

  isWellErased() {
    
  }

}

export default SecondChallenge
