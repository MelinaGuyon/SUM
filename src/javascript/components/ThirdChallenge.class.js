import conclusionTextsDatas from '../datas/conclusionTexts.js'
import TweenLite from 'gsap'

class ThirdChallenge {

  constructor(options) {
    this.ThirdChallengeContainer = new PIXI.Container()
    this.ThirdChallengeContainer.alpha = 0
    STORAGE.ThirdChallengeClass = this
    STORAGE.ThirdChallengeContainer = this.ThirdChallengeContainer
    STORAGE.stage.addChild(this.ThirdChallengeContainer)

    this.assets = {}

    this.background
    this.checkpoint = new PIXI.Graphics()
    this.shape
    this.isDragging = false
    this.keepDoing = true

    this.recompenseButton = document.querySelector('.js-first-recompense-button')
    this.conclusionChallengeText = document.querySelector('.js-conclusion-p')
    this.conclusionChallengeButton = document.querySelector('.js-first-recompense-button')
    this.conclusionChallengeTextContainer = document.querySelector('.js-conclusion-text-container')
    STORAGE.conclusionChallengeTextContainer = this.conclusionChallengeTextContainer

    this.init()
  }

  init() {

    console.log(window.innerWidth)
    
    STORAGE.loaderClass.loadThirdChallengePictures([
      'assets/third-challenge/fond.jpg',
      'assets/third-challenge/rectangle.png',
      'assets/third-challenge/circle.png',
      'assets/third-challenge/triangle.png',
      'assets/third-challenge/line.png',
      'assets/third-challenge/half-circle.png',
      'assets/third-challenge/zoom.svg',
      'assets/third-challenge/rotation.svg'
    ])

    TweenLite.set(STORAGE.stage, {
      alpha: 1
    })
    TweenLite.to(this.ThirdChallengeContainer, 0.6, {
      alpha: 1
    })
  }

  bind() {
    let that = this
    this.rectangle.mouseover = function(){ that.onShapeMouseOver() }
    this.rectangle.mouseout = function(){ that.onShapeMouseOut() }
    this.rectangle.mousedown = function(mouseData){ that.onShapeMouseDown(mouseData, this) }
    this.circle.mouseover = function(){ that.onShapeMouseOver() }
    this.circle.mouseout = function(){ that.onShapeMouseOut() }
    this.circle.mousedown = function(mouseData){ that.onShapeMouseDown(mouseData, this) }
    this.triangle.mouseover = function(){ that.onShapeMouseOver() }
    this.triangle.mouseout = function(){ that.onShapeMouseOut() }
    this.triangle.mousedown = function(mouseData){ that.onShapeMouseDown(mouseData, this) }
    this.line.mouseover = function(){ that.onShapeMouseOver() }
    this.line.mouseout = function(){ that.onShapeMouseOut() }
    this.line.mousedown = function(mouseData){ that.onShapeMouseDown(mouseData, this) }
    this.halfcircle.mouseover = function(){ that.onShapeMouseOver() }
    this.halfcircle.mouseout = function(){ that.onShapeMouseOut() }
    this.halfcircle.mousedown = function(mouseData){ that.onShapeMouseDown(mouseData, this) }
    this.checkpoint.mousedown = function() { that.onCheckpointMouseDown() }
  }

  unbind() {
    let that = this
    this.rectangle.mouseover = null
    this.rectangle.mouseout = null
    this.rectangle.mousedown = null
    this.circle.mouseover = null
    this.circle.mouseout = null
    this.circle.mousedown = null
    this.triangle.mouseover = null
    this.triangle.mouseout = null
    this.triangle.mousedown = null
    this.line.mouseover = null
    this.line.mouseout = null
    this.line.mousedown = null
    this.halfcircle.mouseover = null
    this.halfcircle.mouseout = null
    this.halfcircle.mousedown = null
    this.checkpoint.mousedown = null
  }

  onShapeMouseOver() {
    document.body.style.cursor = '-webkit-grabbing'
  }

  onShapeMouseOut() {
    if (!this.isDragging) {
      document.body.style.cursor = 'auto'
    }
  }

