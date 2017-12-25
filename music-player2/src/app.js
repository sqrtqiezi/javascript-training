import 'normalize.css'
import './app.scss'

import Mustache from 'mustache'
import $ from 'jquery'

class Player {
  constructor() {
    this.playlist = []
    this.index = 0
    this.template = $('#template').html()
    Mustache.parse(this.template)
    this.isMuted = false
    this.isPaused = false
  }

  load(playlist) {
    this.playlist = playlist
  }

  play() {
    this._play()
    this.isPaused = false
    this._renderPause()
  }

  backward() {
    if (this.index === 0) {
      this.index = this.playlist.length - 1
    } else {
      this.index --
    }
    this._play()
  }

  forward() {
    if (this.index === this.playlist.length - 1) {
      this.index = 0
    } else {
      this.index ++
    }
    this._play()
  }

  setProgress(progress) {
    $(".player-progress").width(`${progress}%`)
  }

  mute() {
    this.isMuted = !this.isMuted
    if (this.isMuted) {
      this.music.volume = 0
    } else {
      this.music.volume = 1
    }
    this._renderMute()
  }

  pause() {
    this.isPaused = !this.isPaused
    if (this.isPaused) {
      this.music.pause()
    } else {
      this.music.play()
    }
    this._renderPause()
  }

  _play() {
    let current = this.playlist[this.index]
    this._render(current)

    // player setting
    document.title = current.title
    if (this.music) {
      this.music.src = current.url
    } else {
      this.music = new Audio(current.url)
    }

    let player = this

    // 设置每半秒钟刷新一次进度条
    this.music.shouldUpdate = true
    this.music.ontimeupdate = function() {
      if(this.shouldUpdate) {
        let progress = (this.currentTime / this.duration) * 100
        player.setProgress(progress)
        this.shouldUpdate = false
        setTimeout(() => {
          this.shouldUpdate = true
        }, 500)
      }
    }

    // 自动播放下一首
    this.music.onended = function() {
      player.forward()
    }

    this.music.play()
  }

  _render(item) {
    let rendered = Mustache.render(this.template, item)
    $('#app').html(rendered)

    // 待模版渲染结束之后，执行事件绑定操作
    setTimeout(() => {
      $('.js-backward').click(this.backward.bind(this))
      $('.js-forward').click(this.forward.bind(this))
      $('.js-play').click(this.pause.bind(this))
      $('.js-volume').click(this.mute.bind(this))

      let $progress = $('.player-progress-wrapper')
      let progressWidth = $progress.width()
      $progress.click(function(event) {
        let progress = (event.offsetX/progressWidth) * 100
        this.music.currentTime = this.music.duration * progress / 100
        this.setProgress(progress)
      }.bind(this))
    }, 0)
  }

  _renderPause() {
    if (this.isPaused) {
      $('.js-play>.fa').removeClass('fa-pause').addClass('fa-play')
    } else {
      $('.js-play>.fa').removeClass('fa-play').addClass('fa-pause')
    }
  }

  _renderMute() {
    if (this.isMuted) {
      $('.js-volume>.fa').removeClass('fa-volume-up').addClass('fa-volume-off')
    } else {
      $('.js-volume>.fa').removeClass('fa-volume-off').addClass('fa-volume-up')
    }
  }

}

$(document).ready(function() {
  let player = new Player()
  $.get('assets/data.json', function(response) {
    player.load(response.data)
    player.play()
  })
})