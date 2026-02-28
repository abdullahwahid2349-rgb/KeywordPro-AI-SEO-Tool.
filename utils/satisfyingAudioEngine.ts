class SatisfyingAudioEngine {
  private context: AudioContext | null = null;
  private initialized: boolean = false;

  public init = async () => {
    if (this.initialized) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.context = new AudioContextClass();
      if (this.context.state === 'suspended') {
        await this.context.resume();
      }
      this.initialized = true;
    } catch (e) {
      console.error('SatisfyingAudioEngine init failed', e);
    }
  };

  private isMuted = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('keywordpro_muted') === 'true';
    }
    return false;
  };

  // Helper to create a short burst of noise
  private createNoiseBuffer = (duration: number) => {
    if (!this.context) return null;
    const bufferSize = this.context.sampleRate * duration;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  };

  public playKeyPress = () => {
    if (this.isMuted() || !this.context) return;
    const now = this.context.currentTime;

    // Premium MacBook-style mechanical-chic click (70-90ms)
    // Uses a high-pass filtered noise burst combined with a tiny sine "thump"
    
    // 1. The "Click" (High-frequency noise)
    const noiseBuffer = this.createNoiseBuffer(0.05);
    if (noiseBuffer) {
      const noiseSource = this.context.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      
      const noiseFilter = this.context.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.value = 6000; // Crisp high end
      
      const noiseGain = this.context.createGain();
      noiseGain.gain.setValueAtTime(0.15, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      
      noiseSource.connect(noiseFilter).connect(noiseGain).connect(this.context.destination);
      noiseSource.start(now);
    }

    // 2. The "Thump" (Low-frequency body)
    const osc = this.context.createOscillator();
    const oscGain = this.context.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.05);
    
    oscGain.gain.setValueAtTime(0.1, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    
    osc.connect(oscGain).connect(this.context.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  };

  public playAiType = () => {
    if (this.isMuted() || !this.context) return;
    const now = this.context.currentTime;

    // Softer, fast-paced typing (60-80ms) for AI thinking
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    
    // Randomize frequency slightly for organic feel
    const baseFreq = 800 + Math.random() * 400;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, now + 0.04);
    
    gain.gain.setValueAtTime(0.03, now); // Very soft
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    
    osc.connect(gain).connect(this.context.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  };

  public playBackspace = () => {
    if (this.isMuted() || !this.context) return;
    const now = this.context.currentTime;

    // Soft whoosh / light eraser
    const noiseBuffer = this.createNoiseBuffer(0.15);
    if (noiseBuffer) {
      const noiseSource = this.context.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      
      const filter = this.context.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, now);
      filter.frequency.exponentialRampToValueAtTime(400, now + 0.1);
      
      const gain = this.context.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.1, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      
      noiseSource.connect(filter).connect(gain).connect(this.context.destination);
      noiseSource.start(now);
    }
  };

  public playEnter = () => {
    if (this.isMuted() || !this.context) return;
    const now = this.context.currentTime;

    // Pronounced premium button press (150-200ms) - "Thock" sound
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
    
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    osc.connect(gain).connect(this.context.destination);
    osc.start(now);
    osc.stop(now + 0.15);

    // Add a slight high-end click to the enter key
    const noiseBuffer = this.createNoiseBuffer(0.05);
    if (noiseBuffer) {
      const noiseSource = this.context.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      const noiseFilter = this.context.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 3000;
      const noiseGain = this.context.createGain();
      noiseGain.gain.setValueAtTime(0.1, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      noiseSource.connect(noiseFilter).connect(noiseGain).connect(this.context.destination);
      noiseSource.start(now);
    }
  };

  public playSuccessChime = () => {
    if (this.isMuted() || !this.context) return;
    const now = this.context.currentTime;

    // Ascending success chime (Rewarding feel)
    const playNote = (freq: number, startTime: number, duration: number) => {
      if (!this.context) return;
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      osc.connect(gain).connect(this.context.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    // F Major arpeggio (F4, A4, C5, F5)
    playNote(349.23, now, 0.4);
    playNote(440.00, now + 0.1, 0.4);
    playNote(523.25, now + 0.2, 0.4);
    playNote(698.46, now + 0.3, 0.6);
  };

  public playFocusPop = () => {
    if (this.isMuted() || !this.context) return;
    const now = this.context.currentTime;

    // Barely-there pop sound
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1000, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.03);
    
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    
    osc.connect(gain).connect(this.context.destination);
    osc.start(now);
    osc.stop(now + 0.03);
  };
}

export const satisfyingAudio = new SatisfyingAudioEngine();
