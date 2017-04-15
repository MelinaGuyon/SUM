import Blackboard from './Blackboard.class.js'
import datas from '../datas.js'

class Loader {

  constructor(options) {
    this.loader = PIXI.loader
    STORAGE.loaderClass = this
    STORAGE.loader = this.loader
  }

  loadCarouselPictures(pictures) {
    this.loader.resources = {}

    for (var i = 0; i < pictures.length; i++) {
      this.loader
      .add([pictures[i]])
    }

    this.loader
    .on('progress', function(){
      STORAGE.carouselClass.loadCarouselPicturesProgressHandler()
    })
    .load(function(){
      STORAGE.carouselClass.setupCarouselPicturesLoaded()
    })
  }

  loadFirstChallengePictures(pictures) {
    this.loader.resources = {}

    for (var i = 0; i < pictures.length; i++) {
      this.loader
      .add([pictures[i]])
    }

    this.loader
    .load(function(){
      STORAGE.FirstChallengeClass.setupFirstChallengePicturesLoaded()
    })
  }

}

export default Loader
