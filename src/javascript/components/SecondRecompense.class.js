import TweenLite from 'gsap'

class SecondRecompense {

  constructor(options) {
    STORAGE.SecondRecompenseClass = this

    this.secondRecompense = document.querySelector('.second-recompense')

    this.init()
  }

  init() {
    this.recompenseAppearing()
  }

  recompenseAppearing() {

    let that = this

    TweenLite.to(this.secondRecompense, 0.5, {
      autoAlpha: 1, 
      display:'block',
      onComplete: that.recompenseDisappearing()
    })
  }

  recompenseDisappearing() {

    let that = this

    setTimeout(function(){
      TweenLite.to(that.secondRecompense, 0.5, {
        autoAlpha: 0, 
        display:'none'
      })
    }, 6000)
  }

}

export default SecondRecompense
