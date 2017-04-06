import datas from '../datas.js'

class CheckPoint {

    constructor(options) {
      this.checkPoint = new PIXI.Graphics()

      this.blackboard = options.blackboard
      this.blackBoardIndex = options.blackBoardIndex
      this.index = options.index

      this.ratioVertical = options.ratioVertical

      this.init()
    }

    init() {
      this.checkPoint.beginFill(0xffffff, 1)
      this.checkPoint.drawCircle(0, 0, datas.datasBlackboards[this.blackBoardIndex].checkPoints[this.index].rayon)
      this.checkPoint.endFill()
      this.checkPoint.x = datas.datasBlackboards[this.blackBoardIndex].checkPoints[this.index].x * this.ratioVertical + this.blackboard.graphicsData[0].shape.x
      this.checkPoint.y = datas.datasBlackboards[this.blackBoardIndex].checkPoints[this.index].y * this.ratioVertical + this.blackboard.graphicsData[0].shape.y
      this.checkPoint.interactive = true // pour attribuer événements à this.checkPoint
      this.checkPoint.isChecked = false

      this.blackboard.addChild(this.checkPoint)
    }
}

export default CheckPoint
