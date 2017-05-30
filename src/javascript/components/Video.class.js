import soundBank from '../datas/soundBank.js'
import TweenLite from 'gsap'

class Video {

  constructor(options) {
    this.FirstChallengeContainer = new PIXI.Container()
    this.FirstChallengeContainer.alpha = 0
    STORAGE.FirstChallengeClass = this
    STORAGE.FirstChallengeContainer = this.FirstChallengeContainer
    STORAGE.stage.addChild(this.FirstChallengeContainer)

    this.assets = {}
    this.init()
  }

  init() {

    console.log(window.innerWidth)

    STORAGE.loaderClass.loadFirstChallengePictures([
      'assets/first-challenge/fond.png',
      'assets/first-challenge/oeil.png',
      'assets/first-challenge/eye-cursor.png'
    ])

    TweenLite.set(STORAGE.stage, {
      alpha: 1
    })
    TweenLite.to(this.FirstChallengeContainer, 0.6, {
      alpha: 1
    })
  }

  bind() {
    let that = this
    this.cursor.mousedown = function(){
      that.onCursorMouseDown()
    }
    this.cursor.mouseover = function(){
      that.onCursorMouseOver()
    }
    this.cursor.mouseout = function(){
      that.onCursorMouseOut()
    }

    this.nextAnimButton.addEventListener('click', that.handleNextAnimButtonClick)
    this.recompenseButton.addEventListener('click', that.handleRecompenseButtonClick)
    this.firstChallengeNextButton.addEventListener('mouseover', that.firstChallengeNextButtonMouseOver)
    this.firstChallengeNextButton.addEventListener('mouseout', that.firstChallengeNextButtonMouseOut)
  }

  unbind() {
      let that = this

    }

  setupFirstChallengePicturesLoaded() {
    this.assets.resources = STORAGE.loader.resources

    this.manageSounds()
    this.createBackground()
    this.createEye()
    this.createGif(this.movieIndex)
    this.createPupilEmpty()
    this.bind()
  }

}

export default Video
