import conclusionTextsDatas from '../datas/conclusionTexts.js'
import frames from '../datas/frames.js'
import TweenLite from 'gsap'

class FirstRecompense {

  constructor(options) {
    STORAGE.FirstRecompenseClass = this

    this.assets = {}
    this.background

    this.firstRecompense = document.getElementById("first-recompense-pathes")

    this.pathSUM = document.getElementById("path_sum")
    console.log(this.pathSUM)
    this.pathSUM.x = 500

    this.init()
    this.bind()
  }

  init() {

  }

  bind() {
  }

}

export default FirstRecompense
