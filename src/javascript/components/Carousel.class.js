import Blackboard from './Blackboard.class.js'
import firstCarouselDatas from '../datas/firstCarouselDatas.js'
import secondCarouselDatas from '../datas/secondCarouselDatas.js'
import thirdCarouselDatas from '../datas/thirdCarouselDatas.js'
import soundBank from '../datas/soundBank.js'

class Carousel {

    constructor(options) {
      this.carousel = new PIXI.Container()
      STORAGE.carouselClass = this
      STORAGE.carousel = this.carousel
      STORAGE.stage.addChild(this.carousel)

      this.carouselNumber = options.number
      if (this.carouselNumber == 1) {
        this.carouselDatas = firstCarouselDatas
        STORAGE.carousel.numberOfWindow = 8
        STORAGE.time_pourcentage = 30
        STORAGE.soundManagerClass.launchAmbiance(soundBank.firstChallengeCarousel.ambiance)
      } else if (this.carouselNumber == 2) {
        this.carouselDatas = secondCarouselDatas
        STORAGE.soundManagerClass.launchAmbiance(soundBank.secondChallengeCarousel.ambiance)
        STORAGE.carousel.numberOfWindow = 6
        STORAGE.time_pourcentage = 60
      } else if (this.carouselNumber == 3) {
        this.carouselDatas = thirdCarouselDatas
        STORAGE.soundManagerClass.launchAmbiance(soundBank.thirdChallengeCarousel.ambiance)
        STORAGE.carousel.numberOfWindow = 6
        STORAGE.time_pourcentage = 90
      }

      console.log(this.carouselNumber)

      this.spritesFonds = {}
      this.spritesForms = {}
      this.assets = {}
      this.totalHeightSteps = [0]
      STORAGE.ratioVertical = 1

      this.blackboards = []

      // sounds
      this.voiceOverLaunch = false
      this.launchMurmure = false

      // animattion
      this.animeUpAndBlur = false
      this.animeZigZag = false


      this.blurFilter = new PIXI.filters.BlurFilter()
      this.blurFilter.blur = 0

      STORAGE.stage.filters = [
        this.blurFilter
      ]

      this.init()
      this.bind()
    }

    init() {
      this.reinitializeMenu()
      STORAGE.loaderClass.loadCarouselPictures(this.carouselDatas.datasImages)
    }

    bind() {
      let that = this
      window.addEventListener('mousewheel', that.handleScroll)
      window.addEventListener('resize', that.handleResize)

      if (this.carouselNumber == 1) {
        this.scaleTimer1 = window.setInterval(that.doScale1, 1550)
        this.scaleTimer2 = window.setInterval(that.doScale2, 1000)
        this.scaleTimer3 = window.setInterval(that.doScale3, 1550)
      }

      if (this.carouselNumber == 2) {
        this.opacityTimer = window.setInterval(that.doOpacity, 6000)
      }

      if (this.carouselNumber == 3) {
        this.rotationTimer1 = window.setInterval(that.doRotation1, 1550)
      }
    }

    unbind() {
      let that = this
      window.removeEventListener('mousewheel', that.handleScroll)
      window.removeEventListener('resize', that.handleResize)
      document.body.style.cursor = 'auto'

      window.clearInterval(STORAGE.carouselClass.scaleTimer1)
      window.clearInterval(STORAGE.carouselClass.scaleTimer2)
      window.clearInterval(STORAGE.carouselClass.scaleTimer3)

      window.clearInterval(STORAGE.carouselClass.opacityTimer)

      window.clearInterval(STORAGE.carouselClass.doRotation1)
    }

    reinitializeMenu() {
      TweenLite.to(STORAGE.path, 0.6, {
        height: 0,
        delay: 0.6
      })
      TweenLite.to(STORAGE.timelinePosition, 0.6, {
        y: 0,
        opacity: 0,
        delay: 0.6
      })
      TweenLite.to(STORAGE.epreuves, 0.6, {
        x: 0,
        opacity: 0
      })
    }

    loadCarouselPicturesProgressHandler() {
    }

    setupCarouselPicturesLoaded() {
      let that = this
      this.assets.resources = STORAGE.loader.resources

      Object.keys(this.assets.resources).map(function(objectKey, index) {
        const sprite = new PIXI.Sprite(that.assets.resources[objectKey].texture)

        if (objectKey.split('.')[1] == 'jpg') {
          that.spritesFonds[objectKey] = sprite
        } else if (objectKey.split('.')[1] == 'png') {
          that.spritesForms[objectKey] = sprite
        } else if (objectKey.split('.')[1] == 'gif') {
          that.spritesForms[objectKey] = sprite
        }

        that.carousel.addChild(sprite)
      })
      this.makeCarousel()
    }

