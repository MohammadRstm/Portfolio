class AudioPool {
  constructor(src, poolSize = 3, loop = false, loopStart = 0, loopEnd = null) {
    this.pool = [];
    this.loop = loop;
    this.loopStart = loopStart;
    this.loopEnd = loopEnd;
    for (let i = 0; i < poolSize; i++) {
      const audio = new Audio(src);
      audio.load();
      audio.loop = false; // Disable default looping
      if (loop) {
        const checkLoop = () => {
          if (this.loopEnd && audio.currentTime >= this.loopEnd) {
            audio.currentTime = this.loopStart;
            audio.play(); // needed to resume immediately in some browsers
          }
          requestAnimationFrame(checkLoop);
        };
        requestAnimationFrame(checkLoop);
      }
      this.pool.push(audio);
    }
  }

  play() {
    const audio = this.pool.find(a => a.paused) || this.pool[0];
    audio.currentTime = this.loopStart;
    audio.play().catch(e => console.log("Audio play failed:", e));
    return audio;
  }

  pause() {
    for (const audio of this.pool) {
      if (!audio.paused) {
        audio.pause();
      }
    }
  }

}



// Initialize your audio pools with only ghostsSound set to loop
const startUpSound = new AudioPool('sounds/start_up_music.mp3'); // Default loop=false
const eatingEnergizerSound = new AudioPool('sounds/eating_energizer.mp3');
const eatingGhostSound = new AudioPool('sounds/eating_ghost.mp3');
const ghostsHardModeSound = new AudioPool(
  'sounds/ghostsAngry.mp3',
  1,
  true,
  0,
  4
);
const clickSound = new AudioPool('sounds/credit.mp3');
const ghostsSound = new AudioPool(
  'sounds/normal_ghost.mp3',
  1,      // Pool size
  true,   // Enable looping
  0,      // Loop start (0 seconds)
  4       // Loop end (5 seconds)
);

const hardModeSound = new AudioPool('sounds/harderModer.mp3');