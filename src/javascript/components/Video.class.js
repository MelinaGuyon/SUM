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

    //this.button = new PIXI.Graphics()

    this.assets = {}
    this.blackboards = []
    STORAGE.videoRatioVertical = 1

    this.init()
    this.playVideo()
    //this.initBlackboards()
    this.bind()
  }

  init() {
    TweenLite.set(STORAGE.stage, {
      alpha: 1
    })
    TweenLite.to(this.VideoContainer, 0.6, {
      alpha: 1
    })
  }

  bind() {
    let that = this
  }

  unbind() {
    let that = this
  }

  createButton() {
    this.button.beginFill(0xffffff, 0.5)
    this.button.drawRoundedRect(0, 0, 100, 100, 10)
    this.button.endFill()
    this.button.beginFill(0xffffff)
    this.button.moveTo(36, 30)
    this.button.lineTo(36, 70)
    this.button.lineTo(70, 50)

    /*    
    this.button.x = (this.app.renderer.width - this.button.width) / 2
    this.button.y = (this.app.renderer.height - this.button.height) / 2
    */
    this.button.x = 100
    this.button.y = 100

    this.button.interactive = true
    this.button.buttonMode = true

    this.VideoContainer.addChild(this.button)

    //this.button.on('pointertap', this.playVideo)
  }

  playVideo() {
    //this.button.destroy()

    let that = this

    this.texture = PIXI.Texture.fromVideo('assets/video.mp4')
    this.videoSprite = new PIXI.Sprite(this.texture)

    this.videoSprite.width = window.innerWidth
    this.videoSprite.height = window.innerHeight

    this.videoSprite.x = 0
    this.videoSprite.y = 0

    this.VideoContainer.addChild(this.videoSprite)

    setTimeout(function(){
      that.texture.baseTexture.source.pause()
      that.initBlackboards()
    }, 5000)

    setTimeout(function(){
      that.texture.baseTexture.source.play()
      //that.blackboard.destroy()    
    }, 10000)
  }

  initBlackboards() {
    STORAGE.videoRatioVertical = window.innerHeight / this.videoSprite.height       
    STORAGE.videoPositionHorizontal = window.innerWidth / 2 - this.videoSprite.width / 2

    for(let i = 0; i < videoDatas.datasBlackboards.length; i++) {
      this.blackboards.push(new Blackboard({ index : i, context : "VideoIntro" }))
    }
  }

}

export default Video
