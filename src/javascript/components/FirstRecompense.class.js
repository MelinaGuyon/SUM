import TweenLite from 'gsap'

class FirstRecompense {

  constructor(options) {
    STORAGE.FirstRecompenseClass = this

    this.firstRecompense = document.querySelector('.first-recompense')

    this.init()
  }

  init() {
    this.recompenseAppearing()
  }

  recompenseAppearing() {

    let that = this

    TweenLite.to(this.firstRecompense, 0.5, {
      autoAlpha: 1, 
      display:'block',
      onComplete: that.recompenseDisappearing()
    })
  }

  recompenseDisappearing() {

    let that = this

    setTimeout(function(){
      TweenLite.to(that.firstRecompense, 0.5, {
        autoAlpha: 0, 
        display:'none'
      })
    }, 6000)
  }

}

export default FirstRecompense
