const PIXI = require('pixi.js')
import datas from './datas.js'
import Renderer from './components/Renderer.class.js'
import Carousel from './components/Carousel.class.js'
import Blackboard from './components/Blackboard.class.js'
import ImageDeformation from './components/ImageDeformation.class.js'
import EyeCursor from './components/EyeCursor.class.js'

window.STORAGE = {}

window.onload = function() {
  initCanvas()
}

function initCanvas() {

  new Renderer()
  // new Carousel()
  new EyeCursor()
  
  render()
}

function render() {
  requestAnimationFrame(render)
  STORAGE.renderer.render(STORAGE.stage)
}
