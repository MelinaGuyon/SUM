import TweenLite from 'gsap'

class ThirdRecompense {

  constructor(options) {
    STORAGE.ThirdRecompenseClass = this

    this.thirdRecompense = document.querySelector('.third-recompense')

    this.init()
  }

  init() {
    this.recompenseAppearing()
  }

  recompenseAppearing() {

    let that = this

    TweenLite.to(this.thirdRecompense, 0.5, {
      autoAlpha: 1, 
      display:'block',
      onComplete: that.recompenseDisappearing()
    })
  }

  recompenseDisappearing() {

    let that = this

    setTimeout(function(){
      TweenLite.to(that.thirdRecompense, 0.5, {
        autoAlpha: 0, 
        display:'none'
      })
    }, 6000)
  }

}

export default ThirdRecompense
