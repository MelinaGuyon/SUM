import conclusionTextsDatas from '../datas/conclusionTexts.js'
import frames from '../datas/frames.js'
import TweenLite from 'gsap'

class FirstRecompense {

  constructor(options) {
    STORAGE.FirstRecompenseClass = this

    this.assets = {}
    this.background

    this.init()
    this.bind()
  }

  init() {
    /*this.getBounds = require('getboundingbox')
 
    this.path = [ M357.6,885.8c-3.5-70.3-6.9-140.8-10.4-211c-2.6-53.2-5.3-106.6-16.5-158.6c-8-37.1-20.6-73.7-39.8-106.5
          c-17.3-29.5-45.2-51.8-45.8-88.6l-0.1-4.7c0-9.5,0.3-18.2,7.7-24.6c6.4-5.5,17.3,0.1,24.6,0c8.7-0.1,29.6-1,37.6-4.3
          c17.3-7.1,11.6-42.4,17.2-56.7c1.3-3.3,2-4.8,4.8-7.2c10.3-9,22.2-0.2,34.1-3.3c19.3-5,5.2-49.3,2.4-61.1
          c-6.9-28.8-14-57.8-24.3-85.6c-7.7-20.8-17-27-33.9-41.6C290.4,10.6,257-1,224.9,1.3c-11,0.8-21.9,3-32.7,5.2
          c-15.2,3.2-30.9,6.6-43.3,15.9c-6.2,4.7-11.3,10.7-16.2,16.7c-7.1,8.7-14.1,17.7-18.9,27.9c-10.6,22.5-12.9,56.7-8.9,81.2
          c4.4,27.2,10,31.9,10.1,59.4c0.1,23.2,2.5,46.4,3,69.6c0,2.6-0.1,29.5-0.1,29.5c0,0.9-0.9,45-0.9,45.8c-0.1,1.6-0.1,2.7-0.1,3
          c-4,61.6-49,108.1-74.9,161.5C12.3,578.5,6.3,648.6,5.1,715.7s-2.8,145.8-4.1,211v2.5l42.3-0.1c77.5-0.3,253.7-1,313.8-1.2h2.5
          L357.6,885.8z ]
    this.box = this.getBounds(this.path)

    console.log(this.box)*/

  }

  bind() {
  }

}

export default FirstRecompense
