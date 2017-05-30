import conclusionTextsDatas from '../datas/conclusionTexts.js'
import SecondRecompense from './SecondRecompense.class.js'
import TweenLite from 'gsap'

class SecondChallenge {

  constructor(options) {
    this.SecondChallengeContainer = new PIXI.Container()
    this.SecondChallengeContainer.alpha = 1
    this.SecondChallengeContainer.interactive = true
    STORAGE.SecondChallengeClass = this
    STORAGE.SecondChallengeContainer = this.SecondChallengeContainer
    STORAGE.stage.addChild(this.SecondChallengeContainer)

    this.externalCanvas = document.getElementById('canvas')
    this.externalCanvasCTX
    this.imageMask
    this.imagePixi
    this.texture
    this.coolTexture

    this.time

    this.assets = {}

    this.background
    this.sum
    this.container = new PIXI.Container()
    this.stepIndex = 0

    this.recompenseButton = document.querySelector('.js-first-recompense-button')
    this.conclusionChallengeText = document.querySelector('.js-conclusion-p')
    this.conclusionChallengeButton = document.querySelector('.js-first-recompense-button')
    this.conclusionChallengeTextContainer = document.querySelector('.js-conclusion-text-container')
    STORAGE.conclusionChallengeTextContainer = this.conclusionChallengeTextContainer

    let textConclusion = document.createTextNode(conclusionTextsDatas.secondChallenge)
    let buttonConclusion = document.createTextNode(conclusionTextsDatas.secondChallengeButton)
    this.conclusionChallengeText.appendChild(textConclusion)
    this.conclusionChallengeButton.appendChild(buttonConclusion)

    this.init()
    this.bind()
  }

  bind() {
    let that = this
    this.SecondChallengeContainer.mousemove = function(mouseData){
      that.onMouseMove(mouseData)
    }
    this.recompenseButton.addEventListener('click', that.handleRecompenseButtonClick)

    window.addEventListener("mousemove", that.handleMove)
  }

  unbind() {
    let that = this
    this.SecondChallengeContainer.mousemove = null
    window.removeEventListener('click', that.handleRecompenseButtonClick)

    window.removeEventListener("mousemove", that.handleMove)
  }

  init() {
    this.setUpExternalCanvas()

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

  setUpExternalCanvas() {
    this.externalCanvas.width = window.innerWidth
    this.externalCanvas.height = window.innerHeight

    this.externalCanvasCTX = this.externalCanvas.getContext('2d')

    this.imagePixi = new Image()
    this.texture = PIXI.Texture.fromCanvas(this.externalCanvas)
    this.coolTexture = new PIXI.Sprite( this.texture )
  }

  setupSecondChallengePicturesLoaded() {
    this.assets.resources = STORAGE.loader.resources

    this.createBackground(this.stepIndex)
    this.createSum(this.stepIndex)
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
      if (that.stepIndex == 6 && index == 6) {
        that.background = new PIXI.Sprite(that.assets.resources[objectKey].texture)
        that.showConclusion()
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
    this.container.addChild(this.sum)
    this.SecondChallengeContainer.addChild(this.container)
    this.sum.mask = this.coolTexture
  }

  handleMove(e) {
    window.clearTimeout(STORAGE.SecondChallengeClass.time)

    STORAGE.SecondChallengeClass.externalCanvasCTX.save()
    STORAGE.SecondChallengeClass.externalCanvasCTX.beginPath()

    STORAGE.SecondChallengeClass.externalCanvasCTX.arc(e.x, e.y, 80, 0, 2 * Math.PI, false)

    STORAGE.SecondChallengeClass.externalCanvasCTX.fillStyle = "rgba(255, 255, 255, 1)"
    STORAGE.SecondChallengeClass.externalCanvasCTX.fill()
    STORAGE.SecondChallengeClass.externalCanvasCTX.restore()

    STORAGE.SecondChallengeClass.imageMask = STORAGE.SecondChallengeClass.externalCanvas.toDataURL("image/png")
    STORAGE.SecondChallengeClass.imagePixi.src = STORAGE.SecondChallengeClass.imageMask
    var myBaseTexture = new PIXI.BaseTexture(STORAGE.SecondChallengeClass.imagePixi)

    STORAGE.SecondChallengeClass.time = setTimeout(function() {
      STORAGE.SecondChallengeClass.coolTexture.texture = new PIXI.Texture(myBaseTexture)
    }, 15)
  }

  allCheckpointsChecked() {
    this.stepIndex++

    if (this.stepIndex <= 6) {
      TweenLite.to([this.background, this.sum], 0, {
        alpha: 0, onComplete: () => {
          this.createBackground(this.stepIndex)
          this.createSum(this.stepIndex)
        }
      })
    }
  }

  onMouseMove(mouseData) {
    // this.isWellErased(mouseData)
  }

  isWellErased(mouseData) {
    if (mouseData.data.global.x <= window.innerWidth/3.5) {
      this.firstCheckpointChecked = true
    }
    if (mouseData.data.global.x >= window.innerWidth-window.innerWidth/3.5) {
      this.secondCheckpointChecked = true
    }

    if (this.firstCheckpointChecked == true && this.secondCheckpointChecked == true) {
      this.allCheckpointsChecked()
      this.firstCheckpointChecked = false
      this.secondCheckpointChecked = false
    }
  }

  showConclusion() {
    TweenLite.to(this.conclusionChallengeTextContainer, 2, {
      autoAlpha: 1,
      delay: 1
    })
    this.displayRecompenseButton()
  }

  displayRecompenseButton() {
    TweenLite.to(this.recompenseButton, 1.2, {
      autoAlpha: 1
    })
  }

  handleRecompenseButtonClick() {
    STORAGE.SecondChallengeClass.undDisplayRecompenseButton()

    TweenLite.to([STORAGE.SecondChallengeContainer, STORAGE.conclusionChallengeTextContainer], 0.5, {
      alpha: 0,
      display:'none',
      delay: 1
    })
    TweenLite.to([STORAGE.stage], 0.4, {
      alpha: 0,
      onComplete: function() {
        setTimeout(function(){
          STORAGE.SecondChallengeContainer.destroy()
          STORAGE.SecondChallengeClass.unbind()
          STORAGE.SecondChallengeContainer = null
          STORAGE.conclusionChallengeTextContainer = null
          STORAGE.SecondChallengeClass = null
          new SecondRecompense()
        }, 1000)
      },
      delay: 2
    })
  }

  undDisplayRecompenseButton() {
    TweenLite.to(this.recompenseButton, 1.2, {
      autoAlpha: 0
    })
  }

}

export default SecondChallenge
