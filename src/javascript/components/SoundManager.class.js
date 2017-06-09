const PIXI = require('pixi.js')
require('pixi-sound')
import TweenLite from 'gsap'

class SoundManager {

  constructor(options) {
    STORAGE.soundManagerClass = this
    this.ambiance
    this.ambianceRecompense
    this.murmure
    this.voiceOver
  }

  launchAmbianceBeginning(trackBeginning, trackLoop) {

    let that = this
    this.loop = true

    this.ambiance = PIXI.sound.Sound.from({
      src: trackBeginning,
      preload: true,
      loaded: function(err, sound) {
        let instance = sound.play()
        instance.on('progress', function(progress) {
          if (progress*100 >= 95 && that.loop == true ) {
            console.log('son de début fini')
            TweenLite.to(sound, 1, {
              volume: 0,
              onComplete: function() {
                sound.stop()
              }
            })
            that.launchAmbianceLoop(trackLoop)
            that.loop = false 
          }
        })
      }
    })
  }

  launchAmbianceLoop(trackLoop) {
    console.log("looping en cours")
    this.ambiance = PIXI.sound.Sound.from(trackLoop)
    this.ambiance.volume = 0
    this.ambiance.play()
    TweenLite.to(this.ambiance, 1, {
      volume: 0.7
    })
    this.ambiance.loop = true
  }

  lowerAmbiance(track){
    TweenLite.to(track, 2, {
      volume: 0.2
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

  launchAmbianceRecompense(track) {
    this.ambianceRecompense = PIXI.sound.Sound.from(track)
    this.ambianceRecompense.volume = 0
    this.ambianceRecompense.play()
    TweenLite.to(this.ambianceRecompense, 1, {
      volume: 0.5
    })
    this.ambianceRecompense.loop = true
  }

  launchMurmure(track) {
    this.murmure = PIXI.sound.Sound.from(track)
    this.murmure.volume = 0
    this.murmure.play()
    TweenLite.to(this.murmure, 9, {
      volume: 0.2
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
