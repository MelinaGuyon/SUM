const PIXI = require('pixi.js')
require('pixi-sound')
import TweenLite from 'gsap'

class SoundManager {

  constructor(options) {
    STORAGE.soundManagerClass = this
    this.ambiance
    this.murmure
    this.voiceOver
  }

  launchAmbiance(track) {
    this.ambiance = PIXI.sound.Sound.from(track)
    this.ambiance.volume = 0
    this.ambiance.play()
    TweenLite.to(this.ambiance, 4, {
      volume: 0.4
    })
    this.ambiance.loop = true
  }

  lowerAmbiance(track){
    TweenLite.to(track, 2, {
      volume: 0.1
    })
  }

  stopAmbiance(track) {
    TweenLite.to(track, 6, {
      volume: 0,
      onComplete: function(){
        track.stop()
        track.removeSprites()
      }
    })
  }

  launchMurmure(track) {
    this.murmure = PIXI.sound.Sound.from(track)
    this.murmure.volume = 0
    this.murmure.play()
    TweenLite.to(this.murmure, 9, {
      volume: 0.1
    })
    this.murmure.loop = true
  }

  stopMurmure(track){
    TweenLite.to(track, 8, {
      volume: 0,
      onComplete: function(){
        track.stop()
        track.removeSprites()
      }
    })
  }

  launchVoiceOver(track) {
    this.voiceOver = PIXI.sound.Sound.from(track)
    this.voiceOver.volume = 0
    this.voiceOver.play()
    TweenLite.to(this.voiceOver, 4, {
      volume: 3
    })
  }

}

export default SoundManager
