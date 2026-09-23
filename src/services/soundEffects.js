// Web Audio API Polyphonic Synthesizer & Melodic Song Player
// Specifically engineered for Remi to sing soothing melodies and lullabies for elderly elders

class SoundService {
  constructor() {
    this.ctx = null;
    this.activeNodes = [];
    this.melodyTimeouts = [];
    this.isPlayingSong = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a single harmonic note with acoustic envelope (like a warm marimba/piano/chime)
  playNote(freq, duration = 0.5, type = 'triangle', gainVal = 0.15, when = 0) {
    try {
      this.init();
      if (!this.ctx) return;

      const startTime = this.ctx.currentTime + when;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      // Acoustic gentle envelope: fast attack, warm gentle decay
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(gainVal, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);

      this.activeNodes.push({ osc, gain });
    } catch (e) {
      console.warn('Note play skipped:', e);
    }
  }

  // Harmonized chord (root + third + fifth)
  playHarmonicChord(rootFreq, duration = 0.8, gainVal = 0.08, when = 0) {
    this.playNote(rootFreq, duration, 'sine', gainVal, when);
    this.playNote(rootFreq * 1.25, duration, 'triangle', gainVal * 0.8, when); // Major third
    this.playNote(rootFreq * 1.5, duration, 'sine', gainVal * 0.7, when);      // Fifth
  }

  // Tap cue
  playTap() {
    this.playNote(440, 0.12, 'sine', 0.1);
  }

  // Success chord
  playSuccess() {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((f, idx) => {
      this.playNote(f, 0.4, 'triangle', 0.12, idx * 0.09);
    });
  }

  // Gentle retry tone
  playGentleTryAgain() {
    this.playNote(440, 0.25, 'sine', 0.1, 0);
    this.playNote(392, 0.35, 'sine', 0.08, 0.14);
  }

  // Reminder temple chime
  playReminderChime() {
    this.playNote(587.33, 1.5, 'sine', 0.18, 0);
    this.playNote(880, 1.2, 'triangle', 0.08, 0.1);
  }

  // Loud emergency SOS alert siren for patient in distress
  playSosAlert() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    for (let i = 0; i < 6; i++) {
      const freq = i % 2 === 0 ? 880 : 659.25;
      this.playNote(freq, 0.35, 'square', 0.28, i * 0.38);
    }
  }

