import firstCarouselDatas from '../datas/firstCarouselDatas.js'
import secondCarouselDatas from '../datas/secondCarouselDatas.js'
import thirdCarouselDatas from '../datas/thirdCarouselDatas.js'
import videoDatas from '../datas/videoDatas.js'
import ImageDeformation from './ImageDeformation.class.js'
import FirstChallenge from './FirstChallenge.class.js'

class CheckPoint {

  constructor(options) {
    this.checkPoint = new PIXI.Graphics()

    this.blackboard = options.blackboard
    this.blackBoardIndex = options.blackBoardIndex
    this.index = options.index
    this.context = options.context

    this.carouselNumber = STORAGE.carouselClass.carouselNumber
    if (this.carouselNumber == 1) {
      this.carouselDatas = firstCarouselDatas
    } else if (this.carouselNumber == 2) {
      this.carouselDatas = secondCarouselDatas
    } else if (this.carouselNumber == 3) {
      this.carouselDatas = thirdCarouselDatas
    }

    this.init()
    this.bind()
  }

  init() {

    if (this.context == "Carousel") {
      this.checkPoint.beginFill(0xffffff, 1)
      this.checkPoint.drawCircle(0, 0, this.carouselDatas.datasBlackboards[this.blackBoardIndex].checkPoints[this.index].rayon)
      this.checkPoint.endFill()
      this.checkPoint.x = this.carouselDatas.datasBlackboards[this.blackBoardIndex].checkPoints[this.index].x * STORAGE.ratioVertical + this.blackboard.graphicsData[0].shape.x
      this.checkPoint.y = this.carouselDatas.datasBlackboards[this.blackBoardIndex].checkPoints[this.index].y * STORAGE.ratioVertical + this.blackboard.graphicsData[0].shape.y
      this.checkPoint.interactive = true // pour attribuer événements à this.checkPoint
      this.checkPoint.isChecked = false
      this.blackboard.addChild(this.checkPoint)
    }
    else if(this.context == "VideoIntro") {
      this.checkPoint.beginFill(0xffffff, 1)
      this.checkPoint.drawCircle(0, 0, videoDatas.datasBlackboards[this.blackBoardIndex].checkPoints[this.index].rayon)
      this.checkPoint.endFill()
      this.checkPoint.x = videoDatas.datasBlackboards[this.blackBoardIndex].checkPoints[this.index].x * STORAGE.videoRatioVertical + this.blackboard.graphicsData[0].shape.x
      this.checkPoint.y = videoDatas.datasBlackboards[this.blackBoardIndex].checkPoints[this.index].y * STORAGE.videoRatioVertical + this.blackboard.graphicsData[0].shape.y
      this.checkPoint.interactive = true // pour attribuer événements à this.checkPoint
      this.checkPoint.isChecked = false
      this.blackboard.addChild(this.checkPoint)
    }

  }

  bind() {
    let that = this
    this.checkPoint.mouseover = function(mouseData){
      that.drawingDetection(mouseData)
    }
    this.checkPoint.mousedown = function(){
      that.drawingDetection()
    }
  }

  drawingDetection() {
    let that = this
    this.checkPoint.isChecked = true
    let drawValidated = true

    for (var i = 0; i < this.blackboard.children.length; i++) {
      if (!this.blackboard.children[i].isChecked) {
        drawValidated = false
      }
    }

    if (drawValidated) {
      TweenLite.to(this.blackboard.children, 0.3, {
        alpha: 0.5
      })

      if (this.blackboard.isTestLaunch) {

        if (this.context == "Carousel") {
          new ImageDeformation()
          this.animateSectionTransition(1)
        }
        else if (this.context == "VideoIntro") {
          STORAGE.videoIntro.play()
          TweenLite.to(STORAGE.blackboards[0].blackboard, 0.5, {
            alpha: 0,
            onComplete: function() {
              STORAGE.blackboards[0].blackboard.destroy()
            }
          })
        }
      }
    }
  }

  resetDrawingDetection() {
    for (var i = 0; i < this.blackboard.children.length; i++) {
      this.blackboard.children[i].isChecked = false
    }
  }

  animateSectionTransition(numberOfChallenge) {
    let textContainer = document.querySelector('.js-introduction-challenge-container')
    let textIntro = textContainer.querySelector('.js-introduction-challenge-text')
    if (numberOfChallenge =! null) {
      console.log(textIntro)
      TweenLite.to(textContainer, 2, {
        autoAlpha: 1,
        delay: 4
      })
    }

    TweenLite.to(STORAGE.carousel, 0.5, {
      alpha: 0,
      delay: 1
    })
    TweenLite.to([STORAGE.stage], 0.4, {
      alpha: 0,
      onComplete: function() {
        TweenLite.to(textContainer, 0.2, {
          autoAlpha: 0
        })
        setTimeout(function(){
          STORAGE.deformation.destroy()
          STORAGE.carousel.destroy()
          STORAGE.carouselClass.unbind()
          STORAGE.carousel = null
          STORAGE.carouselClass = null
          STORAGE.deformation = null
          STORAGE.deformationClass = null
          new FirstChallenge()
        }, 1000)
      },
      delay: 6.5
    })
  }
}

export default CheckPoint
