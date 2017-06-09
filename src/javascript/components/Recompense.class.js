import Carousel from './Carousel.class.js'
import soundBank from '../datas/soundBank.js'
import TweenLite from 'gsap'

class Recompense {

  constructor(options) {
    STORAGE.ThirdRecompenseClass = this
    this.recompenseNumber = options.number
    this.voiceOverLaunch = false

    if (this.recompenseNumber == 1) {
      this.recompense =  document.querySelector('.first-recompense')
    } else if (this.recompenseNumber == 2) {
      this.recompense = document.querySelector('.second-recompense')
    }  else if (this.recompenseNumber == 3) {
      this.recompense = document.querySelector('.third-recompense')
    }

    this.init()
  }

  init() {
    this.recompenseAppearing()
    if (this.recompenseNumber == 1) {
      if (this.voiceOverLaunch != true) {
        STORAGE.soundManagerClass.launchVoiceOver(soundBank.voiceOver.firstChallengeRecompense)
        this.voiceOverLaunch = true

        setTimeout(function() {
          STORAGE.soundManagerClass.stopAmbiance(STORAGE.soundManagerClass.ambiance)
        }, 4000)
      }
    } else if (this.recompenseNumber == 2) {
      if (this.voiceOverLaunch != true) {
        STORAGE.soundManagerClass.launchVoiceOver(soundBank.voiceOver.secondChallengeRecompense)
        this.voiceOverLaunch = true

        setTimeout(function() {
          STORAGE.soundManagerClass.stopAmbiance(STORAGE.soundManagerClass.ambiance)
        }, 4000)
      }
    } else if (this.recompenseNumber == 3) {
      if (this.voiceOverLaunch != true) {
        STORAGE.soundManagerClass.launchVoiceOver(soundBank.voiceOver.thirdChallengeRecompense)
        this.voiceOverLaunch = true

        setTimeout(function() {
          STORAGE.soundManagerClass.stopAmbiance(STORAGE.soundManagerClass.ambiance)
        }, 4000)
      }
    }
  }

  recompenseAppearing() {

    let that = this

    TweenLite.set(this.recompense, {
      display:'block',
    })

    TweenLite.to(this.recompense, 4, {
      autoAlpha: 1,
      onComplete: function() {
        if (that.recompenseNumber == 2) {
          document.querySelector('.webGLRenderer').classList.remove('hidden')
          document.querySelector('.canvasRenderer').classList.add('hidden')
          STORAGE.renderCanvas = false
        }
        that.recompenseDisappearing()
      }
    })
  }

  recompenseDisappearing() {

    let that = this

    setTimeout(function(){
      TweenLite.to(that.recompense, 0.5, {
        autoAlpha: 0,
        onComplete: () => {
          if (that.recompenseNumber < 3) {
            new Carousel({ number: that.recompenseNumber + 1 })
            TweenLite.to([STORAGE.carousel, STORAGE.stage], 0.5, {
              alpha: 1,
              delay: 1
            })
          }
          TweenLite.set(that.recompense, {
            display:'none'
          })
        }
      })
    }, 6000)
  }

}

export default Recompense
