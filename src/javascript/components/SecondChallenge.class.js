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

    document.addEventListener("mousemove", that.handleMove)
  }

  unbind() {
    let that = this
    this.SecondChallengeContainer.mousemove = null
    window.removeEventListener('click', that.handleRecompenseButtonClick)

    document.removeEventListener("mousemove", that.handleMove)
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
    this.coolTexture = new PIXI.Sprite(this.texture)
  }

  setupSecondChallengePicturesLoaded() {
    this.assets.resources = STORAGE.loader.resources

    this.createGlobalBackground()
    this.createBackground()
    this.createSum()
  }

  createGlobalBackground() {

    this.gobalBackground = new PIXI.Sprite(this.assets.resources['assets/second-challenge/step_6.png'].texture)

    let ratioVertical = window.innerHeight / this.gobalBackground.texture.height
    let ratioHorizontal = window.innerWidth / this.gobalBackground.texture.width
    if (ratioHorizontal < ratioVertical) {
      this.gobalBackground.scale = new PIXI.Point(ratioVertical, ratioVertical)
      this.gobalBackground.x = - (this.gobalBackground.texture.width * this.gobalBackground.scale.x - window.innerWidth) / 2
    } else {
      this.gobalBackground.scale = new PIXI.Point(ratioHorizontal, ratioHorizontal)
      this.gobalBackground.y = - (this.gobalBackground.texture.height * this.gobalBackground.scale.x - window.innerHeight) / 2
    }

    this.SecondChallengeContainer.addChild(this.gobalBackground)
  }

  createBackground() {

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
    this.container.mask = this.coolTexture
    this.SecondChallengeContainer.addChild(this.container)
  }

  handleMove(e) {
    window.clearTimeout(STORAGE.SecondChallengeClass.time)

    STORAGE.SecondChallengeClass.externalCanvasCTX.save()
    STORAGE.SecondChallengeClass.externalCanvasCTX.beginPath()

    STORAGE.SecondChallengeClass.externalCanvasCTX.arc(e.x, e.y, 150, 0, 2 * Math.PI, false)

    STORAGE.SecondChallengeClass.externalCanvasCTX.fillStyle = "white"
    STORAGE.SecondChallengeClass.externalCanvasCTX.fill()
    STORAGE.SecondChallengeClass.externalCanvasCTX.restore()

    let imageMask = STORAGE.SecondChallengeClass.externalCanvas.toDataURL("image/png")

    STORAGE.SecondChallengeClass.imagePixi.src = imageMask
    var myBaseTexture = new PIXI.BaseTexture(STORAGE.SecondChallengeClass.imagePixi)

    // STORAGE.SecondChallengeClass.coolTexture.texture = new PIXI.Texture(myBaseTexture)

    STORAGE.SecondChallengeClass.time = setTimeout(function() {
      STORAGE.SecondChallengeClass.coolTexture.texture = new PIXI.Texture(myBaseTexture)
    }, 15)
  }

  allCheckpointsChecked() {
    this.stepIndex++

    document.removeEventListener("mousemove", this.handleMove)
    this.externalCanvasCTX.clearRect(0, 0, this.externalCanvas.width, this.externalCanvas.height)
    let imageMask = STORAGE.SecondChallengeClass.externalCanvas.toDataURL("image/png")
    STORAGE.SecondChallengeClass.imagePixi.src = imageMask
    var myBaseTexture = new PIXI.BaseTexture(STORAGE.SecondChallengeClass.imagePixi)
    STORAGE.SecondChallengeClass.coolTexture.texture = new PIXI.Texture(myBaseTexture)

    let that = this
    if (this.stepIndex <= 5) {
      TweenLite.to( [this.background, this.container], 0.6, {
        alpha: 0,
        onComplete: () => {
          this.createBackground()
          this.createSum()
          this.container.alpha = 1
          this.background.alpha = 1
          if (this.stepIndex != 5) {
            setTimeout(function() {
              document.addEventListener("mousemove", that.handleMove)
            }, 500)
          }
        }
      })

      let that = this
      if (this.stepIndex == 5) {
        setTimeout(function() {
          TweenLite.to([that.sum, that.background, that.container], 0.8, {
            alpha: 0,
            onComplete: () => {
              that.container.destroy()
              that.background.destroy()
              that.showConclusion()
            }
          })
        }, 2000)
      }
    }
  }

  onMouseMove(mouseData) {
    this.isWellErased(mouseData)
  }

  isWellErased(mouseData) {
    if (mouseData.data.global.x <= window.innerWidth / 5 && mouseData.data.global.y <= window.innerHeight / 10  && this.stepIndex == 0) {
      this.firstCheckpointChecked = true
    }

    if (mouseData.data.global.x <= window.innerWidth / 3 && mouseData.data.global.y <= window.innerHeight / 10  && this.stepIndex == 1) {
      this.firstCheckpointChecked = true
    }

    if (mouseData.data.global.x <= window.innerWidth / 2.5 && mouseData.data.global.y <= window.innerHeight / 10  && this.stepIndex == 2) {
      this.firstCheckpointChecked = true
    }

    if (mouseData.data.global.x <= window.innerWidth / 2.1 && mouseData.data.global.y <= window.innerHeight / 5  && this.stepIndex > 2) {
      this.firstCheckpointChecked = true
    }

    if (mouseData.data.global.x >= window.innerWidth / 2 - 100 && mouseData.data.global.x <= window.innerWidth / 2 + 100 && mouseData.data.global.y <= window.innerHeight / 5) {
      this.secondCheckpointChecked = true
    }

    if (mouseData.data.global.x >= window.innerWidth - window.innerWidth / 5 && mouseData.data.global.y <= window.innerHeight / 10 && this.stepIndex == 0) {
      this.thirdCheckpointChecked = true
    }

    if (mouseData.data.global.x >= window.innerWidth - window.innerWidth / 3 && mouseData.data.global.y <= window.innerHeight / 10 && this.stepIndex == 1) {
      this.thirdCheckpointChecked = true
    }

    if (mouseData.data.global.x >= window.innerWidth - window.innerWidth / 2.5 && mouseData.data.global.y <= window.innerHeight / 10 && this.stepIndex == 2) {
      this.thirdCheckpointChecked = true
    }

    if (mouseData.data.global.x >= window.innerWidth - window.innerWidth / 2.1 && mouseData.data.global.y <= window.innerHeight / 10 && this.stepIndex > 2) {
      this.thirdCheckpointChecked = true
    }

    if (mouseData.data.global.y >= window.innerHeight / 2 - 100 && mouseData.data.global.y <= window.innerHeight / 2 + 100 && mouseData.data.global.x <= window.innerWidth / 5 && this.stepIndex == 0) {
      this.fourthCheckpointChecked = true
    }

    if (mouseData.data.global.y >= window.innerHeight / 2 - 100 && mouseData.data.global.y <= window.innerHeight / 2 + 100 && mouseData.data.global.x <= window.innerWidth / 3 && this.stepIndex == 1) {
      this.fourthCheckpointChecked = true
    }

    if (mouseData.data.global.y >= window.innerHeight / 2 - 100 && mouseData.data.global.y <= window.innerHeight / 2 + 100 && mouseData.data.global.x <= window.innerWidth / 2.5 && this.stepIndex == 2) {
      this.fourthCheckpointChecked = true
    }

    if (mouseData.data.global.y >= window.innerHeight / 2 - 100 && mouseData.data.global.y <= window.innerHeight / 2 + 100 && mouseData.data.global.x <= window.innerWidth / 2.1 && this.stepIndex > 2) {
      this.fourthCheckpointChecked = true
    }

    if (mouseData.data.global.y >= window.innerHeight / 2 - 100 && mouseData.data.global.y <= window.innerHeight / 2 + 100 && mouseData.data.global.x >= window.innerWidth - window.innerWidth / 5 && this.stepIndex == 0) {
      this.fifthCheckpointChecked = true
    }

    if (mouseData.data.global.y >= window.innerHeight / 2 - 100 && mouseData.data.global.y <= window.innerHeight / 2 + 100 && mouseData.data.global.x >= window.innerWidth - window.innerWidth / 4 && this.stepIndex == 1) {
      this.fifthCheckpointChecked = true
    }

    if (mouseData.data.global.y >= window.innerHeight / 2 - 100 && mouseData.data.global.y <= window.innerHeight / 2 + 100 && mouseData.data.global.x >= window.innerWidth - window.innerWidth / 2.5 && this.stepIndex == 2) {
      this.fifthCheckpointChecked = true
    }

    if (mouseData.data.global.y >= window.innerHeight / 2 - 100 && mouseData.data.global.y <= window.innerHeight / 2 + 100 && mouseData.data.global.x >= window.innerWidth - window.innerWidth / 2.1 && this.stepIndex > 2) {
      this.fifthCheckpointChecked = true
    }

    if (mouseData.data.global.x >= window.innerWidth / 2 - 100 && mouseData.data.global.x <= window.innerWidth / 2 + 100 && mouseData.data.global.y >= window.innerHeight - window.innerHeight / 8) {
      this.sixthCheckpointChecked = true
    }

    if (this.firstCheckpointChecked == true && this.secondCheckpointChecked == true && this.thirdCheckpointChecked == true && this.fourthCheckpointChecked == true && this.fifthCheckpointChecked == true && this.sixthCheckpointChecked == true) {
      this.allCheckpointsChecked()
      this.firstCheckpointChecked = false
      this.secondCheckpointChecked = false
      this.thirdCheckpointChecked = false
      this.fourthCheckpointChecked = false
      this.fifthCheckpointChecked = false
      this.sixthCheckpointChecked = false
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
