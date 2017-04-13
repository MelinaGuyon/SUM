const PIXI = require('pixi.js')
import datas from './datas.js'
import RendererClass from './components/Renderer.class.js'
import CarouselClass from './components/Carousel.class.js'
import BlackboardClass from './components/Blackboard.class.js'
import ImageDeformationClass from './components/ImageDeformation.class.js'

window.STORAGE = {}

/*** SCENE SETUP ***/
let Renderer,
    Carousel,
    Deformation

window.onload = function() {
  initCanvas()
}

function initCanvas() {

  Renderer = new RendererClass()

  Carousel = new CarouselClass()

  // Deformation = new ImageDeformationClass({ renderer : Renderer })

  Renderer.stage.addChild(Carousel.carousel)
  // Renderer.stage.addChild(Deformation.image)

  render()
}

function render() {
  requestAnimationFrame(render)
  Renderer.renderer.render(Renderer.stage)
  // Deformation.render()
}
