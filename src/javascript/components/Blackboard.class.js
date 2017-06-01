import carouselDatas from '../datas/carouselDatas.js'
import videoDatas from '../datas/videoDatas.js'
import TweenLite from 'gsap';
import CheckPointClass from './CheckPoint.class.js'

class Blackboard {

    constructor(options) {
      this.blackboard = new PIXI.Graphics

      this.index = options.index
      this.context = options.context

      this.drawnLine
      this.checkpoints = []

      this.init()
      this.bind()
    }

    init() {
      if (this.context == "Carousel1") {

        this.blackboard.beginFill(0x000000, 0)
        console.log(STORAGE.ratioVertical, 'in blackboard', carouselDatas.datasBlackboards[this.index].width * STORAGE.ratioVertical )
        this.blackboard.drawRect(carouselDatas.datasBlackboards[this.index].x * STORAGE.ratioVertical + STORAGE.positionHorizontal, carouselDatas.datasBlackboards[this.index].y * STORAGE.ratioVertical, carouselDatas.datasBlackboards[this.index].width * STORAGE.ratioVertical, carouselDatas.datasBlackboards[this.index].height * STORAGE.ratioVertical)
        this.blackboard.interactive = true // pour attribuer événements à this.blackboard

        STORAGE.carousel.addChild(this.blackboard)

        if (carouselDatas.datasBlackboards[this.index].isTestLaunch) {
          this.blackboard.isTestLaunch = true
        }

        for(let i = 0; i < carouselDatas.datasBlackboards[this.index].checkPoints.length; i++) {
          this.checkpoints.push(new CheckPointClass({ index : i, blackBoardIndex : this.index, blackboard : this.blackboard, context : "Carousel1" }))
        }
      } 
      else if (this.context == "VideoIntro") {

        this.blackboard.beginFill(0xff0000, 1)
        console.log(STORAGE.videoRatioVertical, 'in blackboard', videoDatas.datasBlackboards[this.index].width * STORAGE.videoRatioVertical )
        this.blackboard.drawRect(window.innerWidth / STORAGE.videoRatioX, window.innerHeight / STORAGE.videoRatioY, videoDatas.datasBlackboards[this.index].width, videoDatas.datasBlackboards[this.index].height)
        this.blackboard.interactive = true // pour attribuer événements à this.blackboard

        STORAGE.VideoContainer.addChild(this.blackboard)

        if (videoDatas.datasBlackboards[this.index].isTestLaunch) {
          this.blackboard.isTestLaunch = true
        }

        for(let i = 0; i < videoDatas.datasBlackboards[this.index].checkPoints.length; i++) {
          this.checkpoints.push(new CheckPointClass({ index : i, blackBoardIndex : this.index, blackboard : this.blackboard, context : "VideoIntro" }))
        }
      }  
    }

    bind() {
      let that = this
      this.blackboard.mousedown = function(mouseData){
        that.onBlackboardMouseDown(mouseData)
      }

      this.blackboard.mouseover = function(mouseData){
        that.onBlackboardMouseHover(mouseData)
      }
      this.blackboard.mouseout = function(mouseData){
        that.onBlackboardMouseOut(mouseData)
      }
    }

    onBlackboardMouseHover() {
      document.body.style.cursor = 'crosshair'
    }

    onBlackboardMouseDown(mouseData) {
      this.drawnLine = new PIXI.Graphics()
      this.drawnLine.beginFill(0xffffff)
      this.drawnLine.moveTo(mouseData.data.global.x, mouseData.data.global.y)

      STORAGE.stage.addChild(this.drawnLine)

      let that = this
      this.blackboard.mousemove = function(mouseData){
        that.onBlackboardMouseMove(mouseData)
      }
      this.blackboard.mouseup = function(mouseData){
        that.onBlackboardMouseUp(mouseData)
      }
    }

    onBlackboardMouseMove(mouseData) {
      this.drawnLine.lineStyle(3, 0xffffff)
      this.drawnLine.lineTo(mouseData.data.global.x, mouseData.data.global.y)
    }

    onBlackboardMouseOut() {
      if (this.drawnLine) {
        TweenLite.to(this.drawnLine, 0.3, {
          alpha: 0,
          onComplete: () => { this.drawnLine.clear() }
        })
      }

      document.body.style.cursor = 'auto'

      this.checkpoints.forEach(function(el) {
        el.mouseover = null
      })

      this.blackboard.mousemove = null
      this.blackboard.mouseup = null
      this.checkpoints[0].resetDrawingDetection()
    }

    onBlackboardMouseUp() {
      this.drawnLine.endFill()

      TweenLite.to(this.drawnLine, 0.3, {
        alpha: 0,
        onComplete: () => { this.drawnLine.clear() }
      })

      this.checkpoints.forEach(function(el) {
        el.mouseover = null
      })

      this.blackboard.mousemove = null
      this.checkpoints[0].resetDrawingDetection()
    }
}

export default Blackboard
