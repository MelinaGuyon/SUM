import conclusionTextsDatas from '../datas/conclusionTexts.js'
import TweenLite from 'gsap'

class ThirdChallenge {

  constructor(options) {
    this.ThirdChallengeContainer = new PIXI.Container()
    this.ThirdChallengeContainer.alpha = 0
    STORAGE.ThirdChallengeClass = this
    STORAGE.ThirdChallengeContainer = this.ThirdChallengeContainer
    STORAGE.stage.addChild(this.ThirdChallengeContainer)

    this.assets = {}

    this.background

    this.recompenseButton = document.querySelector('.js-first-recompense-button')
    this.conclusionChallengeText = document.querySelector('.js-conclusion-p')
    this.conclusionChallengeButton = document.querySelector('.js-first-recompense-button')
    this.conclusionChallengeTextContainer = document.querySelector('.js-conclusion-text-container')
    STORAGE.conclusionChallengeTextContainer = this.conclusionChallengeTextContainer

    this.init()
  }

  init() {

    console.log(window.innerWidth)
    
    STORAGE.loaderClass.loadThirdChallengePictures([
      'assets/first-challenge/fond.png'
    ])

    TweenLite.set(STORAGE.stage, {
      alpha: 1
    })
    TweenLite.to(this.ThirdChallengeContainer, 0.6, {
      alpha: 1
    })
  }

  bind() {
    let that = this

  }

  unbind() {
      let that = this
      
  }

  setupThirdChallengePicturesLoaded() {
    this.assets.resources = STORAGE.loader.resources

    this.drawCircle()
    this.drawRectangle()
    this.bind()
  }


  drawCircle() {
    this.circle = new PIXI.Graphics()
    this.circle.lineStyle(2, 0xFFFFFF)
    this.circle.drawCircle(800, window.innerHeight-150, 50)
    this.circle.endFill()
    this.ThirdChallengeContainer.addChild(this.circle) 
  }

  drawTriangle() {
    
  }

  drawRectangle() {
    this.rectangle = new PIXI.Graphics()
    this.rectangle.lineStyle(2, 0xFFFFFF)
    this.rectangle.drawRect(400, window.innerHeight-200, 150, 100)
    this.ThirdChallengeContainer.addChild(this.rectangle)
  }

  displayRecompenseButton() {
    TweenLite.to(this.recompenseButton, 1.2, {
      autoAlpha: 1
    })
  }

  undDisplayRecompenseButton() {
    TweenLite.to(this.recompenseButton, 1.2, {
      autoAlpha: 0
    })
  }

  handleRecompenseButtonClick() {
    STORAGE.ThirdChallengeClass.undDisplayRecompenseButton()

    TweenLite.to([STORAGE.ThirdChallengeContainer, STORAGE.conclusionChallengeTextContainer], 0.5, {
      alpha: 0,
      display:'none',
      delay: 1
    })
    TweenLite.to([STORAGE.stage], 0.4, {
      alpha: 0,
      onComplete: function() {
        setTimeout(function(){
          STORAGE.ThirdChallengeContainer.destroy()
          STORAGE.ThirdChallengeClass.unbind()
          STORAGE.ThirdChallengeContainer = null
          STORAGE.conclusionChallengeTextContainer = null
          STORAGE.ThirdChallengeClass = null
          new ThirdRecompense()
        }, 1000)
      },
      delay: 2
    })

  }

  showConclusion() {
    /*TweenLite.to([this.cursor, this.pathBasic, this.pathPassed, this.pupilEmpty, this.eye], 0.6, {
      alpha: 0
    })

    TweenLite.to(this.conclusionChallengeTextContainer, 2, {
      autoAlpha: 1,
      delay: 1
    })
    this.displayRecompenseButton()*/
  }

}

export default ThirdChallenge
