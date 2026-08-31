// Web Audio API Procedural Sound Synthesizer for Interactive Game Engines

class SoundFXManager {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Generic beep / tone
  public playTone(freq: number, type: OscillatorType = 'sine', duration: number = 0.1, gainVal: number = 0.15) {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio context error handle safely
    }
  }

  // Dice roll rattle sound
  public playDiceRoll() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        this.playTone(320 + Math.random() * 240, 'triangle', 0.05, 0.12);
      }, i * 65);
    }
  }

  // Dice final stop sound
  public playDiceLand() {
    this.playTone(520, 'sine', 0.12, 0.2);
    setTimeout(() => this.playTone(680, 'sine', 0.15, 0.2), 60);
  }

  // Card deal / flip swish sound
  public playCardDeal() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const node = this.ctx.createBufferSource();
      const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.08, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < buffer.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (buffer.length * 0.3));
      }
      node.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      node.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      node.start();
    } catch {
      this.playTone(800, 'triangle', 0.04, 0.1);
    }
  }

  // Card chip click / bet placement
  public playChip() {
    this.playTone(1200, 'sine', 0.04, 0.18);
    setTimeout(() => this.playTone(1600, 'sine', 0.04, 0.15), 30);
  }

  // Win fanfare / celebration
  public playWin() {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.25, 0.2);
      }, idx * 90);
    });
  }

  // Loss / bust sound
  public playLoss() {
    const notes = [400, 340, 280, 220];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sawtooth', 0.15, 0.12);
      }, idx * 80);
    });
  }

  // Crash rocket engine ascending hum
  public playRocketHum(multiplier: number) {
    if (!this.enabled) return;
    const freq = Math.min(180 + multiplier * 120, 1600);
    this.playTone(freq, 'sine', 0.06, 0.08);
  }

  // Crash explosion sound
  public playCrashExplosion() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const node = this.ctx.createBufferSource();
      const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.4, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < buffer.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (buffer.length * 0.25));
      }
      node.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, this.ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(50, this.ctx.currentTime + 0.4);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

      node.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      node.start();
    } catch {
      this.playTone(150, 'sawtooth', 0.3, 0.25);
    }
  }

  // Roulette tick / ball bounce
  public playRouletteTick(pitch: number = 900) {
    this.playTone(pitch, 'sine', 0.03, 0.1);
  }
}

export const soundFX = new SoundFXManager();
