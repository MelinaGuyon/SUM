import TweenLite from 'gsap'

class Menu {

  constructor(options) {
    this.MenuContainer = new PIXI.Container()
    //this.MenuContainer.alpha = 0
    STORAGE.MenuClass = this
    STORAGE.stage.addChild(this.MenuContainer)

    this.icone3 = document.getElementById("icone3")
    this.path = document.getElementById("path")
    this.path.state = 0
    this.epreuves = document.getElementById("epreuves")
    this.epreuves.x = window.innerWidth
    this.epreuves.alpha = 0
    console.log(this.epreuves.x)

    this.init()
    this.bind()
  }

  init() {
    TweenLite.set(STORAGE.stage, {
      alpha: 1
    })
    TweenLite.to(this.MenuContainer, 0.6, {
      alpha: 1
    })
  }

  bind() {
    let that = this
    this.icone3.onclick = function(){
      if (that.path.state == 0) {
        that.onIcone3Click()
        that.path.state = 1
      } else {
        that.onIcone3ClickAgain()
        that.path.state = 0
      }
    } 
  }

  onIcone3Click() {
    TweenLite.to(this.path, 0.6, {
      height: 500
    })
    TweenLite.to(this.epreuves, 0.6, {
      x: -150,
      alpha: 1
    })  
  }
  onIcone3ClickAgain() {
    TweenLite.to(this.path, 0.6, {
      height: 0
    })  
    TweenLite.to(this.epreuves, 0.6, {
      x: 50,
      alpha: 0
    })  
  }

}

export default Menu
