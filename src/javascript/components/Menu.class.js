import TweenLite from 'gsap'

class Menu {

  constructor(options) {
    this.MenuContainer = new PIXI.Container()
    //this.MenuContainer.alpha = 0
    STORAGE.MenuClass = this
    STORAGE.stage.addChild(this.MenuContainer)

    this.icone3 = document.getElementById("icone3")
    this.timeline = document.getElementById("timeline")
    this.timeline.state = 0
    this.menu = document.getElementById("menu")

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
      if (that.timeline.state == 0) {
        that.onIcone3Click()
        that.timeline.state = 1
      } else {
        that.onIcone3ClickAgain()
        that.timeline.state = 0
      }
    } 
  }

  onIcone3Click() {
    TweenLite.to(this.timeline, 0.6, {
      height: 500
    })  
  }
  onIcone3ClickAgain() {
    TweenLite.to(this.timeline, 0.6, {
      height: 0
    })  
  }

}

export default Menu
