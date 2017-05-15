import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class VideoPlayer extends Component {
  componentDidMount() {
    this.initializeVideoAudio();
  }

  video = null;
  muteButton = null;
  playButton = null;
  volumeBar = null;
  fullScreenButton = null;

  initializeVideoAudio() {
    this.video = document.getElementById('video');

    this.initializeMuteButton();
    this.initializePlayPause();
    this.initializeVolumeBar();
    this.initializeFullscreenButton();
  }

  initializeMuteButton() {
    this.muteButton = document.getElementById('mute');

    // default mute to stop annoyance
    this.video.muted = true;
    this.muteButton.innerHTML = 'Unmute';
    // =============================

    this.muteButton.addEventListener('click', () => {
      if (this.video.muted) {
        this.unmuteVideo();
      } else {
        this.muteVideo();
      }
    });
  }

  initializePlayPause() {
    this.playButton = document.getElementById('play-pause');
    const playVideo = this.playVideo;
    const pauseVideo = this.pauseVideo;

    this.playButton.addEventListener('click', () => {
      if (this.video.paused) {
        playVideo();
      } else {
        pauseVideo();
      }
    });
  }

  initializeVolumeBar() {
    this.volumeBar = document.getElementById('volume-bar');

    this.volumeBar.addEventListener('change', () => {
      this.video.volume = this.volumeBar.value;
    });
  }

  initializeFullscreenButton() {
    this.fullScreenButton = document.getElementById('full-screen');

    this.fullScreenButton.addEventListener('click', () => {
      if (this.video.requestFullscreen) {
        this.video.requestFullscreen();
      } else if (this.video.mozRequestFullScreen) {
        this.video.mozRequestFullScreen(); // Firefox
      } else if (this.video.msRequestFullscreen) {
        this.video.msRequestFullscreen();
      } else if (this.video.webkitRequestFullscreen) {
        this.video.webkitRequestFullscreen(); // Chrome and Safari
      }

      if (this.video.exitFullscreen) {
        this.video.exitFullscreen();
      } else if (this.video.msExitFullscreen) {
        this.video.msExitFullscreen();
      } else if (this.video.mozCancelFullScreen) {
        this.video.mozCancelFullScreen();
      } else if (this.video.webkitExitFullscreen) {
        this.video.webkitExitFullscreen();
      }
    });
  }

  playVideo = () => {
    this.video.play();
    this.playButton.innerHTML = 'Pause';
  }

  pauseVideo = () => {
    this.video.pause();
    this.playButton.innerHTML = 'Play';
  }

  muteVideo = () => {
    this.video.muted = true;
    this.muteButton.innerHTML = 'Unmute';
  }

  unmuteVideo = () => {
    this.video.muted = false;
    this.muteButton.innerHTML = 'Mute';
  }

  render() {
    return (
      <div>
        <div id="video-container" className="video-container">
          <video id="video" className="video" autoPlay />
          <div id="video-controls" className="video-controls">
            <Button type="button" id="play-pause" className="play-pause">Pause</Button>
            <Button type="button" id="mute" className="mute">Mute</Button>
            <input type="range" id="volume-bar" className="volume-bar" min="0" max="1" step="0.001" defaultValue="1" />
            <Button type="button" id="full-screen" className="full-screen">Full-Screen</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoPlayer;
