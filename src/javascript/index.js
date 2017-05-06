const PIXI = require('pixi.js')

import Renderer from './components/Renderer.class.js'
import Loader from './components/Loader.class.js'
import SoundManager from './components/SoundManager.class.js'
import Carousel from './components/Carousel.class.js'
import FirstChallenge from './components/FirstChallenge.class.js'
import Menu from './components/Menu.class.js'
import FirstRecompense from './components/FirstRecompense.class.js'

window.STORAGE = {}

window.onload = function() {
  initCanvas()
}

function initCanvas() {

  new Renderer()
  new Loader()
  new SoundManager()
  // new Carousel()
  new Menu()
  new FirstChallenge()
  // new FirstRecompense()

  render()
}

function render() {
  requestAnimationFrame(render)
  STORAGE.renderer.render(STORAGE.stage)
}
