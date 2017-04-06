const PIXI = require('pixi.js');
import datas from './datas.js'
import RendererClass from './components/Renderer.class.js'
import CarouselClass from './components/Carousel.class.js'
import BlackboardClass from './components/Blackboard.class.js'

/*** SCENE SETUP ***/
let Renderer,
    Carousel

window.onload = function() {
  initCanvas()
}

function initCanvas() {

  Renderer = new RendererClass()
  Carousel = new CarouselClass({ renderer : Renderer })

  Renderer.stage.addChild(Carousel.carousel)

  render()
}

function render() {
  requestAnimationFrame(render)
  Renderer.renderer.render(Renderer.stage)
}
