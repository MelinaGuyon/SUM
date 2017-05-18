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
    this.rectangle = new PIXI.Graphics()
    this.circle = new PIXI.Graphics()
    this.triangle = new PIXI.Graphics()
    this.checkpoint = new PIXI.Graphics()
    this.shape
    this.isDragging = false

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
      'assets/first-challenge/fond.png'
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

  onCheckpointMouseDown() {
    let that = this
    for(this.i=0; this.i<10; this.i++){
      setTimeout(function(){
        that.drawRandomCircle()
      }, 1000)
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
    this.rectangle.beginFill()
    this.rectangle.lineStyle(2, 0xFFFFFF)
    this.rectangle.drawRect(window.innerWidth-window.innerWidth/4*3-150, window.innerHeight-200, 150, 100)
    this.rectangle.endFill()
    this.rectangle.interactive = true
    this.ThirdChallengeContainer.addChild(this.rectangle)
  }

  drawCircle() {
    this.circle.beginFill()
    this.circle.lineStyle(2, 0xFFFFFF)
    this.circle.drawCircle(window.innerWidth/2, window.innerHeight-150, 50)
    this.circle.endFill()
    this.circle.interactive = true
    this.ThirdChallengeContainer.addChild(this.circle) 
  }

  drawRandomCircle() {
    this.randomCircle = new PIXI.Graphics()
    this.randomCircle.beginFill()
    this.randomCircle.lineStyle(2, 0xFFFFFF)
    this.randomCircle.drawCircle(window.innerWidth/(Math.random()*5), window.innerHeight/(Math.random()*5), Math.random()*100)
    this.randomCircle.endFill()
    this.randomCircle.interactive = true
    this.ThirdChallengeContainer.addChild(this.randomCircle) 
  }

  drawTriangle() {
    this.triangle.beginFill()
    this.triangle.lineStyle(2, 0xFFFFFF)
    this.triangle.moveTo(window.innerWidth-window.innerWidth/4, window.innerHeight-100)
    this.triangle.lineTo(window.innerWidth-window.innerWidth/4+150, window.innerHeight-100)
    this.triangle.lineTo(window.innerWidth-window.innerWidth/4+75, window.innerHeight-200)
    this.triangle.lineTo(window.innerWidth-window.innerWidth/4, window.innerHeight-100)
    this.triangle.endFill()
    this.triangle.interactive = true
    this.ThirdChallengeContainer.addChild(this.triangle)
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
