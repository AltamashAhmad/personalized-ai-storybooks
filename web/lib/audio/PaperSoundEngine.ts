/**
 * Pure Web Audio Paper Synthesizer Engine (Feature 19)
 * 
 * Hardware-accelerated DSP synthesis for realistic physical paper turns
 * with ZERO external audio asset dependencies (no mp3/wav files).
 * 
 * Multi-layer soundscape architecture:
 * - Layer 1 (Friction): Micro-texture paper surface scraping noise burst through 3600 Hz bandpass filter (Q=2.4).
 * - Layer 2 (Woosh): Air displacement turbulence through 1400 Hz -> 320 Hz lowpass filter sweep (Q=1.8).
 * - Layer 3 (Landing Impact): High-frequency snap transient + 90 Hz resonant body thud.
 * - Spatialization: StereoPannerNode dynamically positioned (-0.35 to +0.35) according to flip direction and locale.
 * - Lifecycle: Safe lazy instantiation, user-gesture resumption, iOS Safari unlock handling, error-tolerant fallback.
 */

export type FlipDirection = "next" | "prev" | "forward" | "backward" | "left" | "right";

export interface PlayTurnOptions {
  /** Direction of page flip */
  direction?: FlipDirection;
  /** Explicit stereo pan override (-1.0 left to +1.0 right). If omitted, inferred from direction & isRtl */
  pan?: number;
  /** Whether the flipbook is currently rendering in Arabic RTL mode */
  isRtl?: boolean;
  /** Volume multiplier for this single flip (0.0 to 1.0, default 1.0) */
  volume?: number;
  /** Speed / duration scale factor (0.5 to 2.0, default 1.0) */
  speed?: number;
}

export class PaperSoundEngine {
  private static instance: PaperSoundEngine | null = null;

  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private isMuted: boolean = false;
  private masterVolume: number = 0.85;
  private isUnlocked: boolean = false;
  private unlockListenersAttached: boolean = false;

  private constructor() {
    // Lazy setup: AudioContext is only created on client side after user gesture
    if (typeof window !== "undefined") {
      this.attachUnlockListeners();
    }
  }

  /**
   * Retrieves the global singleton PaperSoundEngine instance.
   */
  public static getInstance(): PaperSoundEngine {
    if (!PaperSoundEngine.instance) {
      PaperSoundEngine.instance = new PaperSoundEngine();
    }
    return PaperSoundEngine.instance;
  }

  /**
   * Attaches one-time window interaction listeners to safely unlock the AudioContext
   * on modern mobile browsers (specifically iOS Safari and Chrome mobile).
   */
  private attachUnlockListeners(): void {
    if (typeof window === "undefined" || this.unlockListenersAttached) return;
    this.unlockListenersAttached = true;

    const unlockHandler = () => {
      this.unlockSafari().catch(() => {});
      // Once triggered by any valid user gesture, remove all unlock listeners
      window.removeEventListener("pointerdown", unlockHandler);
      window.removeEventListener("touchstart", unlockHandler);
      window.removeEventListener("keydown", unlockHandler);
      window.removeEventListener("click", unlockHandler);
    };

    window.addEventListener("pointerdown", unlockHandler, { once: true, passive: true });
    window.addEventListener("touchstart", unlockHandler, { once: true, passive: true });
    window.addEventListener("keydown", unlockHandler, { once: true, passive: true });
    window.addEventListener("click", unlockHandler, { once: true, passive: true });
  }

  /**
   * Ensures the AudioContext and Master Gain node are initialized, running, and ready.
   * Safe for SSR (returns null on server).
   */
  public async ensureContext(): Promise<AudioContext | null> {
    if (typeof window === "undefined") return null;

    try {
      if (!this.ctx || this.ctx.state === "closed") {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

        if (!AudioContextClass) {
          return null;
        }

        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.masterVolume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        // Pre-allocate a 1.0s high-entropy white noise buffer for efficient reuse
        this.buildNoiseBuffer(this.ctx);
      }

      if (this.ctx.state === "suspended") {
        await this.ctx.resume();
      }

      return this.ctx;
    } catch {
      // AudioContext policy blocked or audio output device unavailable
      return null;
    }
  }

