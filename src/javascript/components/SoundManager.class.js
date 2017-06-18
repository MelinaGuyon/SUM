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
      volume: 0.4,
      loaded: function(err, sound) {
        let instance = sound.play()
        instance.on('progress', function(progress) {
          if (progress*100 >= 95 && that.loop == true ) {
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
    this.ambiance = PIXI.sound.Sound.from(trackLoop)
    this.ambiance.volume = 0
    this.ambiance.play()

    TweenLite.to(this.ambiance, 1, {
      volume: 0.4
    })
    this.ambiance.loop = true
  }

  lowerAmbiance(track) {
    TweenLite.to(track, 2, {
      volume: 0.1
    })
  }

  stopAmbiance(track) {
    TweenLite.to(track, 1.5, {
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
    TweenLite.to(this.ambianceRecompense, 1.5, {
      volume: 0.5
    })
    this.ambianceRecompense.loop = true
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
    TweenLite.to(this.voiceOver, 1, {
      volume: 5
    })
  }

}

export default SoundManager
