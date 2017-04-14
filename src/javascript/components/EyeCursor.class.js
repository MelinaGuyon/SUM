import datas from '../datas.js'
import TweenLite from 'gsap'

class EyeCursor {

    constructor(options) {

        this.bigEye = new PIXI.Graphics
        this.path = new PIXI.Graphics
        this.cursor = new PIXI.Graphics

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
        this.path.lineStyle(3, 0x000000)
        this.path.lineTo(100, 300)
        this.path.endFill()
        this.path.interactive = true // pour attribuer événements à this.path
        STORAGE.stage.addChild(this.path)
    }

    createCursor() {
        this.cursor.beginFill(0x000000, 1)
        this.cursor.drawCircle(0, 0, 15)
        this.cursor.endFill()
        this.cursor.x = 100
        this.cursor.y = 300
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
        
        this.prev = this.cursor.y
        this.cursor.y = mouseData.data.global.y

        if (this.cursor.y < 100 || this.cursor.y > 300) {
            this.cursor.mousemove = null    
        }

        this.onRotationActivated()
    }

    onRotationActivated() {

        console.log(this.cursor.y)

        // this.bigEye.rotation = Math.PI * 2 * 0.500

        // on descend 
        if (this.cursor.y > this.prev) {
            this.bigEye.rotation -= Math.PI * 2 * 0.500/200
        }
        // on monte
        else if (this.cursor.y < this.prev && this.bigEye.rotation < Math.PI * 2 * 0.500) {
            this.bigEye.rotation += Math.PI * 2 * 0.500/200
        }

/*        for (let i = 90; i < 310; i++) {
            this.cursor.y = i;
        }*/
        /*console.log("X :", this.bigEye.x)
        console.log("LARGEUR :", this.bigEye.width)
        console.log("ANCRE Y :", this.bigEye.y+this.bigEye.height/2)*/
    }

}

export default EyeCursor