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
      STORAGE.soundManagerClass.launchAmbianceRecompense(soundBank.firstChallengeCarousel.ambiance_ending)
      if (this.voiceOverLaunch != true) {
        STORAGE.soundManagerClass.launchVoiceOver(soundBank.voiceOver.firstChallengeRecompense)
        this.voiceOverLaunch = true

        setTimeout(function() {
          STORAGE.soundManagerClass.stopAmbiance(STORAGE.soundManagerClass.ambiance)
        }, 4000)
      }
    } else if (this.recompenseNumber == 2) {
      STORAGE.soundManagerClass.launchAmbianceRecompense(soundBank.secondChallengeCarousel.ambiance_ending)
      if (this.voiceOverLaunch != true) {
        STORAGE.soundManagerClass.launchVoiceOver(soundBank.voiceOver.secondChallengeRecompense)
        this.voiceOverLaunch = true

        setTimeout(function() {
          STORAGE.soundManagerClass.stopAmbiance(STORAGE.soundManagerClass.ambiance)
        }, 4000)
      }
    } else if (this.recompenseNumber == 3) {
      STORAGE.soundManagerClass.launchAmbianceRecompense(soundBank.thirdChallengeCarousel.ambiance_ending)
      if (this.voiceOverLaunch != true) {
        STORAGE.soundManagerClass.launchVoiceOver(soundBank.voiceOver.thirdChallengeRecompense)
        this.voiceOverLaunch = true

        STORAGE.soundManagerClass.stopAmbiance(STORAGE.soundManagerClass.ambiance)
      }
    }
  }

  recompenseAppearing() {

    let that = this

    TweenLite.to(this.recompense, 0.5, {
      autoAlpha: 1,
      display:'block',
      onComplete: that.recompenseDisappearing()
    })
  }

  recompenseDisappearing() {

    let that = this

    setTimeout(function(){
      TweenLite.to(that.recompense, 0.5, {
        autoAlpha: 0,
        display:'none',
        onComplete: () => {
          if (that.recompenseNumber < 3) {
            new Carousel({ number: that.recompenseNumber + 1 })
            TweenLite.to([STORAGE.carousel, STORAGE.stage], 0.5, {
              alpha: 1,
              delay: 1
            })
          }
          STORAGE.soundManagerClass.stopAmbiance(STORAGE.soundManagerClass.ambianceRecompense)
        }
      })
    }, 6000)
  }

}

export default Recompense