    makeCarousel() {

      this.totalHeightSteps = [0]

      let that = this
      Object.keys(that.spritesFonds).map(function(objectKey, index) {

        STORAGE.ratioHorizontal = window.innerWidth / that.spritesFonds[objectKey].texture.width
        that.spritesFonds[objectKey].scale = new PIXI.Point(STORAGE.ratioHorizontal , STORAGE.ratioHorizontal)

          for (var i = 0; i < Math.floor(STORAGE.carousel.numberOfWindow); i++) {
            that.totalHeightSteps.push(that.totalHeightSteps[that.totalHeightSteps.length -1] + that.spritesFonds[objectKey].height / Math.floor(STORAGE.carousel.numberOfWindow))
          }

          that.spritesFonds[objectKey].zIndex = 1
      })

      let keysForms = Object.keys(that.spritesForms)
      let lastForm = keysForms[keysForms.length-1]

      Object.keys(that.spritesForms).map(function(objectKey, index) {

        // pour que chaque image fasse 100% de largeur
        that.spritesForms[objectKey].scale = new PIXI.Point(STORAGE.ratioHorizontal , STORAGE.ratioHorizontal)

        // pour placer en y
        if (objectKey == lastForm) {
          let position = objectKey.split('.')[0].split('/')[2].split('-')[0]
          that.spritesForms[objectKey].y = that.totalHeightSteps[position]

        } else {
          let position = objectKey.split('.')[0].split('/')[2].split('-')[0]
          that.spritesForms[objectKey].y = that.totalHeightSteps[position]
        }

        that.spritesForms[objectKey].zIndex = 2

        if (objectKey == lastForm) {
          that.spritesForms[objectKey].rapidity = 0
        } else {
          if (that.carouselNumber == 1) {
            that.spritesForms[objectKey].rapidity = Math.random() * (0.8 - 0.1) + 0.1
          } else if(that.carouselNumber == 2){
            that.spritesForms[objectKey].rapidity = Math.random() * (0.8 - 0.1) + 0.1
          } else if(that.carouselNumber == 3){
            that.spritesForms[objectKey].rapidity = Math.random() * (0.8 - 0.1) + 0.1
          }

        }
      })

      for (var i = 0; i < this.blackboards.length; i++) {
        this.blackboards[i].blackboard.destroy()
      }

      this.blackboards = []
      this.initBlackboards()
    }

    initBlackboards() {
      for(let i = 0; i < this.carouselDatas.datasBlackboards.length; i++) {
        this.blackboards.push(new Blackboard({ index : i, context : "Carousel" }))
      }
    }

