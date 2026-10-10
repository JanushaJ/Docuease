/**
 * Web Audio API synthesizer for Bio-Acoustic Intelligence demo.
 * Simulates bee colony acoustic frequencies:
 * - 220Hz - 250Hz: Normal healthy hive hum (stable queen presence)
 * - 420Hz - 480Hz: Swarming frenzy / queen piping / high colony stress
 */

class HiveAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private osc: OscillatorNode | null = null;
  private modOsc: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  public playHiveBuzz(freqHz: number = 220, isStressed: boolean = false) {
    try {
      this.initContext();
      if (!this.ctx) return;

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      if (this.isPlaying) {
        this.stop();
      }

      const now = this.ctx.currentTime;

      // Primary carrier oscillator (Sawtooth gives the rich insectoid buzz harmonic)
      this.osc = this.ctx.createOscillator();
      this.osc.type = 'sawtooth';
      this.osc.frequency.setValueAtTime(freqHz, now);

      // Low frequency modulation for wing fluttering vibration
      this.modOsc = this.ctx.createOscillator();
      this.modOsc.type = 'sine';
      this.modOsc.frequency.setValueAtTime(isStressed ? 28 : 14, now); // flutter speed

      const modGain = this.ctx.createGain();
      modGain.gain.setValueAtTime(isStressed ? 45 : 18, now);

      this.modOsc.connect(modGain);
      modGain.connect(this.osc.frequency);

      // Master output gain
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.01, now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.08, now + 0.3);

      this.osc.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.osc.start(now);
      this.modOsc.start(now);
      this.isPlaying = true;
    } catch (e) {
      console.warn('AudioContext not allowed or unsupported in current environment', e);
    }
  }

  public stop() {
    try {
      if (this.gainNode && this.ctx) {
        const now = this.ctx.currentTime;
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
        setTimeout(() => {
          this.osc?.stop();
          this.modOsc?.stop();
          this.osc?.disconnect();
          this.modOsc?.disconnect();
          this.isPlaying = false;
        }, 250);
      }
    } catch (e) {
      this.isPlaying = false;
    }
  }

  public getStatus() {
    return this.isPlaying;
  }
}

export const hiveAudio = new HiveAudioSynthesizer();
