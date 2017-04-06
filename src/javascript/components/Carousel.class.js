class Carousel {

    constructor(options) {
      this.loader = PIXI.loader
      this.carousel = new PIXI.Container()
      this.sprites = {}
      this.totalCarouselWidth = 0
      this.ratioVertical = 1
      this.assets = {}

      this.init()
    }

    init() {
      let that = this

      this.loadCarouselPictures()
      window.addEventListener('mousewheel', function(e){
        that.handleScroll(e)
      })
    }

    loadCarouselPictures() {
      let that = this

      this.loader
      .add([
        'assets/carousel-1.jpg',
        'assets/carousel-2.jpg'
      ])
      .on('progress', function(){
        that.loadProgressHandler()
      })
      .load(function(){
        that.setupLoaded()
      })
    }

    loadProgressHandler() {
    }

    setupLoaded() {

      this.assets.resources = this.loader.resources

      let that = this

      Object.keys(this.assets.resources).map(function(objectKey, index) {
        const sprite = new PIXI.Sprite(that.assets.resources[objectKey].texture)
        that.sprites[objectKey] = sprite
        that.carousel.addChild(sprite)
      })

      this.makeCarousel()
    }

    makeCarousel() {
      let that = this
      Object.keys(that.sprites).map(function(objectKey, index) {
        that.ratioVertical = window.innerHeight / that.sprites[objectKey].texture.height // calcul ratio vetical
        that.sprites[objectKey].scale = new PIXI.Point(that.ratioVertical, that.ratioVertical) // redimensionnement : img = taille fenêtre
        that.sprites[objectKey].x = that.totalCarouselWidth
        that.totalCarouselWidth += that.sprites[objectKey].width
      })
      that.totalCarouselWidth = 0
    }

    handleScroll(e) {
      if (Math.abs(this.carousel.x - window.innerWidth) < this.carousel.width - 45 && e.deltaY > 0 ) { // stop le défilement au dernier sprite (défile tant que x abs < à largeur totale de tous les sprites-1)
        this.carousel.x -= Math.abs(e.deltaY) / 3
      } else if (this.carousel.x > -45) {
        return
      } else if (e.deltaY < 0) {
        this.carousel.x += Math.abs(e.deltaY) / 3
      }
    }

}

export default Carousel
