import datas from '../datas.js'
import TweenLite from 'gsap';
import CheckPointClass from './CheckPoint.class.js'

class Blackboard {

    constructor(options) {
      this.blackboard = new PIXI.Graphics

      this.renderer = options.renderer
      this.carousel = options.carousel
      this.ratioVertical = options.ratioVertical
      this.index = options.index

      this.drawnLine
      this.checkpoints = []

      this.init()
      this.bind()
    }

    init() {
      this.blackboard.beginFill(0x000000, 0.3)
      this.blackboard.drawRect(datas.datasBlackboards[this.index].x * this.ratioVertical, datas.datasBlackboards[this.index].y * this.ratioVertical, datas.datasBlackboards[this.index].width * this.ratioVertical, datas.datasBlackboards[this.index].height * this.ratioVertical)
      this.blackboard.interactive = true // pour attribuer événements à this.blackboard
      this.carousel.addChild(this.blackboard)

      for(let i = 0; i < datas.datasBlackboards[this.index].checkPoints.length; i++) {
        this.checkPoints = new CheckPointClass({ index : i, blackBoardIndex : this.index, ratioVertical : this.ratioVertical, blackboard : this.blackboard })
      }
    }

    bind() {
      let that = this
      this.blackboard.mousedown = function(mouseData){
        that.onArdoiseMouseDown(mouseData)
      }
      this.blackboard.mouseover = function(mouseData){
        that.onArdoiseMouseHover(mouseData)
      }
      this.blackboard.mouseout = function(mouseData){
        that.onArdoiseMouseOut(mouseData)
      }
    }

    onArdoiseMouseHover() {
      document.body.style.cursor = 'crosshair'
    }

    onArdoiseMouseDown(mouseData) {
      this.drawnLine = new PIXI.Graphics()
      this.drawnLine.beginFill(0xffffff)
      this.drawnLine.moveTo(mouseData.data.global.x, mouseData.data.global.y)
      this.renderer.stage.addChild(this.drawnLine)

      let that = this
      this.blackboard.mousemove = function(mouseData){
        that.onArdoiseMouseMove(mouseData)
      }
      this.blackboard.mouseup = function(mouseData){
        that.onArdoiseMouseUp(mouseData)
      }
    }

    onArdoiseMouseMove(mouseData) {
      this.drawnLine.lineStyle(5, 0xffffff)
      this.drawnLine.lineTo(mouseData.data.global.x, mouseData.data.global.y)
    }

    onArdoiseMouseOut() {
      if (this.drawnLine) {
        TweenLite.to(this.drawnLine, 0.3, {
          alpha: 0,
          onComplete: () => { this.drawnLine.clear() }
        })
      }

      document.body.style.cursor = 'auto'

      // checkPoints.forEach(function(el) {
      //   el.mouseover = null
      // })

      this.blackboard.mousemove = null
      this.blackboard.mouseup = null
      // reseDrawingDetection(this.drawnLine)
    }

    onArdoiseMouseUp() {
      this.drawnLine.endFill()

      TweenLite.to(this.drawnLine, 0.3, {
        alpha: 0,
        onComplete: () => { this.drawnLine.clear() }
      })

      // checkPoints.forEach(function(el) {
      //   el.mouseover = null
      // })

      this.blackboard.mousemove = null
      // reseDrawingDetection(this.drawnLine)
      // })
    }
}

export default Blackboard
