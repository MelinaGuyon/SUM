const PIXI = require('pixi.js');
import RendererClass from './components/Renderer.class.js'
import DessinClass from './components/Dessin.class.js'
import CarouselClass from './components/Carousel.class.js'

/*** SCENE SETUP ***/
let Renderer,
    Carousel

window.onload = function() {
  initCanvas()
}

function initCanvas() {

  Renderer = new RendererClass()
  Carousel = new CarouselClass()

  Renderer.stage.addChild(Carousel.carousel)

  render()
}

function render() {
  requestAnimationFrame(render)
  Renderer.renderer.render(Renderer.stage)
}
