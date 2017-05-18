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
    this.rectangle.mousedown = function(){ that.onShapeMouseDown(this) }
    this.circle.mousedown = function(){ that.onShapeMouseDown(this) }
    this.triangle.mousedown = function(){ that.onShapeMouseDown(this) }
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

  onShapeMouseDown(shape) {
    let that = this
    this.shape = shape

    this.isDragging = true
    document.body.style.cursor = '-webkit-grabbing'
    
    this.shape.mousemove = function(mouseData){
      that.onShapeMouseMove(mouseData)
    }
    window.addEventListener('mouseup', function(){
      that.onWindowMouseUp(that)
    })
  }

  onShapeMouseMove(mouseData) {
    console.log(this.shape.mousemove)
    this.shape.x = mouseData.data.global.x
    this.shape.y = mouseData.data.global.y

    console.log("SHAPE X", this.shape.x)
    console.log("MOUSE X", mouseData.data.global.x)
  }

  onWindowMouseUp(that) {
    if (that.shape && that.isDragging) {
      that.isDragging = false
      that.shape.mousemove = null
      document.body.style.cursor = 'auto'
    }
  }

  setupThirdChallengePicturesLoaded() {
    this.assets.resources = STORAGE.loader.resources

    this.drawRectangle()
    this.drawCircle()
    this.drawTriangle()
    this.bind()
  }

  drawRectangle() {
    this.rectangle.beginFill()
    this.rectangle.lineStyle(2, 0xFFFFFF)
    this.rectangle.drawRect(window.innerWidth-window.innerWidth/4*3-150, window.innerHeight-200, 150, 100)
    this.rectangle.interactive = true
    this.ThirdChallengeContainer.addChild(this.rectangle)
  }

  drawCircle() {
    this.circle = new PIXI.Graphics()
    this.circle.beginFill()
    this.circle.lineStyle(2, 0xFFFFFF)
    this.circle.drawCircle(window.innerWidth/2, window.innerHeight-150, 50)
    this.circle.endFill()
    this.circle.interactive = true
    this.ThirdChallengeContainer.addChild(this.circle) 
  }

  drawTriangle() {
    this.triangle = new PIXI.Graphics()
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
