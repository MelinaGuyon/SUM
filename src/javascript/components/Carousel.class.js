import Blackboard from './Blackboard.class.js'
import carouselDatas from '../datas/carouselDatas.js'

class Carousel {

    constructor(options) {
      this.carousel = new PIXI.Container()
      STORAGE.carouselClass = this
      STORAGE.carousel = this.carousel
      STORAGE.stage.addChild(this.carousel)

      this.spritesFonds = {}
      this.assets = {}
      this.totalCarouselHeight = 0
      STORAGE.ratioVertical = 1

      this.blackboards = []

      this.init()
      this.bind()
    }

    init() {
      STORAGE.loaderClass.loadCarouselPictures([
        'assets/before-challenge-1/carousel-1.jpg',
        'assets/before-challenge-1/carousel-2.jpg',
        'assets/before-challenge-1/carousel-3.jpg',
        'assets/before-challenge-1/1-forme-1.png',
      ])
    }

    bind() {
      let that = this
      window.addEventListener('mousewheel', that.handleScroll)
      window.addEventListener('resize', that.handleResize)
    }

    unbind() {
      let that = this
      window.removeEventListener('mousewheel', that.handleScroll)
      window.removeEventListener('resize', that.handleResize)
      document.body.style.cursor = 'auto'
    }

    loadCarouselPicturesProgressHandler() {
    }

    setupCarouselPicturesLoaded() {
      let that = this
      this.assets.resources = STORAGE.loader.resources

      Object.keys(this.assets.resources).map(function(objectKey, index) {
        const sprite = new PIXI.Sprite(that.assets.resources[objectKey].texture)
        that.spritesFonds[objectKey] = sprite
        that.carousel.addChild(sprite)
      })
      this.makeCarousel()
    }

    makeCarousel() {
      let that = this
      Object.keys(that.spritesFonds).map(function(objectKey, index) {
        STORAGE.ratioHorizontal= window.innerWidth / that.spritesFonds[objectKey].texture.width // calcul ratio vetical
        that.spritesFonds[objectKey].scale = new PIXI.Point(STORAGE.ratioHorizontal, STORAGE.ratioHorizontal) // redimensionnement : img = taille fenêtre
        that.spritesFonds[objectKey].y = that.totalCarouselHeight
        that.totalCarouselHeight += that.spritesFonds[objectKey].height
      })
      that.totalCarouselHeight = 0

      for (var i = 0; i < this.blackboards.length; i++) {
        this.blackboards[i].blackboard.destroy()
      }

      this.blackboards = []
      this.initBlackboards()
    }

    initBlackboards() {
      for(let i = 0; i < carouselDatas.datasBlackboards.length; i++) {
        this.blackboards.push(new Blackboard({ index : i }))
      }
    }

    handleScroll(e) {
      if (Math.abs(STORAGE.carousel.y - window.innerHeight) < STORAGE.carousel.height - 45 && e.deltaY > 0 ) { // stop le défilement au dernier sprite (défile tant que x abs < à largeur totale de tous les spritesFonds-1)
        STORAGE.carousel.y -= Math.abs(e.deltaY) / 3
      } else if (STORAGE.carousel.y > -45) {
        return
      } else if (e.deltaY < 0) {
        STORAGE.carousel.y += Math.abs(e.deltaY) / 3
      }
    }

    handleResize() {
      STORAGE.renderer.resize(window.innerWidth, window.innerHeight)
      let timeOut
      clearTimeout(timeOut)
      timeOut = setTimeout(()=> {
        STORAGE.carouselClass.makeCarousel()
      }, 200)
    }

}

export default Carousel
