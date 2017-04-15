import datas from '../datas.js'
import TweenLite from 'gsap'

class EyeCursorFollow {

    constructor(options) {
      this.bigEye = new PIXI.Graphics
      this.path = new PIXI.Graphics
      this.cursor = new PIXI.Graphics

      this.createEye()
      this.createPath()
      this.createCursor()
      this.bind()
    }

    createEye() {
      this.bigEye.beginFill(0x000000, 1)
      this.bigEye.lineStyle(1, 0x000000)
      this.bigEye.drawRect(400, 100, 600, 400)

      this.bigEye.position.set(this.bigEye.graphicsData[0].shape.x+this.bigEye.width/2, this.bigEye.graphicsData[0].shape.y+this.bigEye.height/2)
      this.bigEye.pivot.set(this.bigEye.graphicsData[0].shape.x+this.bigEye.width/2, this.bigEye.graphicsData[0].shape.y+this.bigEye.height/2)

      this.bigEye.interactive = true // pour attribuer événements à this.bigEye
      STORAGE.stage.addChild(this.bigEye)
    }

    createPath() {
      this.path.beginFill(0xffffff)
      this.path.moveTo(100, 100)
      this.path.lineStyle(2, 0x000000)
      this.path.lineTo(100, 700)
      this.path.endFill()
      this.path.interactive = true // pour attribuer événements à this.path
      STORAGE.stage.addChild(this.path)
    }

    createCursor() {
      this.cursor.beginFill(0x000000, 1)
      this.cursor.drawCircle(0, 0, 35)
      this.cursor.endFill()
      this.cursor.x = 100
      this.cursor.y = 700
      this.cursor.interactive = true // pour attribuer événements à this.cursor
      STORAGE.stage.addChild(this.cursor)
    }

    bind() {
      let that = this
      this.cursor.mousedown = function(mouseData){
        that.onCursorMouseDown(mouseData)
      }
    }

    onCursorMouseDown(mouseData) {
      if (mouseData.data.global.y > 500) {
        this.makeRotation(180)
        this.makeCursorMove('up')
      } else {
        this.makeRotation(0)
        this.makeCursorMove('down')
      }
    }

    makeRotation(rotation) {
      if (rotation == 0) {
        TweenLite.to(this.bigEye, 0.6, {
          rotation : 0,
          ease: Power1.easeIn
        })
      } else {
        TweenLite.to(this.bigEye, 0.6, {
          rotation : Math.PI * 2 * 0.500,
          ease: Power1.easeIn
        })
      }
    }

    makeCursorMove(direction) {
      if (direction == 'up') {
        TweenLite.to(this.cursor, 0.6, {
          y : 100,
          ease: Power1.easeIn
        })
      } else {
        TweenLite.to(this.cursor, 0.6 ,{
          y : 700,
          ease: Power1.easeIn
        })
      }
    }
}

export default EyeCursorFollow
