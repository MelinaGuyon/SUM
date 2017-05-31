import soundBank from '../datas/soundBank.js'
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
    this.init()
  }

  init() {
    STORAGE.loaderClass.loadVideoPictures([
      'assets/video.mp4'
    ])

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

  setupVideoPicturesLoaded() {
    this.assets.resources = STORAGE.loader.resources

    //this.createButton()
    this.playVideo()
    this.bind()
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
    }, 5000)

    setTimeout(function(){
      that.texture.baseTexture.source.play()
    }, 10000)
  }

}

export default Video
