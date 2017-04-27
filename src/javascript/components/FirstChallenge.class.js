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
    this.path = new PIXI.Graphics
    this.cursor = new PIXI.Graphics
    this.eyeIndex = 1
    this.movie
    this.movieIndex = 0

    this.nextAnimButton = document.querySelector('.js-first-challenge-next')

    this.actualCursorDistance
    this.rightCursorDistance
    this.isDragging = false

    this.pathStart = [100, window.innerHeight / 2 - 300]
    this.pathEnd = [100, window.innerHeight / 2 + 300]
    this.init()
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
  }

  setupFirstChallengePicturesLoaded() {
    this.assets.resources = STORAGE.loader.resources

    this.createBackground()
    this.createEye()
    this.createGif(this.movieIndex)
    this.createPath()
    this.createCursor()
    this.bind()
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
    this.eye.scale = new PIXI.Point(ratioHorizontalEye, ratioHorizontalEye)

    this.eye.position.x = window.innerWidth / 2
    this.eye.position.y = window.innerHeight / 2
    this.eye.anchor.x = 0.5
    this.eye.anchor.y = 0.5

    this.FirstChallengeContainer.addChild(this.eye)
  }


  createGif(index) {
    this.framesArray = []

    if (index == 0) {
      for (let i = 1; i < 62; i++) {
        let val = i < 10 ? '0' + i : i
        let texture1 = PIXI.Texture.fromImage(frames[0] + val + '.gif')
        this.framesArray.push(texture1)
      }
    } else if (index == 1) {
      for (let i = 1; i < 15; i++) {
        let val = i < 10 ? '0' + i : i
        let texture2 = PIXI.Texture.fromImage(frames[1] + val + '.gif')
        this.framesArray.push(texture2)
      }
    } else if (index == 2) {
      for (let i = 1; i < 20; i++) {
        let val = i < 10 ? '0' + i : i
        let texture3 = PIXI.Texture.fromImage(frames[2] + val + '.gif')
        this.framesArray.push(texture3)
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

  displayNextAnimButton() {
    TweenLite.to(this.nextAnimButton, 1.2, {
      autoAlpha: 1
    })
  }

  undDisplayNextAnimButton() {
    TweenLite.to(this.nextAnimButton, 1.2, {
      autoAlpha: 0
    })
  }

  handleNextAnimButtonClick() {
    STORAGE.FirstChallengeClass.undDisplayNextAnimButton()
    STORAGE.FirstChallengeClass.backToBegining()
  }

  onWindowMouseUp(that) {
    if (that.cursor && that.isDragging) {
      that.isDragging = false
      that.cursor.mousemove = null
      document.body.style.cursor = 'auto'
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

    // To avoid twisted image
    if (this.eye.rotation < 3.141592653589793 && this.cursor.y < this.pathStart[1] + 30 ) {
      TweenLite.to(this.eye, 0.3, {
        rotation: 3.141592653589793
      })
      this.displayNextAnimButton()
    }
    if (this.eye.rotation > 0 && this.cursor.y > this.pathEnd[1] - 30) {
      TweenLite.to(this.eye, 0.3, {
        rotation: 0
      })
    }

  }

  backToBegining() {
    let that = this

    if (this.movieIndex < 2) {
      TweenLite.to(this.eye, 0.6, {
        rotation: 0
      })
      TweenLite.to(this.movie, 0.3, {
        alpha: 0,
        onComplete: function() {
          that.eye.removeChild(that.movie)
          that.movieIndex ++
          that.createGif(that.movieIndex)
        }
      })
      TweenLite.to(this.cursor, 0.3, {
        y: this.pathEnd[1]
      })
    } else {
      this.eye.removeChild(that.movie)
      this.showConclusion()
    }
  }

  showConclusion() {
    TweenLite.to([this.eye, this.cursor, this.path], 0.8, {
      alpha: 0
    })

    //TODO : Conclusion text ? To define
  }

}

export default FirstChallenge
