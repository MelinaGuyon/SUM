class Renderer {

    constructor(options) {
      this.renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, {antialias: false, transparent: false, resolution: 1})
      this.stage = new PIXI.Container()

      STORAGE.renderer = this.renderer
      STORAGE.stage = this.stage

      this.init()
    }

    init() {
      this.renderer.backgroundColor = 0x000000
      this.renderer.autoResize = true
      document.body.insertBefore(this.renderer.view , document.getElementById("canvas"))
    }
}

export default Renderer