    handleScroll(e) {
      if (Math.abs(STORAGE.carousel.y - window.innerHeight) <  STORAGE.carouselClass.totalHeightSteps[1] * STORAGE.carousel.numberOfWindow - 25 && e.deltaY > 0 ) { // stop le défilement au dernier sprite (défile tant que x abs < à largeur totale de tous les spritesFonds-1)
        STORAGE.carousel.y -= Math.abs(e.deltaY) / 8
        STORAGE.carouselClass.doParallax('down')
      } else if (STORAGE.carousel.y > -25) {
        return
      } else if (e.deltaY < 0) {
        STORAGE.carousel.y += Math.abs(e.deltaY) / 8
        STORAGE.carouselClass.doParallax('up')
      }

      if ( STORAGE.carouselClass.animeUpAndBlur != true && STORAGE.carousel.y < -2000 && STORAGE.carouselClass.carouselNumber == 1) {
        TweenLite.to( STORAGE.carousel, 1.6, {
          y: -800,
          ease: Power2.easeInOut
        })
        TweenLite.to( STORAGE.carousel, 1.4, {
          y: -1700,
          ease: Power4.easeInOut,
          delay: 1.6
        })
        TweenLite.to(STORAGE.carouselClass.blurFilter, 2, {
          blur: 12,
          ease: Power4.easeInOut,
          onUpdate: function() {
            STORAGE.stage.filters = [
              STORAGE.carouselClass.blurFilter
            ]
          },
          onComplete: function() {
            TweenLite.to(STORAGE.carouselClass.blurFilter, 1, {
              blur: 0,
              ease: Power2.easeInOut,
              onUpdate: function() {
                STORAGE.stage.filters = [
                  STORAGE.carouselClass.blurFilter
                ]
              }
            })
          }
        })

        STORAGE.carouselClass.animeUpAndBlur = true
      }


      if ( STORAGE.carouselClass.animeZigZag != true && STORAGE.carousel.y < -2000 && STORAGE.carouselClass.carouselNumber == 2) {

        STORAGE.renderer.backgroundColor = 0xffffff

        TweenLite.to( STORAGE.carousel, 4, {
          x:-4,
          ease: Elastic.easeInOut.config(4, 0.1),
          onComplete: function() {
            TweenLite.to( STORAGE.carousel, 0.2, {
              x: 0
            })
          }
        })

        TweenLite.to(STORAGE.carouselClass.blurFilter, 0.7, {
          blur: 8,
          ease: Power4.easeInOut,
          onUpdate: function() {
            STORAGE.stage.filters = [
              STORAGE.carouselClass.blurFilter
            ]
          },
          onComplete: function() {
            TweenLite.to(STORAGE.carouselClass.blurFilter, 4.5, {
              blur: 0,
              ease: Power2.easeInOut,
              onUpdate: function() {
                STORAGE.stage.filters = [
                  STORAGE.carouselClass.blurFilter
                ]
              }
            })

            setTimeout(function() {
              STORAGE.renderer.backgroundColor = 0x000000
            }, 6000)
          }
        })

        STORAGE.carouselClass.animeZigZag = true
      }

      // carousel 1
      if (STORAGE.carouselClass.carouselNumber == 1 && STORAGE.carousel.y < -1800 && STORAGE.carouselClass.launchMurmure != true) {
        STORAGE.soundManagerClass.launchMurmure(soundBank.firstChallengeCarousel.ambiance2)
        STORAGE.carouselClass.launchMurmure = true
      }

      if (STORAGE.carouselClass.carouselNumber == 1) {
        if (STORAGE.carouselClass.voiceOverLaunch != true && STORAGE.carousel.y < -3000) {
          STORAGE.soundManagerClass.launchVoiceOver(soundBank.voiceOver.firstChallengeCarousel)
          STORAGE.carouselClass.voiceOverLaunch = true
        }
      }
      else if (STORAGE.carouselClass.carouselNumber == 2) {
        if (STORAGE.carouselClass.voiceOverLaunch != true && STORAGE.carousel.y < -2000) {
          STORAGE.soundManagerClass.launchVoiceOver(soundBank.voiceOver.secondChallengeCarousel)
          STORAGE.carouselClass.voiceOverLaunch = true
        }
      }
      else if (STORAGE.carouselClass.carouselNumber == 3) {
        if (STORAGE.carouselClass.voiceOverLaunch != true && STORAGE.carousel.y < -4000) {
          STORAGE.soundManagerClass.launchVoiceOver(soundBank.voiceOver.thirdChallengeCarousel)
          STORAGE.carouselClass.voiceOverLaunch = true
        }
      }
    }

    handleResize() {
      STORAGE.renderer.resize(window.innerWidth, window.innerHeight)
      let timeOut
      clearTimeout(timeOut)
      timeOut = setTimeout(()=> {
        STORAGE.carouselClass.makeCarousel()
      }, 200)
    }

