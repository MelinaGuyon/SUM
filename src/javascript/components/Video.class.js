import Blackboard from './Blackboard.class.js'
import videoDatas from '../datas/videoDatas.js'
import TweenLite from 'gsap'

class Video {

  constructor(options) {
    this.VideoContainer = new PIXI.Container()
    this.VideoContainer.alpha = 0
    STORAGE.VideoClass = this
    this.videoNumber = options.number
    STORAGE.VideoContainer = this.VideoContainer
    STORAGE.stage.addChild(this.VideoContainer)

    this.assets = {}
    this.blackboards = []

    STORAGE.videoRatioVertical = 1

    this.largeurVideo = 576
    this.hauteurVideo = 320
    this.largeurArdoise = 290
    this.hauteurArdoise = 160

    this.init()
    this.playVideo()

    if (this.videoNumber == 1) {
      this.bind()
    }

  }

  init() {
    TweenLite.to(STORAGE.stage, 1.6, {
      alpha: 1
    })
    TweenLite.to(this.VideoContainer, 1.6, {
      alpha: 1
    })

    //STORAGE.videoRatioWidth = window.innerWidth / videoDatas.datasBlackboards[0].width
    //STORAGE.videoRatioHeight = window.innerHeight / videoDatas.datasBlackboards[0].height
    STORAGE.videoRatioX = window.innerWidth / videoDatas.datasBlackboards[0].x
    STORAGE.videoRatioY = window.innerHeight / videoDatas.datasBlackboards[0].y
  }

  bind() {
    let that = this
    window.addEventListener('resize', that.handleResize)
  }

  unbind() {
    let that = this
    window.removeEventListener('resize', that.handleResize)
  }

  handleResize() {
    STORAGE.renderer.resize(window.innerWidth, window.innerHeight)
    let timeOut
    clearTimeout(timeOut)

    timeOut = setTimeout(()=> {
      STORAGE.VideoClass.resize()
    }, 200)
  }

  playVideo() {
    let that = this

    if (this.videoNumber == 1) {
      this.texture = PIXI.Texture.fromVideo('assets/video.mp4')
    }
    else if (this.videoNumber == 2) {
      this.texture = PIXI.Texture.fromVideo('assets/video.mp4')
      STORAGE.videoConclusion = this.texture.baseTexture.source
      TweenLite.set(STORAGE.videoConclusion, {
        volume: 0
      })
      TweenLite.to(STORAGE.videoConclusion, 4, {
        volume: 1
      })
    }
    this.videoSprite = new PIXI.Sprite(this.texture)

    this.ratio = window.innerWidth/this.largeurVideo
    this.videoSprite.width = this.largeurVideo * this.ratio
    this.videoSprite.height = this.hauteurVideo * this.ratio

    this.videoSprite.x = 0
    this.videoSprite.y = (window.innerHeight-this.videoSprite.height)/2

    this.VideoContainer.addChild(this.videoSprite)

    if (this.videoNumber == 1) {
      setTimeout(function(){
        STORAGE.videoIntro = that.texture.baseTexture.source
        STORAGE.videoIntro.pause()
        that.initBlackboards()
      }, 1000)
    }
  }

  resize() {
    this.ratio = window.innerWidth/this.largeurVideo
    this.videoSprite.width = this.largeurVideo * this.ratio
    this.videoSprite.height = this.hauteurVideo * this.ratio

    this.videoSprite.y = (window.innerHeight-this.videoSprite.height)/2

    this.initBlackboards()
  }

  initBlackboards() {
    for (var i = 0; i < this.blackboards.length; i++) {
      this.blackboards[i].blackboard.destroy()
    }
    this.blackboards = []

    for(let i = 0; i < videoDatas.datasBlackboards.length; i++) {
      this.blackboards.push(new Blackboard({ index : i, context : "VideoIntro" }))
    }

    STORAGE.blackboards = this.blackboards
  }

}

export default Video
