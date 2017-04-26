import datas from '../datas.js'
import frames from '../frames.js'
import TweenLite from 'gsap'

class FirstChallenge {

  constructor(options) {
    this.FirstChallengeContainer = new PIXI.Container()
    this.FirstChallengeContainer.alpha = 0
    STORAGE.FirstChallengeClass = this
    STORAGE.stage.addChild(this.FirstChallengeContainer)

    this.assets = {}

    this.background
    this.eye = new PIXI.Graphics
    this.pupil = new PIXI.Graphics
    this.path = new PIXI.Graphics
    this.cursor = new PIXI.Graphics
    this.eyeIndex = 1

    this.distanceToPass
    this.distancePassed
    this.isDragging = false

    this.pathStart = [100, window.innerHeight / 2 - 300]
    this.pathEnd = [100, window.innerHeight / 2 + 300]
    this.init()
    this.bind()
  }

  init() {
    STORAGE.loaderClass.loadFirstChallengePictures([
      'assets/first-challenge/fond.png',
      'assets/first-challenge/oeil.png'
    ])

    TweenLite.set(STORAGE.stage, {
      alpha: 1
    })
    TweenLite.to(this.FirstChallengeContainer, 0.6, {
      alpha: 1
    })
  }

  setupFirstChallengePicturesLoaded() {
    this.assets.resources = STORAGE.loader.resources

    this.createBackground()
    this.createEye()
    this.createGif(1)
    this.createPath()
    this.createCursor()
  }

  createBackground() {
    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 0) {
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

    this.FirstChallengeContainer.addChild(this.background)
  }

  createEye() {
    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 1) {
        that.eye = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })

    let ratioHorizontalEye = window.innerWidth / this.eye.texture.width
    //let ratioVerticalPupil = this.eye.texture.height / this.pupil.texture.height
    this.eye.scale = new PIXI.Point(ratioHorizontalEye, ratioHorizontalEye)
    //this.pupil.scale = new PIXI.Point(ratioVerticalPupil, ratioVerticalPupil)

    this.eye.position.x = window.innerWidth / 2
    this.eye.position.y = window.innerHeight / 2
    this.eye.anchor.x = 0.5
    this.eye.anchor.y = 0.5

    this.FirstChallengeContainer.addChild(this.eye)
  }


  createGif(index) {
    this.framesArray = []
    if (this.movie) { 
      TweenLite.to(this.movie, 0.5, { alpha: 0,
        onComplete: function() { this.eye.removeChild(this.movie) } 
      })
    }

    if (index == 1) {
      for (let i = 1; i < 62; i++) {
        let val = i < 10 ? '0' + i : i
        this.texture1 = PIXI.Texture.fromImage(frames[0] + val + '.gif')
        this.framesArray.push(this.texture1)
      }
    } else if (index == 2) {
        for (let i = 1; i < 16; i++) {
          let val = i < 10 ? '0' + i : i
          this.texture2 = PIXI.Texture.fromImage(frames[1] + val + '.gif')
          this.framesArray.push(this.texture2)
        }
    } else if (index == 3) {
        for (let i = 1; i < 21; i++) {
          let val = i < 10 ? '0' + i : i
          this.texture3 = PIXI.Texture.fromImage(frames[2] + val + '.gif')
          this.framesArray.push(this.texture3)
        }
    }

    this.movie = new PIXI.extras.AnimatedSprite(this.framesArray)
    this.movie.alpha = 0
    this.movie.anchor.set(0.5)
    this.movie.animationSpeed = 0.5
    TweenLite.to(this.movie, 2, { alpha: 1 }) 
    this.movie.play()
    this.eye.addChild(this.movie)
  }


  createPath() {
    this.path.beginFill(0xffffff)
    this.path.moveTo(this.pathStart[0], this.pathStart[1])
    this.path.lineStyle(2, 0xffffff)
    this.path.lineTo(this.pathEnd[0], this.pathEnd[1])
    this.path.endFill()
    this.FirstChallengeContainer.addChild(this.path)
  }

  createCursor() {
    this.cursor.beginFill(0xffffff, 1)
    this.cursor.drawCircle(0, 0, 15)
    this.cursor.endFill()
    this.cursor.x = this.pathEnd[0]
    this.cursor.y = this.pathEnd[1]
    this.cursor.interactive = true // pour attribuer événements à this.cursor
    this.FirstChallengeContainer.addChild(this.cursor)
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
  }

  onCursorMouseOver() {
    document.body.style.cursor = '-webkit-grabbing'
  }

  onCursorMouseOut() {
    if (!this.isDragging) {
      document.body.style.cursor = 'auto'
    }
  }

  onCursorMouseDown() {
    this.isDragging = true
    document.body.style.cursor = '-webkit-grabbing'

    let that = this
    this.cursor.mousemove = function(mouseData){
      that.onCursorMouseMove(mouseData)
    }
    window.addEventListener('mouseup', function(){
      that.onWindowMouseUp(that)
    })
  }

  onWindowMouseUp(that) {
    if (that.cursor && that.isDragging) {
      that.isDragging = false
      that.cursor.mousemove = null
      document.body.style.cursor = 'auto'
    }
  }

  onCursorMouseMove(mouseData) {
    if (this.cursor.y < this.pathEnd[1] && this.cursor.y > this.pathStart[1]) {
      this.onRotationActivated()
      this.cursor.y = mouseData.data.global.y
    }
    if (this.cursor.y >= this.pathEnd[1]) {
      this.cursor.y = this.pathEnd[1] - 1
    }
    if (this.cursor.y <= this.pathStart[1]) {
      this.cursor.y = this.pathStart[1] + 1
    }
  }

  onRotationActivated() {
    // Math.PI * 2 * 0.500 = 3.141592653589793 = 180deg

    if (this.cursor.y < this.pathEnd[1] && this.cursor.y > this.pathStart[1]) {
      this.actualCursorDistance = (this.cursor.y - this.pathStart[1]) * 3.141592653589793 / (this.pathEnd[1] - this.pathStart[1])
      this.rightCursorDistance = Math.abs(this.actualCursorDistance - 3.141592653589793)
    }
    TweenLite.set(this.eye, {
      rotation: this.rightCursorDistance
    })

    // eye 2
    if (this.eye.rotation > 3.13 && this.eyeIndex == 1) {
      let that = this
      TweenLite.to(this.eye, 0.3,  {
        rotation: 0, onComplete: function() {
          TweenLite.to(that.cursor, 1,  {
            y: that.pathEnd[1], onComplete: function(){ that.eyeIndex = 2 }
          })
        }
      })
      this.createGif(2)
    }
    // eye 3
    if (this.eye.rotation > 3.13 && this.eyeIndex == 2 ) {
      TweenLite.to(this.eye, 0.3, { rotation: 0 })
      this.createGif(3)
    }

/*    if (this.eye.rotation > 0 && this.cursor.y > this.pathEnd[1] - 30) {
      TweenLite.to(this.eye, 0.3,{
        rotation: 0
      })
    }*/

  }
}

export default FirstChallenge