  /**
   * Unlocks iOS Safari and mobile WebKit audio subsystems by playing
   * a single-frame silent buffer during a trusted user gesture.
   */
  public async unlockSafari(): Promise<boolean> {
    if (this.isUnlocked || typeof window === "undefined") return true;

    try {
      const ctx = await this.ensureContext();
      if (!ctx) return false;

      // Play 1-frame silent buffer
      const silentBuffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = silentBuffer;
      source.connect(ctx.destination);
      source.start(0);

      this.isUnlocked = true;
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Generates a 1-second high-entropy white noise buffer used across friction,
   * woosh, and snap synthesis layers to eliminate repetitive allocation overhead.
   */
  private buildNoiseBuffer(ctx: AudioContext): void {
    try {
      const bufferLength = Math.floor(ctx.sampleRate * 1.0);
      const buffer = ctx.createBuffer(1, bufferLength, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferLength; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      this.noiseBuffer = buffer;
    } catch {
      this.noiseBuffer = null;
    }
  }

  /**
   * Synthesizes and plays a complete 3-layer paper page-turn soundscape:
   * 1. Friction white noise burst (Bandpass 3600 Hz, Q=2.4)
   * 2. Air displacement woosh (Lowpass sweep 1400 Hz -> 320 Hz, Q=1.8)
   * 3. Page landing snap transient + 90 Hz resonant body thud
   * With stereo spatialization (-0.35 to +0.35) and organic pitch/timing micro-variations.
   */
  public playTurn(options?: PlayTurnOptions): void {
    if (this.isMuted) return;

    // Fire-and-forget async initialization
    this.ensureContext().then((ctx) => {
      if (!ctx || ctx.state !== "running" || !this.masterGain) return;

      try {
        const t0 = ctx.currentTime;
        const volume = Math.max(0, Math.min(1, options?.volume ?? 1.0));
        const speed = Math.max(0.5, Math.min(2.0, options?.speed ?? 1.0));
        const durationScale = 1.0 / speed;

        // Determine Stereo Panning
        // LTR: Next page moves Right -> Left (Pan +0.35). Prev page moves Left -> Right (Pan -0.35).
        // RTL: Next page moves Left -> Right (Pan -0.35). Prev page moves Right -> Left (Pan +0.35).
        let panValue = 0;
        if (typeof options?.pan === "number") {
          panValue = Math.max(-1, Math.min(1, options.pan));
        } else {
          const dir = options?.direction || "next";
          const isRtl = options?.isRtl || false;
          const isNext = dir === "next" || dir === "forward" || dir === "right";

          if (isRtl) {
            panValue = isNext ? -0.35 : 0.35;
          } else {
            panValue = isNext ? 0.35 : -0.35;
          }
        }

        // Create Channel Spatializer
        let turnBus: AudioNode = this.masterGain;
        if (typeof ctx.createStereoPanner === "function") {
          const panner = ctx.createStereoPanner();
          panner.pan.setValueAtTime(panValue, t0);
          panner.connect(this.masterGain);
          turnBus = panner;
        }

        // Subtle organic micro-variations to avoid repetitive synthetic sound
        const jitterBP = (Math.random() - 0.5) * 160; // +/- 80 Hz
        const jitterLP = (Math.random() - 0.5) * 100; // +/- 50 Hz
        const jitterThud = (Math.random() - 0.5) * 6;  // +/- 3 Hz

        // Ensure white noise source is ready
        if (!this.noiseBuffer) {
          this.buildNoiseBuffer(ctx);
        }
        if (!this.noiseBuffer) return;

        // =========================================================================
        // LAYER 1: Friction white noise burst shaped through bandpass filter
        // Specs: Center = 3600 Hz, Q = 2.4, sharp attack, fast exponential decay
        // =========================================================================
        const frictionDuration = 0.13 * durationScale;
        const frictionSource = ctx.createBufferSource();
        frictionSource.buffer = this.noiseBuffer;
        frictionSource.loop = true;

        const frictionFilter = ctx.createBiquadFilter();
        frictionFilter.type = "bandpass";
        frictionFilter.frequency.setValueAtTime(3600 + jitterBP, t0);
        frictionFilter.Q.setValueAtTime(2.4, t0);

        const frictionGain = ctx.createGain();
        frictionGain.gain.setValueAtTime(0.0001, t0);
        frictionGain.gain.linearRampToValueAtTime(0.18 * volume, t0 + 0.015 * durationScale);
        frictionGain.gain.exponentialRampToValueAtTime(0.0001, t0 + frictionDuration);

        frictionSource.connect(frictionFilter);
        frictionFilter.connect(frictionGain);
        frictionGain.connect(turnBus);

        const randomOffset1 = Math.random() * 0.7;
        frictionSource.start(t0, randomOffset1);
        frictionSource.stop(t0 + frictionDuration);

        // =========================================================================
        // LAYER 2: Air displacement woosh shaped through lowpass filter sweep
        // Specs: Frequency sweep from 1400 Hz -> 320 Hz, Q = 1.8, aerodynamic body
        // =========================================================================
        const wooshDuration = 0.22 * durationScale;
        const wooshSource = ctx.createBufferSource();
        wooshSource.buffer = this.noiseBuffer;
        wooshSource.loop = true;

        const wooshFilter = ctx.createBiquadFilter();
        wooshFilter.type = "lowpass";
        wooshFilter.frequency.setValueAtTime(1400 + jitterLP, t0);
        wooshFilter.frequency.exponentialRampToValueAtTime(320, t0 + wooshDuration);
        wooshFilter.Q.setValueAtTime(1.8, t0);

        const wooshGain = ctx.createGain();
        wooshGain.gain.setValueAtTime(0.0001, t0);
        wooshGain.gain.exponentialRampToValueAtTime(0.24 * volume, t0 + 0.035 * durationScale);
        wooshGain.gain.exponentialRampToValueAtTime(0.0001, t0 + wooshDuration);

        wooshSource.connect(wooshFilter);
        wooshFilter.connect(wooshGain);
        wooshGain.connect(turnBus);

        const randomOffset2 = Math.random() * 0.7;
        wooshSource.start(t0, randomOffset2);
        wooshSource.stop(t0 + wooshDuration);

        // =========================================================================
        // LAYER 3: Page landing snap transient + 90 Hz resonant body thud
        // Specs: Offset at arc completion (t0 + 0.09s), sharp click + 90 Hz sine drop
        // =========================================================================
        const tLanding = t0 + 0.085 * durationScale;

        // 3A: Snap Transient (Crisp slap impact)
        const snapDuration = 0.025 * durationScale;
        const snapSource = ctx.createBufferSource();
        snapSource.buffer = this.noiseBuffer;

        const snapFilter = ctx.createBiquadFilter();
        snapFilter.type = "bandpass";
        snapFilter.frequency.setValueAtTime(5200, tLanding);
        snapFilter.Q.setValueAtTime(2.8, tLanding);

        const snapGain = ctx.createGain();
        snapGain.gain.setValueAtTime(0.0001, tLanding);
        snapGain.gain.linearRampToValueAtTime(0.14 * volume, tLanding + 0.003);
        snapGain.gain.exponentialRampToValueAtTime(0.0001, tLanding + snapDuration);

        snapSource.connect(snapFilter);
        snapFilter.connect(snapGain);
        snapGain.connect(turnBus);

        snapSource.start(tLanding, Math.random() * 0.7);
        snapSource.stop(tLanding + snapDuration);

        // 3B: Low-end Body Thud (~90 Hz mechanical inertia)
        const thudDuration = 0.09 * durationScale;
        const thudOsc = ctx.createOscillator();
        thudOsc.type = "sine";
        thudOsc.frequency.setValueAtTime(105 + jitterThud, tLanding);
        thudOsc.frequency.exponentialRampToValueAtTime(75, tLanding + 0.07 * durationScale);

        const thudFilter = ctx.createBiquadFilter();
        thudFilter.type = "lowpass";
        thudFilter.frequency.setValueAtTime(180, tLanding);

        const thudGain = ctx.createGain();
        thudGain.gain.setValueAtTime(0.0001, tLanding);
        thudGain.gain.linearRampToValueAtTime(0.20 * volume, tLanding + 0.005);
        thudGain.gain.exponentialRampToValueAtTime(0.0001, tLanding + thudDuration);

        thudOsc.connect(thudFilter);
        thudFilter.connect(thudGain);
        thudGain.connect(turnBus);

        thudOsc.start(tLanding);
        thudOsc.stop(tLanding + thudDuration);
      } catch {
        // Audio synthesis gracefully tolerates device disruptions or tab suspensions
      }
    }).catch(() => {});
  }

  /**
   * Sets mute state. Updates master gain immediately with smooth ramp to avoid pops.
   */
  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (this.ctx && this.masterGain && this.ctx.state === "running") {
      const t = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(t);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, t);
      this.masterGain.gain.linearRampToValueAtTime(muted ? 0 : this.masterVolume, t + 0.02);
    }
  }

  /**
   * Toggles sound mute state and returns the new muted state.
   */
  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  /**
   * Returns whether audio is currently muted.
   */
  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Sets the global master volume (0.0 to 1.0).
   */
  public setVolume(vol: number): void {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (!this.isMuted && this.ctx && this.masterGain && this.ctx.state === "running") {
      const t = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(t);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, t);
      this.masterGain.gain.linearRampToValueAtTime(this.masterVolume, t + 0.02);
    }
  }

  /**
   * Gets current master volume.
   */
  public getVolume(): number {
    return this.masterVolume;
  }

  /**
   * Closes the AudioContext and resets internal references.
   */
  public dispose(): void {
    if (this.ctx && this.ctx.state !== "closed") {
      this.ctx.close().catch(() => {});
    }
    this.ctx = null;
    this.masterGain = null;
    this.noiseBuffer = null;
    this.isUnlocked = false;
    this.unlockListenersAttached = false;
  }
}

// Export singleton instance for direct import
export const paperSoundEngine = PaperSoundEngine.getInstance();