  // Calm Mode gentle ambient nature sound loop (soft rainfall / forest breeze)
  startCalmNatureSound() {
    this.init();
    if (!this.ctx) return;
    this.stopCalmNatureSound();

    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;

      // Generate soothing pink-noise (gentle rainfall / breeze)
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 1.8;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      // Filter to deep warm rain frequencies (350Hz low-pass)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(380, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 2.0); // Gentle 2s fade in

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
      this.calmNoiseNode = noise;
      this.calmGainNode = gain;
    } catch (e) {
      console.warn('Calm nature audio note:', e);
    }
  }

  // Stop Calm Mode ambient sound with gentle fade out
  stopCalmNatureSound() {
    if (this.calmGainNode && this.ctx) {
      try {
        this.calmGainNode.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);
        setTimeout(() => {
          if (this.calmNoiseNode) {
            try { this.calmNoiseNode.stop(); } catch (e) {}
            this.calmNoiseNode = null;
          }
          this.calmGainNode = null;
        }, 1300);
      } catch (e) {
        this.calmNoiseNode = null;
        this.calmGainNode = null;
      }
    }
  }

  // Breathing exercise pacing chime (warm inhale vs grounding exhale)
  playBreathingChime(isInhale = true) {
    if (isInhale) {
      // Inhale rising tone
      this.playNote(392.00, 1.2, 'sine', 0.12, 0);
      this.playNote(523.25, 1.0, 'triangle', 0.08, 0.15);
    } else {
      // Exhale grounding gentle tone
      this.playNote(523.25, 1.4, 'sine', 0.10, 0);
      this.playNote(392.00, 1.6, 'sine', 0.08, 0.2);
    }
  }

  // Stop any ongoing melody and vocal synthesis
  stopSongMelody() {
    this.melodyTimeouts.forEach((t) => clearTimeout(t));
    this.melodyTimeouts = [];
    this.isPlayingSong = false;
  }

  /**
   * Play full musical song arrangements for Remi's singing
   * Generates melodic musical phrases with harmonic accompaniment
   */
  playSongArrangement(songKey = 'chanda', onProgress = null, onComplete = null) {
    this.init();
    if (!this.ctx) return;
    this.stopSongMelody();
    this.isPlayingSong = true;

    // Frequencies (Hz)
    const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, B4 = 493.88;
    const C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46, G5 = 783.99, A5 = 880.00;

    let melodyData = [];

    if (songKey === 'chanda') {
      // "चंदा है तू, मेरा सूरज है तू" — Indian Classic Lullaby Melody
      melodyData = [
        // Line 1: चंदा है तू...
        { line: 0, f: G4, chord: C4, d: 0.6, t: 0 },
        { line: 0, f: G4, d: 0.4, t: 600 },
        { line: 0, f: E4, d: 0.5, t: 1100 },
        { line: 0, f: G4, d: 0.8, t: 1700 },
        { line: 0, f: C5, chord: G4, d: 1.2, t: 2600 },
        // Line 2: मेरा सूरज है तू...
        { line: 1, f: B4, d: 0.5, t: 4200 },
        { line: 1, f: A4, d: 0.5, t: 4800 },
        { line: 1, f: G4, chord: C4, d: 0.8, t: 5400 },
        { line: 1, f: E4, d: 0.6, t: 6300 },
        { line: 1, f: D4, chord: G4, d: 1.2, t: 7000 },
        // Line 3: ओ मेरी आँखों का तारा है तू...
        { line: 2, f: E4, d: 0.5, t: 8600 },
        { line: 2, f: G4, d: 0.5, t: 9200 },
        { line: 2, f: A4, chord: F4, d: 0.6, t: 9800 },
        { line: 2, f: G4, d: 0.6, t: 10500 },
        { line: 2, f: C5, chord: C4, d: 1.4, t: 11200 },
        // Line 4: सो जा मेरे प्यारे, सो जा...
        { line: 3, f: G4, d: 0.6, t: 13000 },
        { line: 3, f: E4, d: 0.6, t: 13700 },
        { line: 3, f: D4, chord: G4, d: 0.8, t: 14400 },
        { line: 3, f: C4, chord: C4, d: 1.6, t: 15300 }
      ];
    } else if (songKey === 'lakdi') {
      // "लकड़ी की काठी, काठी पे घोड़ा" — Rhythmic Upbeat Folk Tune
      melodyData = [
        // Line 1: लकड़ी की काठी...
        { line: 0, f: C4, chord: C4, d: 0.4, t: 0 },
        { line: 0, f: E4, d: 0.4, t: 400 },
        { line: 0, f: G4, d: 0.4, t: 800 },
        { line: 0, f: G4, chord: G4, d: 0.6, t: 1200 },
        // Line 2: काठी पे घोड़ा...
        { line: 1, f: A4, d: 0.4, t: 1800 },
        { line: 1, f: G4, d: 0.4, t: 2200 },
        { line: 1, f: E4, chord: C4, d: 0.4, t: 2600 },
        { line: 1, f: C4, d: 0.6, t: 3000 },
        // Line 3: घोड़े की दुम पे जो मारा हथौड़ा...
        { line: 2, f: D4, d: 0.35, t: 3700 },
        { line: 2, f: D4, d: 0.35, t: 4100 },
        { line: 2, f: E4, chord: G4, d: 0.35, t: 4500 },
        { line: 2, f: F4, d: 0.35, t: 4900 },
        { line: 2, f: G4, chord: C4, d: 0.8, t: 5300 },
        // Line 4: दौड़ा दौड़ा दौड़ा घोड़ा दुम उठा के दौड़ा!
        { line: 3, f: C5, chord: C4, d: 0.4, t: 6300 },
        { line: 3, f: G4, d: 0.4, t: 6700 },
        { line: 3, f: A4, d: 0.4, t: 7100 },
        { line: 3, f: G4, d: 0.4, t: 7500 },
        { line: 3, f: E4, chord: G4, d: 0.5, t: 7900 },
        { line: 3, f: C4, chord: C4, d: 1.2, t: 8500 }
      ];
    } else if (songKey === 'sunshine') {
      // "You Are My Sunshine"
      melodyData = [
        { line: 0, f: C4, chord: C4, d: 0.4, t: 0 },
        { line: 0, f: D4, d: 0.4, t: 450 },
        { line: 0, f: E4, d: 0.4, t: 900 },
        { line: 0, f: G4, chord: C4, d: 0.8, t: 1350 },
        { line: 0, f: G4, d: 0.8, t: 2300 },
        { line: 1, f: E4, d: 0.4, t: 3300 },
        { line: 1, f: E4, d: 0.4, t: 3750 },
        { line: 1, f: F4, d: 0.4, t: 4200 },
        { line: 1, f: G4, chord: C4, d: 1.0, t: 4650 },
        { line: 2, f: A4, chord: F4, d: 0.5, t: 6000 },
        { line: 2, f: C5, d: 0.5, t: 6600 },
        { line: 2, f: B4, d: 0.5, t: 7200 },
        { line: 2, f: A4, d: 0.5, t: 7800 },
        { line: 2, f: G4, chord: C4, d: 1.1, t: 8400 },
        { line: 3, f: E4, d: 0.4, t: 9800 },
        { line: 3, f: F4, d: 0.4, t: 10300 },
        { line: 3, f: D4, chord: G4, d: 0.6, t: 10800 },
        { line: 3, f: C4, chord: C4, d: 1.5, t: 11500 }
      ];
    } else {
      // Soothing Folk Lullaby
      melodyData = [
        { line: 0, f: G4, chord: C4, d: 0.6, t: 0 },
        { line: 0, f: E4, d: 0.6, t: 700 },
        { line: 0, f: C5, chord: C4, d: 1.0, t: 1400 },
        { line: 1, f: A4, chord: F4, d: 0.6, t: 2600 },
        { line: 1, f: G4, d: 0.6, t: 3300 },
        { line: 1, f: E4, chord: C4, d: 1.0, t: 4000 },
        { line: 2, f: D4, chord: G4, d: 0.6, t: 5200 },
        { line: 2, f: E4, d: 0.6, t: 5900 },
        { line: 2, f: G4, chord: C4, d: 1.0, t: 6600 },
        { line: 3, f: E4, chord: G4, d: 0.6, t: 7800 },
        { line: 3, f: D4, d: 0.6, t: 8500 },
        { line: 3, f: C4, chord: C4, d: 1.6, t: 9200 }
      ];
    }

    let lastLineNotified = -1;
    const totalDuration = melodyData[melodyData.length - 1].t + 2000;

    melodyData.forEach((item) => {
      const timeout = setTimeout(() => {
        if (!this.isPlayingSong) return;

        // Play melody note
        this.playNote(item.f, item.d, 'triangle', 0.16);

        // If a harmonic chord is specified, play it softly in the background
        if (item.chord) {
          this.playHarmonicChord(item.chord, item.d * 1.5, 0.05);
        }

        // Notify UI about line progression for lyric highlight
        if (onProgress && item.line !== lastLineNotified) {
          lastLineNotified = item.line;
          onProgress(item.line);
        }
      }, item.t);

      this.melodyTimeouts.push(timeout);
    });

    const completionTimeout = setTimeout(() => {
      this.isPlayingSong = false;
      if (onComplete) onComplete();
    }, totalDuration);

    this.melodyTimeouts.push(completionTimeout);
  }
}

export const sounds = new SoundService();
