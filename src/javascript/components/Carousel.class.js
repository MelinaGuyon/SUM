import Blackboard from './Blackboard.class.js'
import carouselDatas from '../datas/carouselDatas.js'

class Carousel {

    constructor(options) {
      this.carousel = new PIXI.Container()
      STORAGE.carouselClass = this
      STORAGE.carousel = this.carousel
      STORAGE.carousel.numberOfWindow = 11
      STORAGE.stage.addChild(this.carousel)

      this.spritesFonds = {}
      this.spritesForms = {}
      this.assets = {}
      this.totalHeightSteps = [0]
      STORAGE.ratioVertical = 1

      this.blackboards = []

      this.init()
      this.bind()
    }

    init() {
      STORAGE.loaderClass.loadCarouselPictures([
        'assets/before-challenge-1/carousel-test.jpg',
        'assets/before-challenge-1/0-forme-1.png',
        'assets/before-challenge-1/0-forme-2.png',
        'assets/before-challenge-1/0-forme-3.png',
        'assets/before-challenge-1/1-forme-1.png',
        'assets/before-challenge-1/1-forme-2.png',
        'assets/before-challenge-1/1-forme-3.png',
        'assets/before-challenge-1/1-forme-4.png',
        'assets/before-challenge-1/2-forme-1.png',
        'assets/before-challenge-1/2-forme-2.png',
        'assets/before-challenge-1/2-forme-3.png',
        'assets/before-challenge-1/2-forme-4.png',
        'assets/before-challenge-1/3-forme-1.png',
        'assets/before-challenge-1/3-forme-2.png',
        'assets/before-challenge-1/3-forme-3.png',
        'assets/before-challenge-1/3-forme-4.png',
        'assets/before-challenge-1/4-forme-1.png',
        'assets/before-challenge-1/4-forme-2.png',
        'assets/before-challenge-1/4-forme-3.png',
        'assets/before-challenge-1/4-forme-4.png',
        'assets/before-challenge-1/4-forme-5.png',
        'assets/before-challenge-1/4-forme-6.png',
        'assets/before-challenge-1/4-forme-7.png',
        'assets/before-challenge-1/5-forme-1.png',
        'assets/before-challenge-1/5-forme-2.png',
        'assets/before-challenge-1/5-forme-3.png',
        'assets/before-challenge-1/5-forme-4.png',
        'assets/before-challenge-1/6-forme-1.png',
        'assets/before-challenge-1/6-forme-2.png',
        'assets/before-challenge-1/6-forme-3.png',
        'assets/before-challenge-1/6-forme-4.png',
        'assets/before-challenge-1/7-forme-1.png',
        'assets/before-challenge-1/7-forme-2.png',
        'assets/before-challenge-1/7-forme-3.png',
        'assets/before-challenge-1/7-forme-4.png',
        'assets/before-challenge-1/7-forme-5.png',
        'assets/before-challenge-1/8-forme-1.png',
        'assets/before-challenge-1/8-forme-2.png',
        'assets/before-challenge-1/8-forme-3.png',
        'assets/before-challenge-1/8-forme-4.png',
        'assets/before-challenge-1/8-forme-5.png',
        'assets/before-challenge-1/8-forme-6.png',
        'assets/before-challenge-1/9-forme-1.png',
        'assets/before-challenge-1/9-forme-2.png',
        'assets/before-challenge-1/9-forme-3.png',
        'assets/before-challenge-1/10-forme-1.png',
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

        if (objectKey.split('.')[1] == 'jpg') {
          that.spritesFonds[objectKey] = sprite
        } else if (objectKey.split('.')[1] == 'png') {
          that.spritesForms[objectKey] = sprite
        }

        that.carousel.addChild(sprite)
      })
      this.makeCarousel()
    }

    makeCarousel() {
      let that = this
      Object.keys(that.spritesFonds).map(function(objectKey, index) {
          STORAGE.ratioVertical = window.innerHeight * STORAGE.carousel.numberOfWindow / that.spritesFonds[objectKey].texture.height
          that.spritesFonds[objectKey].height = window.innerHeight * STORAGE.carousel.numberOfWindow
          that.spritesFonds[objectKey].width = window.innerWidth

          let stepsNumber = that.spritesFonds[objectKey].height / window.innerHeight
          for (var i = 0; i < Math.floor(stepsNumber); i++) {
            that.totalHeightSteps.push(that.totalHeightSteps[that.totalHeightSteps.length -1] + that.spritesFonds[objectKey].height / Math.floor(stepsNumber))
          }
          that.spritesFonds[objectKey].zIndex = 1
      })

      Object.keys(that.spritesForms).map(function(objectKey, index) {
        STORAGE.ratioVertical = window.innerHeight / that.spritesForms[objectKey].texture.height
        that.spritesForms[objectKey].scale = new PIXI.Point(STORAGE.ratioVertical, STORAGE.ratioVertical)
        that.spritesForms[objectKey].x = window.innerWidth / 2 - that.spritesForms[objectKey].width / 2
        let position = objectKey.split('.')[0].split('/')[2].split('-')[0]
        that.spritesForms[objectKey].y = that.totalHeightSteps[position]
        that.spritesForms[objectKey].zIndex = 2
      })

      that.totalHeightSteps = [0]

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
      if (Math.abs(STORAGE.carousel.y - window.innerHeight) < window.innerHeight * STORAGE.carousel.numberOfWindow - 45 && e.deltaY > 0 ) { // stop le défilement au dernier sprite (défile tant que x abs < à largeur totale de tous les spritesFonds-1)
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
