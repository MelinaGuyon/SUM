const PIXI = require('pixi.js')

import Renderer from './components/Renderer.class.js'
import Loader from './components/Loader.class.js'
import SoundManager from './components/SoundManager.class.js'
import Carousel from './components/Carousel.class.js'
import Menu from './components/Menu.class.js'
import SecondChallenge from './components/SecondChallenge.class.js'
import ThirdChallenge from './components/ThirdChallenge.class.js'
import Video from './components/Video.class.js'


window.STORAGE = {}

window.onload = function() {
  initCanvas()
}

function initCanvas() {
  new Renderer()
  new Loader()
  new SoundManager()
  // new Carousel({ number: 1 })
  new Menu()
  // new FirstChallenge()
  // new SecondChallenge()
  new ThirdChallenge()
  // new Video()

  render()
}

function render() {
  requestAnimationFrame(render)
  STORAGE.renderer.render(STORAGE.stage)
}
