import datas from '../datas.js'
import TweenLite from 'gsap'

class FirstChallenge {

  constructor(options) {
    STORAGE.FirstChallengeClass = this

    this.assets = {}

    this.bigEye = new PIXI.Graphics
    this.path = new PIXI.Graphics
    this.cursor = new PIXI.Graphics

    this.distanceToPass
    this.distancePassed
    this.isDragging = false

    this.pathStart = [100, 400]
    this.pathEnd = [100, 1200]
    this.init()
    this.bind()
  }

  init() {
    STORAGE.loaderClass.loadFirstChallengePictures(['assets/test-rect-rotation.jpg'])
  }

  setupFirstChallengePicturesLoaded() {
    this.assets.resources = STORAGE.loader.resources

    this.createEye()
    this.createPath()
    this.createCursor()
  }

  createEye() {
    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 0) {
        that.bigEye = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })

    this.bigEye.position.x = 1200
    this.bigEye.position.y = 600
    this.bigEye.anchor.x = 0.5
    this.bigEye.anchor.y = 0.5
    STORAGE.stage.addChild(this.bigEye)
  }

  createPath() {
    this.path.beginFill(0xffffff)
    this.path.moveTo(this.pathStart[0], this.pathStart[1])
    this.path.lineStyle(2, 0x000000)
    this.path.lineTo(this.pathEnd[0], this.pathEnd[1])
    this.path.endFill()
    STORAGE.stage.addChild(this.path)
  }

  createCursor() {
    this.cursor.beginFill(0x000000, 1)
    this.cursor.drawCircle(0, 0, 35)
    this.cursor.endFill()
    this.cursor.x = this.pathEnd[0]
    this.cursor.y = this.pathEnd[1]
    this.cursor.interactive = true // pour attribuer événements à this.cursor
    STORAGE.stage.addChild(this.cursor)
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
      this.distanceToPass = (this.cursor.y - this.pathStart[1]) * 3.141592653589793 / (this.pathEnd[1] - this.pathStart[1])
      this.distancePassed = Math.abs(this.distanceToPass - 3.141592653589793)
    }
    TweenLite.set(this.bigEye, {
      rotation: this.distancePassed
    })

    if (this.bigEye.rotation < 3.141592653589793 && this.cursor.y < this.pathStart[1] + 30 ) {
      TweenLite.to(this.bigEye, 0.3,  {
        rotation: 3.141592653589793
      })
    }
    if (this.bigEye.rotation > 0 && this.cursor.y > this.pathEnd[1] - 30) {
      TweenLite.to(this.bigEye, 0.3,{
        rotation: 0
      })
    }
  }
}

export default FirstChallenge
