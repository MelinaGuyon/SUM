class CanvasRenderer {

    constructor(options) {
      this.canvasRenderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight, { antialias: true })
      this.stage = new PIXI.Container()

      STORAGE.canvasRenderer = this.canvasRenderer
      STORAGE.stage = this.stage

      this.init()
    }

    init() {
      this.canvasRenderer.backgroundColor = 0x000000
      this.canvasRenderer.autoResize = true
      document.body.appendChild(this.canvasRenderer.view)
    }
}

export default CanvasRenderer
