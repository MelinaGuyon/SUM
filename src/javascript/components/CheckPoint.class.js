import datas from '../datas.js'
import ImageDeformation from './ImageDeformation.class.js'

class CheckPoint {

    constructor(options) {
      this.checkPoint = new PIXI.Graphics()

      this.blackboard = options.blackboard
      this.blackBoardIndex = options.blackBoardIndex
      this.index = options.index

      this.init()
      this.bind()
    }

    init() {
      this.checkPoint.beginFill(0xffffff, 1)
      this.checkPoint.drawCircle(0, 0, datas.datasBlackboards[this.blackBoardIndex].checkPoints[this.index].rayon)
      this.checkPoint.endFill()
      this.checkPoint.x = datas.datasBlackboards[this.blackBoardIndex].checkPoints[this.index].x * STORAGE.ratioVertical + this.blackboard.graphicsData[0].shape.x
      this.checkPoint.y = datas.datasBlackboards[this.blackBoardIndex].checkPoints[this.index].y * STORAGE.ratioVertical + this.blackboard.graphicsData[0].shape.y
      this.checkPoint.interactive = true // pour attribuer événements à this.checkPoint
      this.checkPoint.isChecked = false

      this.blackboard.addChild(this.checkPoint)
    }

    bind() {
      let that = this
      this.checkPoint.mouseover = function(mouseData){
        that.drawingDetection(mouseData)
      }
      this.checkPoint.mousedown = function(){
        that.drawingDetection()
      }
    }

    drawingDetection() {
      this.checkPoint.isChecked = true
      let drawValidated = true

      for (var i = 0; i < this.blackboard.children.length; i++) {
        if (!this.blackboard.children[i].isChecked) {
          drawValidated = false
        }
      }

      if (drawValidated) {
        TweenLite.to(this.blackboard.children, 0.3, {
          alpha: 0.5
        })

        if (this.blackboard.isTestLaunch) {
          let ImageDeformationClass = new ImageDeformation()
          // ImageDeformationClass.animate(ImageDeformationClass)
          // setTimeout(function(){
          //   STORAGE.carousel.destroy()
          //   STORAGE.carouselClass.unbind()
          //   STORAGE.carouselClass = null
          //   console.log(STORAGE.carousel)
          // }, 3000)
        }
      }
    }

    resetDrawingDetection() {
      for (var i = 0; i < this.blackboard.children.length; i++) {
        this.blackboard.children[i].isChecked = false
      }
    }
}

export default CheckPoint
