class Renderer {

    constructor(options) {
      this.renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, { antialias: true })
      this.stage = new PIXI.Container()
      this.init()
    }

    init() {
      this.renderer.backgroundColor = 0xffffff
      this.renderer.autoResize = true
      document.body.appendChild(this.renderer.view)
    }
}

export default Renderer
