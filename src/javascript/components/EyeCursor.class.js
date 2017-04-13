import datas from '../datas.js'
import TweenLite from 'gsap'

class EyeCursor {

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
        this.path.lineStyle(3, 0x000000)
        this.path.lineTo(100, 500)
        this.path.endFill()
        this.path.interactive = true // pour attribuer événements à this.path
        STORAGE.stage.addChild(this.path)
    }

    createCursor() {
        this.cursor.beginFill(0x000000, 1)
        this.cursor.drawCircle(0, 0, 15)
        this.cursor.endFill()
        this.cursor.x = 100
        this.cursor.y = 100
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
      this.cursor.mouseout = function(mouseData){
        that.onCursorMouseOut(mouseData)
      }
    }

    onCursorMouseMove(mouseData) {
        this.cursor.y = mouseData.data.global.y
        if (this.cursor.y < 90 || this.cursor.y > 510) {
            this.cursor.mousemove = null    
        }

        this.onRotationActivated()
    }

    onCursorMouseOut(mouseData) {
        this.cursor.mousemove = null    
    }

    onRotationActivated() {
        /*console.log("X :", this.bigEye.x)
        console.log("LARGEUR :", this.bigEye.width)
        console.log("ANCRE Y :", this.bigEye.y+this.bigEye.height/2)*/
        this.bigEye.rotation += 0.05
    }

}

export default EyeCursor