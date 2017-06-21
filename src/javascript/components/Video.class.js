import Blackboard from './Blackboard.class.js'
import videoDatas from '../datas/videoDatas.js'
import Carousel from './Carousel.class.js'
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
    //this.blackboards = []

    STORAGE.videoRatioVertical = 1

    this.largeurVideo = 576
    this.hauteurVideo = 320

    this.init()
    this.playVideo()

    this.bind()

  }

  init() {
    TweenLite.to(STORAGE.stage, 1.6, {
      alpha: 1
    })
    TweenLite.to(this.VideoContainer, 1.6, {
      alpha: 1
    })
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
      this.texture = PIXI.Texture.fromVideo('assets/introduction.mp4')
    }
    else if (this.videoNumber == 2) {
      this.texture = PIXI.Texture.fromVideo('assets/conclusion.mp4')
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

/*    STORAGE.videoRatioWidth = this.videoSprite.width / videoDatas.datasBlackboards[0].width
    STORAGE.videoRatioHeight = this.videoSprite.height / videoDatas.datasBlackboards[0].height
    STORAGE.videoRatioX = window.innerWidth / videoDatas.datasBlackboards[0].x
    STORAGE.videoRatioY = window.innerHeight / videoDatas.datasBlackboards[0].y*/

    this.videoSprite.x = 0
    this.videoSprite.y = (window.innerHeight-this.videoSprite.height)/2

    this.VideoContainer.addChild(this.videoSprite)

/*    if (this.videoNumber == 1) {
      setTimeout(function(){
        STORAGE.videoIntro = that.texture.baseTexture.source
        STORAGE.videoIntro.pause()
        that.initBlackboards()
      }, 25500)
    }*/


    if (this.videoNumber == 1) {
      setTimeout(function(){
        TweenLite.to([STORAGE.stage], 0.4, {
          alpha: 0,
          onComplete: function() {
            setTimeout(function() {
              STORAGE.videoIntro = that.texture.baseTexture.source
              STORAGE.videoIntro.pause()
              STORAGE.VideoContainer.destroy()
              new Carousel({ number: 1 })
              TweenLite.to(STORAGE.stage, 1.5, {
                alpha: 1
              })
            }, 200)
          }
        })
        TweenLite.to(STORAGE.videoIntro, 4, {
          volume: 0
        })
      }, 98000) // durée de la vidéo
    }
  }

  resize() {
    this.ratio = window.innerWidth/this.largeurVideo
    this.videoSprite.width = this.largeurVideo * this.ratio
    this.videoSprite.height = this.hauteurVideo * this.ratio

    this.videoSprite.y = (window.innerHeight-this.videoSprite.height)/2

    //this.initBlackboards()
  }

/*  initBlackboards() {
    for (var i = 0; i < this.blackboards.length; i++) {
      this.blackboards[i].blackboard.destroy()
    }
    this.blackboards = []

    for(let i = 0; i < videoDatas.datasBlackboards.length; i++) {
      this.blackboards.push(new Blackboard({ index : i, context : "VideoIntro" }))
    }

    STORAGE.blackboards = this.blackboards
  }*/

}

export default Video
