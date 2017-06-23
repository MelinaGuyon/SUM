const PIXI = require('pixi.js')

import Renderer from './components/Renderer.class.js'
import CanvasRenderer from './components/CanvasRenderer.class.js'
import Loader from './components/Loader.class.js'
import SoundManager from './components/SoundManager.class.js'
import Carousel from './components/Carousel.class.js'
import Menu from './components/Menu.class.js'
import FirstChallenge from './components/FirstChallenge.class.js'
import SecondChallenge from './components/SecondChallenge.class.js'
import ThirdChallenge from './components/ThirdChallenge.class.js'
import Video from './components/Video.class.js'
import Recompense from './components/Recompense.class.js'


window.STORAGE = {}

window.onload = function() {
  initCanvas()
}

function initCanvas() {
  STORAGE.renderCanvas = false

  new Renderer()
  new CanvasRenderer()
  new Loader()
  new Menu()
  new SoundManager()
  // new Video({ number: 1 })
  new Carousel({ number: 2 })
  // new Recompense({ number: 1 })

  render()
}

function render() {
  requestAnimationFrame(render)
  if (STORAGE.renderCanvas == false) {
    STORAGE.renderer.render(STORAGE.stage)
  } else if (STORAGE.renderCanvas == true) {

    STORAGE.canvasRenderer.render(STORAGE.canvasStage)
  }

}
