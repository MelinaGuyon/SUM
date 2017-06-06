import Carousel from './Carousel.class.js'
import TweenLite from 'gsap'

class Recompense {

  constructor(options) {
    STORAGE.ThirdRecompenseClass = this
    this.recompenseNumber = options.number

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
        }
      })
    }, 6000)
  }

}

export default Recompense