    doOpacity() {
      console.log('test')
      if (document.hasFocus() ) {
        Object.keys(STORAGE.carouselClass.spritesForms).map(function(objectKey, index) {
          if (index == 1 || index == 5 || index == 7 || index == 9) {
            TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 3, {
              alpha : 0.2,
              onComplete: function() {
                TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 3, {
                  alpha : 1
                })
              }
            })
          }
          if (index == 0 || index == 6 || index == 10 || index == 13) {
            TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 3, {
              alpha : 0.2,
              delay : 3,
              onComplete: function() {
                TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 3, {
                  alpha : 1
                })
              }
            })
          }
        })
      }
    }

    doScale1() {
      if (document.hasFocus() ) {
        Object.keys(STORAGE.carouselClass.spritesForms).map(function(objectKey, index) {
          if (index == 19 || index == 21) {
            let initialX = STORAGE.carouselClass.spritesForms[objectKey].x
            let initialY = STORAGE.carouselClass.spritesForms[objectKey].y

            TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey].scale, 0.6, {
              x : "+=" + 0.05,
              y : "+=" + 0.05,
              onUpdate: function() {
                TweenLite.set(STORAGE.carouselClass.spritesForms[objectKey], {
                  x: initialX -( STORAGE.carouselClass.spritesForms[objectKey].width - window.innerWidth ) / 2,
                  y: initialY -( STORAGE.carouselClass.spritesForms[objectKey].width - window.innerWidth ) / 2
                })
              },
              onComplete: function() {
                TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey].scale, 0.6, {
                  x : "-=" + 0.05,
                  y : "-=" + 0.05,
                  onUpdate: function() {
                    TweenLite.set(STORAGE.carouselClass.spritesForms[objectKey], {
                      x: initialX - ( STORAGE.carouselClass.spritesForms[objectKey].width - window.innerWidth ) / 2,
                      y: initialY - ( STORAGE.carouselClass.spritesForms[objectKey].width - window.innerWidth ) / 2
                    })
                  },
                  onComplete: function() {
                    TweenLite.set(STORAGE.carouselClass.spritesForms[objectKey], {
                      clearProps: "all"
                    })
                  }
                })
              }
            })
          }
        })
      }
    }

    doScale2() {
      if (document.hasFocus() ) {
        Object.keys(STORAGE.carouselClass.spritesForms).map(function(objectKey, index) {
          if (index == 18  || index == 23 || index == 27) {
            let initialX = STORAGE.carouselClass.spritesForms[objectKey].x
            let initialY = STORAGE.carouselClass.spritesForms[objectKey].y

            TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey].scale, 0.4, {
              x : "+=" + 0.015,
              y : "+=" + 0.015,
              onUpdate: function() {
                TweenLite.set(STORAGE.carouselClass.spritesForms[objectKey], {
                  x: initialX -( STORAGE.carouselClass.spritesForms[objectKey].width - window.innerWidth ) / 2,
                  y: initialY -( STORAGE.carouselClass.spritesForms[objectKey].width - window.innerWidth ) / 2
                })
              },
              onComplete: function() {
                TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey].scale, 0.4, {
                  x : "-=" + 0.015,
                  y : "-=" + 0.015,
                  onUpdate: function() {
                    TweenLite.set(STORAGE.carouselClass.spritesForms[objectKey], {
                      x: initialX - ( STORAGE.carouselClass.spritesForms[objectKey].width - window.innerWidth ) / 2,
                      y: initialY - ( STORAGE.carouselClass.spritesForms[objectKey].width - window.innerWidth ) / 2
                    })
                  },
                  onComplete: function() {
                    TweenLite.set(STORAGE.carouselClass.spritesForms[objectKey], {
                      clearProps: "all"
                    })
                  }
                })
              }
            })
          }
        })
      }
    }

    doScale3() {
      if (document.hasFocus() ) {
        Object.keys(STORAGE.carouselClass.spritesForms).map(function(objectKey, index) {
          if (index == 22  || index == 25 || index == 17) {
            let initialX = STORAGE.carouselClass.spritesForms[objectKey].x
            let initialY = STORAGE.carouselClass.spritesForms[objectKey].y

            TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey].scale, 0.5, {
              x : "+=" + 0.09,
              y : "+=" + 0.09,
              onUpdate: function() {
                TweenLite.set(STORAGE.carouselClass.spritesForms[objectKey], {
                  x: initialX -( STORAGE.carouselClass.spritesForms[objectKey].width - window.innerWidth ) / 2,
                  y: initialY -( STORAGE.carouselClass.spritesForms[objectKey].width - window.innerWidth ) / 2
                })
              },
              onComplete: function() {
                TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey].scale, 0.5, {
                  x : "-=" + 0.09,
                  y : "-=" + 0.09,
                  onUpdate: function() {
                    TweenLite.set(STORAGE.carouselClass.spritesForms[objectKey], {
                      x: initialX - ( STORAGE.carouselClass.spritesForms[objectKey].width - window.innerWidth ) / 2,
                      y: initialY - ( STORAGE.carouselClass.spritesForms[objectKey].width - window.innerWidth ) / 2
                    })
                  },
                  onComplete: function() {
                    TweenLite.set(STORAGE.carouselClass.spritesForms[objectKey], {
                      clearProps: "all"
                    })
                  }
                })
              }
            })
          }
        })
      }
    }

    doRotation1() {
      if (document.hasFocus() ) {
        Object.keys(STORAGE.carouselClass.spritesForms).map(function(objectKey, index) {
          if (index == 14) {
            STORAGE.carouselClass.spritesForms[objectKey].anchor.set(0.06, 0.05)
            TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 0.3, {
              rotation : "+=" + 0.1,
              onComplete: function() {
                TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 0.3, {
                  rotation : "-=" + 0.1
                })
              }
            })
          }
          if (index == 6) {
            STORAGE.carouselClass.spritesForms[objectKey].anchor.set(0.01, 0.05)
            TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 0.5, {
              rotation : "+=" + 0.2,
              onComplete: function() {
                TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 0.5, {
                  rotation : "-=" + 0.2
                })
              }
            })
          }
          // truc qu'elle ne va peut etre pas aimer
          if (index == 3) {
            TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 0.5, {
              rotation : "-=" + 0.2,
              onComplete: function() {
                TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 0.5, {
                  rotation : "+=" + 0.2
                })
              }
            })
          }
          if (index == 13) {
            TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 0.6, {
              rotation : "+=" + 0.05,
              onComplete: function() {
                TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 0.6, {
                  rotation : "-=" + 0.05
                })
              }
            })
          }
          if (index == 7) {
            TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 0.6, {
              rotation : "+=" + 0.05,
              onComplete: function() {
                TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 0.6, {
                  rotation : "-=" + 0.05
                })
              }
            })
          }
          if (index == 4) {
            TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 0.3, {
              rotation : "+=" + 0.05,
              onComplete: function() {
                TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 0.3, {
                  rotation : "-=" + 0.05
                })
              }
            })
          }
          if (index == 10) {
            TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 0.3, {
              rotation : "-=" + 0.08,
              onComplete: function() {
                TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 0.3, {
                  rotation : "+=" + 0.08
                })
              }
            })
          }
          if (index == 12) {
            STORAGE.carouselClass.spritesForms[objectKey].anchor.set(0.01, 0.01)
            TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 0.6, {
              rotation : "-=" + 0.1,
              onComplete: function() {
                TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 0.5, {
                  rotation : "+=" + 0.1
                })
              }
            })
          }
          if (index == 15) {
            STORAGE.carouselClass.spritesForms[objectKey].anchor.set(0.01, 0.01)
            TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 0.5, {
              rotation : "-=" + 0.05,
              onComplete: function() {
                TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 0.5, {
                  rotation : "+=" + 0.05
                })
              }
            })
          }
          if (index == 9) {
            TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 0.5, {
              rotation : "+=" + 0.05,
              onComplete: function() {
                TweenLite.to(STORAGE.carouselClass.spritesForms[objectKey], 0.5, {
                  rotation : "-=" + 0.05
                })
              }
            })
          }
        })
      }
    }

    doParallax(direction) {
      let that = this

      if (direction == 'down') {
        Object.keys(that.spritesForms).map(function(objectKey, index) {
          if (Math.abs(that.carousel.y + that.spritesForms[objectKey].y) < 1000) {
            if (that.carouselNumber == 2 && index == 4 || that.carouselNumber == 2 && index == 5 || that.carouselNumber == 2 && index == 7 || that.carouselNumber == 2 && index == 13 || that.carouselNumber == 3 && index == 3 || that.carouselNumber == 3 && index == 5 || that.carouselNumber == 3 && index == 16 || that.carouselNumber == 3 && index == 9) {
              return
            }
            if (that.carouselNumber == 2 && index == 0 || that.carouselNumber == 2 && index == 8 || that.carouselNumber == 2 && index == 3 || that.carouselNumber == 3 && index == 7 || that.carouselNumber == 3 && index == 11) {
              that.spritesForms[objectKey].y += that.spritesForms[objectKey].rapidity
              return
            }
            that.spritesForms[objectKey].y -= that.spritesForms[objectKey].rapidity
          }
        })
      } else if (direction == 'up') {
        Object.keys(that.spritesForms).map(function(objectKey, index) {
          if (Math.abs(that.carousel.y + that.spritesForms[objectKey].y) < 1000) {
            if (that.carouselNumber == 2 && index == 4 || that.carouselNumber == 2 && index == 5 || that.carouselNumber == 2 && index == 7 || that.carouselNumber == 2 && index == 13 || that.carouselNumber == 3 && index == 3 || that.carouselNumber == 3 && index == 5 || that.carouselNumber == 3 && index == 16 || that.carouselNumber == 3 && index == 9) {
              return
            }
            if (that.carouselNumber == 2 && index == 0 || that.carouselNumber == 2 && index == 8 || that.carouselNumber == 2 && index == 3 || that.carouselNumber == 3 && index == 7 || that.carouselNumber == 3 && index == 11) {
              that.spritesForms[objectKey].y -= that.spritesForms[objectKey].rapidity
              return
            }
            that.spritesForms[objectKey].y += that.spritesForms[objectKey].rapidity
          }
        })
      }
    }
}

export default Carousel
