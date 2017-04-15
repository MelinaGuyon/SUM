class Renderer {

    constructor(options) {
      this.renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, { antialias: true })
      this.stage = new PIXI.Container()

      STORAGE.renderer = this.renderer
      STORAGE.stage = this.stage

      this.init()
    }

    init() {
      this.renderer.autoResize = true
      document.body.appendChild(this.renderer.view)
    }
}

export default Renderer
