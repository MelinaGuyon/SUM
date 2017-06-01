import Blackboard from './Blackboard.class.js'
import firstCarouselDatas from '../datas/firstCarouselDatas.js'
import secondCarouselDatas from '../datas/secondCarouselDatas.js'
import thirdCarouselDatas from '../datas/thirdCarouselDatas.js'
import soundBank from '../datas/soundBank.js'

class Carousel {

    constructor(options) {
      this.carousel = new PIXI.Container()
      STORAGE.carouselClass = this
      STORAGE.carousel = this.carousel
      STORAGE.stage.addChild(this.carousel)

      this.carouselNumber = options.number
      if (this.carouselNumber == 1) {
        this.carouselDatas = firstCarouselDatas
        STORAGE.carousel.numberOfWindow = 8
      } else if (this.carouselNumber == 2) {
        this.carouselDatas = secondCarouselDatas
        STORAGE.carousel.numberOfWindow = 6
      } else if (this.carouselNumber == 3) {
        this.carouselDatas = thirdCarouselDatas
        STORAGE.carousel.numberOfWindow = 8
      }

      this.spritesFonds = {}
      this.spritesForms = {}
      this.assets = {}
      this.totalHeightSteps = [0]
      STORAGE.ratioVertical = 1

      this.blackboards = []

      this.voiceOverLaunch = false

      this.init()
      this.bind()
    }

    init() {
      STORAGE.loaderClass.loadCarouselPictures(this.carouselDatas.datasImages)
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
        } else if (objectKey.split('.')[1] == 'gif') {
          that.spritesForms[objectKey] = sprite
        }

        that.carousel.addChild(sprite)
      })
      this.makeCarousel()
    }

    makeCarousel() {
      let that = this
      Object.keys(that.spritesFonds).map(function(objectKey, index) {
          that.spritesFonds[objectKey].height = window.innerHeight * STORAGE.carousel.numberOfWindow
          that.spritesFonds[objectKey].width = window.innerWidth

          let stepsNumber = that.spritesFonds[objectKey].height / window.innerHeight
          for (var i = 0; i < Math.floor(stepsNumber); i++) {
            that.totalHeightSteps.push(that.totalHeightSteps[that.totalHeightSteps.length -1] + that.spritesFonds[objectKey].height / Math.floor(stepsNumber))
          }
          that.spritesFonds[objectKey].zIndex = 1
      })

      let keysForms = Object.keys(that.spritesForms)
      let lastForm = keysForms[keysForms.length-1]

      Object.keys(that.spritesForms).map(function(objectKey, index) {

        // pour que chaque image fasse 100% de hauteur
        STORAGE.ratioVertical = window.innerHeight / that.spritesForms[objectKey].texture.height
        that.spritesForms[objectKey].scale = new PIXI.Point(STORAGE.ratioVertical , STORAGE.ratioVertical)

        // pour centrer verticalement
        let position = objectKey.split('.')[0].split('/')[2].split('-')[0]
        that.spritesForms[objectKey].y = that.totalHeightSteps[position]
        that.spritesForms[objectKey].zIndex = 2

        if (objectKey == lastForm) {
          that.spritesForms[objectKey].rapidity = 0
        } else {
          if (that.carouselNumber == 1) {
            that.spritesForms[objectKey].rapidity = Math.random() * (2 - 0.7) + 0.7
          } else if(that.carouselNumber == 2){
            that.spritesForms[objectKey].rapidity = Math.random() * (0.8 - 0.4) + 0.4
          } else if(that.carouselNumber == 3){
            that.spritesForms[objectKey].rapidity = Math.random() * (2 - 0.7) + 0.7
          }

        }
      })

      that.totalHeightSteps = [0]

      for (var i = 0; i < this.blackboards.length; i++) {
        this.blackboards[i].blackboard.destroy()
      }

      this.blackboards = []
      this.initBlackboards()
    }

    initBlackboards() {
      for(let i = 0; i < this.carouselDatas.datasBlackboards.length; i++) {
        this.blackboards.push(new Blackboard({ index : i, context : "Carousel" }))
      }
    }

    handleScroll(e) {
      if (Math.abs(STORAGE.carousel.y - window.innerHeight) < window.innerHeight * STORAGE.carousel.numberOfWindow - 25 && e.deltaY > 0 ) { // stop le défilement au dernier sprite (défile tant que x abs < à largeur totale de tous les spritesFonds-1)
        STORAGE.carousel.y -= Math.abs(e.deltaY) / 3
        STORAGE.carouselClass.doParallax('down')
      } else if (STORAGE.carousel.y > -25) {
        return
      } else if (e.deltaY < 0) {
        STORAGE.carousel.y += Math.abs(e.deltaY) / 3
        STORAGE.carouselClass.doParallax('up')
      }

      if (STORAGE.carouselClass.voiceOverLaunch != true && STORAGE.carousel.y < -4000) {
        STORAGE.soundManagerClass.launchVoiceOver(soundBank.voiceOver.firstChallengeCarousel)
        STORAGE.carouselClass.voiceOverLaunch = true
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

    doParallax(direction) {
      let that = this

      if (direction == 'down') {
        Object.keys(that.spritesForms).map(function(objectKey, index) {
          if (Math.abs(that.carousel.y + that.spritesForms[objectKey].y) < 1000) {
            if (that.carouselNumber == 2 && index == 3 || that.carouselNumber == 2 && index == 5 || that.carouselNumber == 2 && index == 16 || that.carouselNumber == 2 && index == 9) {
              return
            }
            if (that.carouselNumber == 2 && index == 7 || that.carouselNumber == 2 && index == 11) {
              that.spritesForms[objectKey].y += that.spritesForms[objectKey].rapidity
              return
            }
            that.spritesForms[objectKey].y -= that.spritesForms[objectKey].rapidity
          }
        })
      } else if (direction == 'up') {
        Object.keys(that.spritesForms).map(function(objectKey, index) {
          if (Math.abs(that.carousel.y + that.spritesForms[objectKey].y) < 1000) {
            if (that.carouselNumber == 2 && index == 3 || that.carouselNumber == 2 && index == 5 || that.carouselNumber == 2 && index == 16 || that.carouselNumber == 2 && index == 9) {
              return
            }
            if (that.carouselNumber == 2 && index == 7 || that.carouselNumber == 2 && index == 11) {
              that.spritesForms[objectKey].y -= that.spritesForms[objectKey].rapidity
              return
            }
            that.spritesForms[objectKey].y += that.spritesForms[objectKey].rapidity
          }
        })
      }
    }
}

export default Carousel
