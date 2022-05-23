class Drumkit {
  constructor() {
    this.currentKick = './audio/kick-classic.wav';
    this.currentSnare = './audio/snare-acoustic01.wav';
    this.currentHihat = './audio/hihat-acoustic01.wav';
    this.pads = document.querySelectorAll('.pad');
    this.playBtn = document.querySelector('.play');
    this.kickAudio = document.querySelector('.kick-sound');
    this.snareAudio = document.querySelector('.snare-sound');
    this.hihatAudio = document.querySelector('.hihat-sound');
    this.selects = document.querySelectorAll('select');
    this.muteBtns = document.querySelectorAll('.mute');
    this.tempoSlider = document.querySelector('.tempo-slider');
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
  }

  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case 'kick-select':
        this.kickAudio.src = selectionValue;
        break;

      case 'snare-select':
        this.snareAudio.src = selectionValue;
        break;

      case 'hihat-select':
        this.hihatAudio.src = selectionValue;
        break;
    }
  }

  mute(e) {
    const muteIndex = e.target.getAttribute('data-track');
    e.target.classList.toggle('active');
    if (e.target.classList.contains('active')) {
      switch (muteIndex) {
        case '0':
          this.kickAudio.volume = 0;
          break;

        case '1':
          this.snareAudio.volume = 0;
          break;

        case '2':
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case '0':
          this.kickAudio.volume = 1;
          break;

        case '1':
          this.snareAudio.volume = 1;
          break;

        case '2':
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }

  activePad() {
    this.classList.toggle('active');
  }

  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    // loop over the pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      // check if pads are active
      if (bar.classList.contains('active')) {
        // check each sound
        if (bar.classList.contains('kick-pad')) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains('snare-pad')) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains('hihat-pad')) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    // Check if it's playing
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }

  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.innerText = 'Stop';
      this.playBtn.classList.add('active');
    } else {
      this.playBtn.innerText = 'Play';
      this.playBtn.classList.remove('active');
    }
  }

  changeTempo(e) {
    document.querySelector('.tempo-nr').innerText = e.target.value;
    this.bpm = e.target.value;
  }

  updateTempo() {
    const playBtn = document.querySelector('.play');
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    if (playBtn.classList.contains('active')) {
      this.start();
    }
  }
}

const drumkit = new Drumkit();

//Events listeners
drumkit.pads.forEach((pad) => {
  pad.addEventListener('click', drumkit.activePad);
  pad.addEventListener('animationend', function () {
    this.style.animation = '';
  });
});

drumkit.playBtn.addEventListener('click', function () {
  drumkit.updateBtn();
  drumkit.start();
});

drumkit.selects.forEach((select) => {
  select.addEventListener('change', function (e) {
    drumkit.changeSound(e);
  });
});

drumkit.muteBtns.forEach((btn) => {
  btn.addEventListener('click', function (e) {
    drumkit.mute(e);
  });
});

drumkit.tempoSlider.addEventListener('input', function (e) {
  drumkit.changeTempo(e);
});

drumkit.tempoSlider.addEventListener('change', function () {
  drumkit.updateTempo();
});