  onShapeMouseDown(mouseData, shape) {
    let that = this
    this.shape = shape

    this.isDragging = true
    this.mouseX = mouseData.data.global.x
    this.mouseY = mouseData.data.global.y
    document.body.style.cursor = '-webkit-grabbing'

    this.shape.mousemove = function(mouseData){
      that.onShapeMouseMove(mouseData)
    }
    window.addEventListener('mouseup', function(){
      that.onWindowMouseUp(that)
    })

    //this.zoomIcon.mousedown = function(){ that.onShapeZoom(that.shape) }
    //this.dezoomIcon.mousedown = function(){ that.onShapeDezoom(that.shape) }
    //this.rotationIcon.mousedown = function(){ that.onShapeRotation(that.shape) }
    window.addEventListener('keydown', function(key) { that.onKeyDown(key, that.shape)})
    //this.backtoBeginning(that.shape)
  }

  onShapeMouseMove(mouseData) {
    this.newMouseX = mouseData.data.global.x
    this.newMouseY = mouseData.data.global.y
    this.shape.x += this.newMouseX - this.mouseX
    this.shape.y += this.newMouseY - this.mouseY
    this.mouseX = this.newMouseX
    this.mouseY = this.newMouseY
  }

  onWindowMouseUp(that) {
    if (that.shape && that.isDragging) {
      that.isDragging = false
      that.shape.mousemove = null
      document.body.style.cursor = 'auto'
    }
  }

  onKeyDown(key, shape) {
    if (key.keyCode === 82) {
      this.onShapeRotation(shape)
    }
    else if (key.keyCode === 90) {
      this.onShapeZoom(shape)
    }
    else if (key.keyCode === 65) {
      this.onShapeDezoom(shape)
    }
  }

  onShapeRotation(shape) {
    TweenLite.to(shape, 0.3, {
      rotation: "+="+1
    })
  }

  onShapeZoom(shape) {
    TweenLite.to(shape, 0.3, {
      width: "+="+5,
      height: "+="+5
    })
  }

  onShapeDezoom(shape) {
    TweenLite.to(shape, 0.3, {
      width: "-="+5,
      height: "-="+5
    })
  }

  backtoBeginning(shape) {

    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 1) {
        that.drawRectangle()      
      }
      else if (index == 2) {
        that.drawCircle()
      }
      else if (index == 3) {
        that.drawTriangle()
      }
      else if (index == 4) {
        that.drawLine()
      }
      else if (index == 5) {
        that.drawHalfcircle()
      }
    })

