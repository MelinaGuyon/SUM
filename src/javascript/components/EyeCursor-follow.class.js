import datas from '../datas.js'
import TweenLite from 'gsap'

class EyeCursorFollow {

    constructor(options) {
        this.bigEye = new PIXI.Graphics
        this.path = new PIXI.Graphics
        this.cursor = new PIXI.Graphics

        this.pixelToPass = 600

        this.animateBool = true

        this.prev = 300

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
      this.cursor.y = mouseData.data.global.y

      let that = this
      this.cursor.mousemove = function(mouseData){
        that.onCursorMouseMove(mouseData)
      }
      window.addEventListener('mouseup', function(){
        that.onWindowMouseUp(that)
      })

    }

    onWindowMouseUp(that) {
      if (that.cursor) {
        that.cursor.mousemove = null
      }
    }

    onCursorMouseMove(mouseData) {
      if (this.cursor.y < 720 && this.cursor.y > 80) {
        this.prev = this.cursor.y
        this.cursor.y = mouseData.data.global.y
        this.onRotationActivated()
      }
    }

    onRotationActivated() {
      let that = this
      let distancePassed = Math.abs(this.prev - this.cursor.y)

      if(this.cursor.y > this.prev) {
        this.pixelToPass += distancePassed
      } else {
        this.pixelToPass -= distancePassed
      }

      if (this.cursor.y > this.prev) {
        if (this.pixelToPass < 100) {
          this.bigEye.rotation -= Math.PI * 2 * 0.500 / 100
        } else if (this.pixelToPass < 200) {
          this.bigEye.rotation -= Math.PI * 2 * 0.500 / 70
        } else if (this.pixelToPass < 400) {
          this.bigEye.rotation -= Math.PI * 2 * 0.500 / 50
        }
        if (this.pixelToPass > 520) {
          this.animateEye(that, 0)
        }
      } else if (this.cursor.y < this.prev) {
        if (this.pixelToPass > 400) {
          this.bigEye.rotation += Math.PI * 2 * 0.500 / 100
        } else if (this.pixelToPass > 200) {
          this.bigEye.rotation += Math.PI * 2 * 0.500 / 70
        } else if (this.pixelToPass > 100) {
          this.bigEye.rotation += Math.PI * 2 * 0.500 / 50
        }

        if (this.pixelToPass < 80) {
          this.animateEye(that, 180)
        }
      }

    }
    animateEye(that, ref) {
      let it = that
      let deg = ref

      let requestID = window.requestAnimationFrame(function() {
        setTimeout(function() {
          it.animateBool = false
          return
        }, 600)

        if (it.animateBool) {
          it.animateEye(it, deg);
        }
      })

      if (that.animateBool == false) {
        window.cancelAnimationFrame(requestID)
        that.animateBool = true
      }

      if (ref == 180) {
        if (that.bigEye.rotation < Math.PI * 2 * 0.300) {
          that.bigEye.rotation += 0.05
        } else if (that.bigEye.rotation < Math.PI * 2 * 0.350) {
          that.bigEye.rotation += 0.04
        } else if (that.bigEye.rotation < Math.PI * 2 * 0.400) {
          that.bigEye.rotation += 0.03
        } else if (that.bigEye.rotation < Math.PI * 2 * 0.490) {
          that.bigEye.rotation += 0.02
        }  else if (that.bigEye.rotation > Math.PI * 2 * 0.490) {
          that.bigEye.rotation = Math.PI * 2 * 0.500
        }
      } else if (ref == 0) {
        if (that.bigEye.rotation > Math.PI * 2 * 0.400) {
          that.bigEye.rotation -= 0.05
        } else if (that.bigEye.rotation > Math.PI * 2 * 0.200) {
          that.bigEye.rotation -= 0.04
        } else if (that.bigEye.rotation > Math.PI * 2 * 0.100) {
          that.bigEye.rotation -= 0.03
        } else if (that.bigEye.rotation > Math.PI * 2 * 0.50) {
          that.bigEye.rotation -= 0.02
        } else if (that.bigEye.rotation < Math.PI * 2 * 0.50) {
          that.bigEye.rotation = 0
        }
      }
    }

}

export default EyeCursorFollow
