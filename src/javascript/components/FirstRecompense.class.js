import conclusionTextsDatas from '../datas/conclusionTexts.js'
import frames from '../datas/frames.js'
import TweenLite from 'gsap'

class FirstRecompense {

  constructor(options) {
    this.FirstRecompenseContainer = new PIXI.Container()
    this.FirstRecompenseContainer.alpha = 0
    STORAGE.FirstRecompenseClass = this
    STORAGE.stage.addChild(this.FirstRecompenseContainer)

    this.assets = {}
    this.background

    this.init()
  }

  init() {
    STORAGE.loaderClass.loadFirstRecompensePictures([
      'assets/first-challenge/fond.png',
      'assets/first-challenge/oeil.png'
    ])

    TweenLite.set(STORAGE.stage, {
      alpha: 1
    })
    TweenLite.to(this.FirstRecompenseContainer, 0.6, {
      alpha: 1
    })
  }

  bind() {
    //this.nextAnimButton.addEventListener('click', that.handleNextAnimButtonClick)
  }

  setupFirstRecompensePicturesLoaded() {
    this.assets.resources = STORAGE.loader.resources
    this.bind()
  }

}

export default FirstRecompense
