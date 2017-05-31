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
    .load(function(){
      STORAGE.carouselClass.setupCarouselPicturesLoaded()
    })
  }

  loadMenuPictures(pictures) {
    this.loader.resources = {}

    for (var i = 0; i < pictures.length; i++) {
      this.loader
      .add([pictures[i]])
    }

    this.loader
    .load(function(){
      STORAGE.MenuClass.setupMenuPicturesLoaded()
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

  loadSecondChallengePictures(pictures) {
    this.loader.resources = {}

    for (var i = 0; i < pictures.length; i++) {
      this.loader
      .add([pictures[i]])
    }

    this.loader
    .load(function(){
      STORAGE.SecondChallengeClass.setupSecondChallengePicturesLoaded()
    })
  }

  loadThirdChallengePictures(pictures) {
    this.loader.resources = {}

    for (var i = 0; i < pictures.length; i++) {
      this.loader
      .add([pictures[i]])
    }

    this.loader
    .load(function(){
      STORAGE.ThirdChallengeClass.setupThirdChallengePicturesLoaded()
    })
  }

  loadVideoPictures(pictures) {
    this.loader.resources = {}

    for (var i = 0; i < pictures.length; i++) {
      this.loader
      .add([pictures[i]])
    }

    this.loader
    .load(function(){
      STORAGE.VideoClass.setupVideoPicturesLoaded()
    })
  }

  loadDeformationPictures(pictures) {
    this.loader.resources = {}

    for (var i = 0; i < pictures.length; i++) {
      this.loader
      .add([pictures[i]])
    }

    this.loader
    .load(function(){
      STORAGE.deformationClass.setupDeformationPicturesLoaded()
    })
  }

}

export default Loader