/*  if (shape.graphicsData[0].shape.constructor.name == 'Circle') { that.drawCircle() } 
    else if (shape.graphicsData[0].shape.constructor.name == 'Rectangle') { that.drawRectangle() } 
    else if (shape.graphicsData[0].shape.constructor.name == 'Polygon') { that.drawTriangle() }
*/
    this.bind()
  }

  onCheckpointMouseDown() {
    let that = this

    setTimeout(function(){ 
      //console.log(this.keepDoing)
      this.keepDoing = false
    }, 500)

    that.drawRandomCircle()
    that.drawRandomRectangle()
    that.drawRandomTriangle()
    that.drawRandomLine()
    that.drawRandomHalfcircle()

    if(this.keepDoing == true) {
      console.log(this.keepDoing)
      setTimeout(function(){ 
        that.onCheckpointMouseDown() 
      }, 100)
    }
  }

  setupThirdChallengePicturesLoaded() {
    this.assets.resources = STORAGE.loader.resources

    this.createBackground()
    this.drawRectangle()
    this.drawCircle()
    this.drawTriangle()
    this.drawLine()
    this.drawHalfcircle()
    this.drawZoomIcon()
    this.drawDezoomIcon()
    this.drawRotationIcon()
    this.drawCheckpoint()
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

    this.ThirdChallengeContainer.addChild(this.background)
  }

  drawRectangle() {
    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 1) {
        that.rectangle = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })
    this.rectangle.width = 715/20
    this.rectangle.height = 1063/20
    this.rectangle.x = window.innerWidth-window.innerWidth/8*5
    this.rectangle.y = window.innerHeight-this.rectangle.height
    this.rectangle.anchor.set(0.5)
    this.rectangle.interactive = true
    this.ThirdChallengeContainer.addChild(this.rectangle)
  }  

  drawRandomRectangle() {
    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 1) {
        that.randomRectangle = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })
    this.randomNumber = Math.random()
    this.randomRectangle.width = 715/10*this.randomNumber
    this.randomRectangle.height = 1063/10*this.randomNumber
    this.randomRectangle.x = window.innerWidth-Math.random()*window.innerWidth
    this.randomRectangle.y = window.innerHeight-Math.random()*window.innerHeight
    this.randomRectangle.anchor.set(0.5)
    TweenLite.to(this.randomRectangle, 0.5, {
      rotation: "+="+3
    })
    this.ThirdChallengeContainer.addChild(this.randomRectangle)
  }

  drawCircle() {
    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 2) {
        that.circle = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })
    this.circle.width = 1069/20
    this.circle.height = 1069/20
    this.circle.x = window.innerWidth-window.innerWidth/8*3
    this.circle.y = window.innerHeight-this.circle.height
    this.circle.anchor.set(0.5)
    this.circle.interactive = true
    this.ThirdChallengeContainer.addChild(this.circle) 
  }

  drawRandomCircle() {
    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 2) {
        that.randomCircle = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })
    this.randomCircle.width = Math.random()*100
    this.randomCircle.height = this.randomCircle.width
    this.randomCircle.x = window.innerWidth-Math.random()*window.innerWidth
    this.randomCircle.y = window.innerHeight-Math.random()*window.innerHeight
    this.randomCircle.anchor.set(0.5)
    TweenLite.to(this.randomCircle, 0.5, {
      rotation: "+="+3
    })
    this.ThirdChallengeContainer.addChild(this.randomCircle) 
  }

  drawTriangle() {
    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 3) {
        that.triangle = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })
    this.triangle.width = 1920/20
    this.triangle.height = 962/20
    this.triangle.x = window.innerWidth-window.innerWidth/8*6
    this.triangle.y = window.innerHeight-this.triangle.height
    this.triangle.anchor.set(0.5)
    this.triangle.interactive = true
    this.ThirdChallengeContainer.addChild(this.triangle) 
  }

  drawRandomTriangle() {
    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 3) {
        that.randomTriangle = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })
    this.randomNumber = Math.random()
    this.randomTriangle.width = 1920/10*this.randomNumber
    this.randomTriangle.height = 962/10*this.randomNumber
    this.randomTriangle.x = window.innerWidth-Math.random()*window.innerWidth
    this.randomTriangle.y = window.innerHeight-Math.random()*window.innerHeight
    this.randomTriangle.anchor.set(0.5)
    TweenLite.to(this.randomTriangle, 0.5, {
      rotation: "-="+3
    })
    this.ThirdChallengeContainer.addChild(this.randomTriangle) 
  }

  drawLine() {
    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 4) {
        that.line = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })
    this.line.width = 1056/20
    this.line.height = 1064/20
    this.line.x = window.innerWidth-window.innerWidth/8*4
    this.line.y = window.innerHeight-this.line.height
    this.line.anchor.set(0.5)
    this.line.interactive = true
    this.ThirdChallengeContainer.addChild(this.line) 
  }

  drawRandomLine() {
    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 4) {
        that.randomLine = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })
    this.randomNumber = Math.random()
    this.randomLine.width = 1056/10*this.randomNumber
    this.randomLine.height = 1064/10*this.randomNumber
    this.randomLine.x = window.innerWidth-Math.random()*window.innerWidth
    this.randomLine.y = window.innerHeight-Math.random()*window.innerHeight
    this.randomLine.anchor.set(0.5)
    TweenLite.to(this.randomLine, 0.5, {
      rotation: "-="+3
    })
    this.ThirdChallengeContainer.addChild(this.randomLine) 
  }

  drawHalfcircle() {
    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 5) {
        that.halfcircle = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })
    this.halfcircle.width = 532/20
    this.halfcircle.height = 1065/20
    this.halfcircle.x = window.innerWidth-window.innerWidth/8*2
    this.halfcircle.y = window.innerHeight-this.halfcircle.height
    this.halfcircle.anchor.set(0.5)
    this.halfcircle.interactive = true
    this.ThirdChallengeContainer.addChild(this.halfcircle) 
  }

  drawRandomHalfcircle() {
    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 5) {
        that.randomHalfcircle = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })
    this.randomNumber = Math.random()
    this.randomHalfcircle.width = 532/10*this.randomNumber
    this.randomHalfcircle.height = 1065/10*this.randomNumber
    this.randomHalfcircle.x = window.innerWidth-Math.random()*window.innerWidth
    this.randomHalfcircle.y = window.innerHeight-Math.random()*window.innerHeight
    this.randomHalfcircle.anchor.set(0.5)
    TweenLite.to(this.randomHalfcircle, 0.5, {
      rotation: "+="+3
    })
    this.ThirdChallengeContainer.addChild(this.randomHalfcircle) 
  }

  drawZoomIcon() {
    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 6) {
        that.zoomIcon = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })
    this.zoomIcon.width = 30
    this.zoomIcon.height = 30
    this.zoomIcon.x = window.innerWidth-window.innerWidth*29/30
    this.zoomIcon.y = window.innerHeight/6*3
    this.zoomIcon.interactive = true
    this.ThirdChallengeContainer.addChild(this.zoomIcon) 
  }

  drawDezoomIcon() {
    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 6) {
        that.dezoomIcon = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })
    this.dezoomIcon.width = 30
    this.dezoomIcon.height = 30
    this.dezoomIcon.x = window.innerWidth-window.innerWidth*29/30
    this.dezoomIcon.y = window.innerHeight/6*4
    this.dezoomIcon.interactive = true
    this.ThirdChallengeContainer.addChild(this.dezoomIcon) 
  }

  drawRotationIcon() {
    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 7) {
        that.rotationIcon = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })
    this.rotationIcon.width = 30
    this.rotationIcon.height = 30
    this.rotationIcon.x = window.innerWidth-window.innerWidth*29/30
    this.rotationIcon.y = window.innerHeight/6*2
    this.rotationIcon.interactive = true
    this.ThirdChallengeContainer.addChild(this.rotationIcon) 
  }

  drawCheckpoint() {
    this.checkpoint.beginFill(0xFFFFFF)
    this.checkpoint.lineStyle(2, 0xFFFFFF)
    this.checkpoint.drawCircle(window.innerWidth-60, window.innerHeight-60, 10)
    this.checkpoint.endFill()
    this.checkpoint.interactive = true
    this.ThirdChallengeContainer.addChild(this.checkpoint) 
  }

  displayRecompenseButton() {
    TweenLite.to(this.recompenseButton, 1.2, {
      autoAlpha: 1
    })
  }

  undDisplayRecompenseButton() {
    TweenLite.to(this.recompenseButton, 1.2, {
      autoAlpha: 0
    })
  }

  handleRecompenseButtonClick() {
    STORAGE.ThirdChallengeClass.undDisplayRecompenseButton()

    TweenLite.to([STORAGE.ThirdChallengeContainer, STORAGE.conclusionChallengeTextContainer], 0.5, {
      alpha: 0,
      display:'none',
      delay: 1
    })
    TweenLite.to([STORAGE.stage], 0.4, {
      alpha: 0,
      onComplete: function() {
        setTimeout(function(){
          STORAGE.ThirdChallengeContainer.destroy()
          STORAGE.ThirdChallengeClass.unbind()
          STORAGE.ThirdChallengeContainer = null
          STORAGE.conclusionChallengeTextContainer = null
          STORAGE.ThirdChallengeClass = null
          new ThirdRecompense()
        }, 1000)
      },
      delay: 2
    })

  }

  showConclusion() {
    /*TweenLite.to([this.cursor, this.pathBasic, this.pathPassed, this.pupilEmpty, this.eye], 0.6, {
      alpha: 0
    })

    TweenLite.to(this.conclusionChallengeTextContainer, 2, {
      autoAlpha: 1,
      delay: 1
    })
    this.displayRecompenseButton()*/
  }

}

export default ThirdChallenge
