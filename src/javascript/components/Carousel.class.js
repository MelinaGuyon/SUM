import BlackboardClass from './Blackboard.class.js'
import datas from '../datas.js'

class Carousel {

    constructor(options) {
      this.carousel = new PIXI.Container()
      this.loader = PIXI.loader

      this.renderer = options.renderer

      this.sprites = {}
      this.assets = {}

      this.totalCarouselWidth = 0
      this.ratioVertical = 1

      this.blackboards = []

      this.init()
    }

    init() {
      let that = this

      this.loadCarouselPictures()
      window.addEventListener('mousewheel', function(e){
        that.handleScroll(e)
      })
    }

    loadCarouselPictures() {
      let that = this

      this.loader
      .add([
        'assets/carousel-1.jpg',
        'assets/carousel-2.jpg',
        'assets/carousel-3.jpg'
      ])
      .on('progress', function(){
        that.loadProgressHandler()
      })
      .load(function(){
        that.setupLoaded()
      })
    }

    loadProgressHandler() {
    }

    setupLoaded() {
      this.assets.resources = this.loader.resources

      let that = this

      Object.keys(this.assets.resources).map(function(objectKey, index) {
        const sprite = new PIXI.Sprite(that.assets.resources[objectKey].texture)
        that.sprites[objectKey] = sprite
        that.carousel.addChild(sprite)
      })

      this.makeCarousel()
    }

    makeCarousel() {
      let that = this
      Object.keys(that.sprites).map(function(objectKey, index) {
        that.ratioVertical = window.innerHeight / that.sprites[objectKey].texture.height // calcul ratio vetical
        that.sprites[objectKey].scale = new PIXI.Point(that.ratioVertical, that.ratioVertical) // redimensionnement : img = taille fenêtre
        that.sprites[objectKey].x = that.totalCarouselWidth
        that.totalCarouselWidth += that.sprites[objectKey].width
      })
      that.totalCarouselWidth = 0

      for (var i = 0; i < this.blackboards.length; i++) {
        this.blackboards[i].destroy()
      }
      // for (var i = 0; i < this.checkPoints.length; i++) {
      //   this.checkPoints[i].destroy()
      // }

      this.blackboards = []
      // this.checkPoints = []
      this.initBlackboards()
    }

    initBlackboards() {

      for(let i = 0; i < datas.datasBlackboards.length; i++) {
        this.blackboards = new BlackboardClass({ renderer : this.renderer, carousel : this.carousel, index : i, ratioVertical : this.ratioVertical })
      }

      // for(let i = 0; i < datas.datasCheckPoints.length; i++) {
      //   drawCheckpoint(i)
      // }

      // checkPoints.forEach(function(el) {
      //   el.mousedown = drawingDetection
      // })
    }

    handleScroll(e) {
      if (Math.abs(this.carousel.x - window.innerWidth) < this.carousel.width - 45 && e.deltaY > 0 ) { // stop le défilement au dernier sprite (défile tant que x abs < à largeur totale de tous les sprites-1)
        this.carousel.x -= Math.abs(e.deltaY) / 3
      } else if (this.carousel.x > -45) {
        return
      } else if (e.deltaY < 0) {
        this.carousel.x += Math.abs(e.deltaY) / 3
      }
    }
}

export default Carousel
