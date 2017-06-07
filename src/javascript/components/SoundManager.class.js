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
      volume: 0.7
    })
    this.ambiance.loop = true
  }

  lowerAmbiance(track){
    TweenLite.to(track, 2, {
      volume: 0.4
    })
  }

  launchMurmure(track) {
    this.murmure = PIXI.sound.Sound.from(track)
    this.murmure.volume = 0
    this.murmure.play()
    TweenLite.to(this.murmure, 4, {
      volume: 0.4
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
      volume: 1
    })
  }

  // pauseAndPlay(kill, soundToPlay, soundToStop) {
  //   let that = this
  //
  //   // the end of chellenge one, kill all sounds
  //   if (kill) {
  //     TweenLite.to([this.toStop, this.toPlay], 3, {
  //       volume: 0,
  //       onComplete: function(){
  //         that.toStop.stop()
  //         that.toPlay.stop()
  //         that.toStop.removeSprites()
  //         that.toPlay.removeSprites()
  //       }
  //     })
  //     return
  //   }
  //
  //   // during challenge one, switch sounds
  //   this.toStop = this.toPlay
  //   this.toPlay = PIXI.sound.Sound.from(soundToPlay)
  //   if (this.toStop) {
  //     TweenLite.to(this.toStop, 1, {
  //       volume: 0,
  //       onComplete: function(){
  //         that.toStop.stop()
  //         that.toStop.removeSprites()
  //         that.toPlay.volume = 0
  //         that.toPlay.play()
  //         TweenLite.to(that.toPlay, 4, {
  //           volume: 0.5
  //         })
  //         that.toPlay.loop = true
  //       }
  //     })
  //   } else {
  //     this.toPlay.volume = 0
  //     this.toPlay.play()
  //     TweenLite.to(this.toPlay, 4, {
  //       volume: 0.5
  //     })
  //     this.toPlay.loop = true
  //   }
  // }
}

export default SoundManager
