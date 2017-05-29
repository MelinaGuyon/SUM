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
      'assets/first-challenge/fond.png',
      'assets/third-challenge/rectangle.png',
      'assets/third-challenge/circle.png',
      'assets/third-challenge/triangle.png'
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
    this.circle.mouseover = function(){ that.onShapeMouseOver() }
    this.circle.mouseout = function(){ that.onShapeMouseOut() }
    this.triangle.mouseover = function(){ that.onShapeMouseOver() }
    this.triangle.mouseout = function(){ that.onShapeMouseOut() }
    this.rectangle.mousedown = function(mouseData){ that.onShapeMouseDown(mouseData, this) }
    this.circle.mousedown = function(mouseData){ that.onShapeMouseDown(mouseData, this) }
    this.triangle.mousedown = function(mouseData){ that.onShapeMouseDown(mouseData, this) }
    this.checkpoint.mousedown = function() { that.onCheckpointMouseDown() }
  }

  unbind() {
    let that = this
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

    this.backtoBeginning(that.shape)
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
    })

/*  if (shape.graphicsData[0].shape.constructor.name == 'Circle') { that.drawCircle() } 
    else if (shape.graphicsData[0].shape.constructor.name == 'Rectangle') { that.drawRectangle() } 
    else if (shape.graphicsData[0].shape.constructor.name == 'Polygon') { that.drawTriangle() }
*/
    this.rectangle.mousedown = function(mouseData){ that.onShapeMouseDown(mouseData, this) }
    this.circle.mousedown = function(mouseData){ that.onShapeMouseDown(mouseData, this) }
    this.triangle.mousedown = function(mouseData){ that.onShapeMouseDown(mouseData, this) }
  }

  onCheckpointMouseDown() {
    let that = this

    setTimeout(function(){ 
      this.keepDoing = false
    }, 500)

    console.log(this.keepDoing)

    that.drawRandomCircle()
    that.drawRandomRectangle()
    that.drawRandomTriangle()

    if(this.keepDoing == true) {
      setTimeout(function(){ 
        that.onCheckpointMouseDown() 
      }, 100)
    }
  }

  setupThirdChallengePicturesLoaded() {
    this.assets.resources = STORAGE.loader.resources

    this.drawRectangle()
    this.drawCircle()
    this.drawTriangle()
    this.drawCheckpoint()
    this.bind()
  }

  drawRectangle() {
    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 1) {
        that.rectangle = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })
    this.rectangle.width = 715/10
    this.rectangle.height = 1063/10
    this.rectangle.x = window.innerWidth-window.innerWidth/4*3-this.rectangle.width
    this.rectangle.y = window.innerHeight/2-this.rectangle.height/2
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
    this.randomRectangle.x = window.innerWidth/(Math.random()*5)
    this.randomRectangle.y = window.innerHeight/(Math.random()*5)
    this.randomRectangle.interactive = true
    this.ThirdChallengeContainer.addChild(this.randomRectangle)
  }

  drawCircle() {
    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 2) {
        that.circle = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })
    this.circle.width = 1069/10
    this.circle.height = 1069/10
    this.circle.x = window.innerWidth-window.innerWidth/4*2-this.circle.width
    this.circle.y = window.innerHeight/2-this.circle.height/2
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
    this.randomCircle.x = window.innerWidth/(Math.random()*5)
    this.randomCircle.y = window.innerHeight/(Math.random()*5)
    this.randomCircle.interactive = true
    this.ThirdChallengeContainer.addChild(this.randomCircle) 
  }

  drawTriangle() {
    let that = this
    Object.keys(this.assets.resources).map(function(objectKey, index) {
      if (index == 3) {
        that.triangle = new PIXI.Sprite(that.assets.resources[objectKey].texture)
      }
    })
    this.triangle.width = 1920/10
    this.triangle.height = 962/10
    this.triangle.x = window.innerWidth-window.innerWidth/4-this.triangle.width
    this.triangle.y = window.innerHeight/2-this.triangle.height/2
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
    this.randomTriangle.x = window.innerWidth/(Math.random()*5)
    this.randomTriangle.y = window.innerHeight/(Math.random()*5)
    this.randomTriangle.interactive = true
    this.ThirdChallengeContainer.addChild(this.randomTriangle) 
  }


  drawCheckpoint() {
    this.checkpoint.beginFill(0xFFFFFF)
    this.checkpoint.lineStyle(2, 0xFFFFFF)
    this.checkpoint.drawCircle(50, 50, 10)
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
