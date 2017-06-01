import Blackboard from './Blackboard.class.js'
import videoDatas from '../datas/videoDatas.js'
import TweenLite from 'gsap'

class Video {

  constructor(options) {
    this.VideoContainer = new PIXI.Container()
    this.VideoContainer.alpha = 0
    STORAGE.VideoClass = this
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
    this.bind()
  }

  init() {
    TweenLite.set(STORAGE.stage, {
      alpha: 1
    })
    TweenLite.to(this.VideoContainer, 0.6, {
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

    this.texture = PIXI.Texture.fromVideo('assets/video.mp4')
    this.videoSprite = new PIXI.Sprite(this.texture)

    this.ratio = window.innerWidth/this.largeurVideo
    this.videoSprite.width = this.largeurVideo * this.ratio
    this.videoSprite.height = this.hauteurVideo * this.ratio

    this.videoSprite.x = 0
    this.videoSprite.y = (window.innerHeight-this.videoSprite.height)/2

    this.VideoContainer.addChild(this.videoSprite)

    this.initBlackboards()

    setTimeout(function(){
      that.texture.baseTexture.source.pause()
      that.initBlackboards()
    }, 1000)

/*    setTimeout(function(){
      that.texture.baseTexture.source.play()
      for (var i = 0; i < that.blackboards.length; i++) {
        that.blackboards[i].blackboard.destroy()
      }    
    }, 10000)*/
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
  }

}

export default Video
