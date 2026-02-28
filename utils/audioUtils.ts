class AudioController {
  private context: AudioContext | null = null;
  private isMuted: boolean = true; // Default to muted until interaction
  private buffers: Map<string, AudioBuffer> = new Map();
  private initialized: boolean = false;

  // Dummy paths for sounds
  private soundPaths = {
    primary: '/sounds/chime.mp3',
    nav: '/sounds/click.mp3',
    success: '/sounds/success.mp3',
    error: '/sounds/error.mp3',
    hover: '/sounds/pop.mp3',
  };

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('keywordpro_muted');
      this.isMuted = stored ? stored === 'true' : false;
    }
  }

  // Initialize on first interaction
  public init = async () => {
    if (this.initialized) return;
    
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.context = new AudioContextClass();
      
      if (this.context.state === 'suspended') {
        await this.context.resume();
      }

      this.initialized = true;
      await this.preloadSounds();
    } catch (e) {
      console.error('Web Audio API initialization failed', e);
    }
  };

  private async preloadSounds() {
    if (!this.context) return;

    const loadSound = async (key: string, path: string) => {
      try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.context!.decodeAudioData(arrayBuffer);
        this.buffers.set(key, audioBuffer);
      } catch (e) {
        // We expect this to fail since paths are dummy, fallback will be used
        // console.warn(`Could not load audio file ${path}, will use fallback synth.`, e);
      }
    };

    const promises = Object.entries(this.soundPaths).map(([key, path]) => loadSound(key, path));
    await Promise.all(promises);
  }

  public toggleMute = () => {
    this.isMuted = !this.isMuted;
    localStorage.setItem('keywordpro_muted', this.isMuted.toString());
    
    if (!this.isMuted && !this.initialized) {
      this.init();
    }
    return this.isMuted;
  };

  public getMuteState = () => this.isMuted;

  private playSound = (type: keyof typeof this.soundPaths) => {
    if (this.isMuted || !this.context) return;
    
    if (this.context.state === 'suspended') {
      this.context.resume();
    }

    const buffer = this.buffers.get(type);
    
    if (buffer) {
      // Play loaded audio file
      const source = this.context.createBufferSource();
      source.buffer = buffer;
      source.connect(this.context.destination);
      source.start(0);
    } else {
      // Fallback to synthesized sound if file not found
      this.playSynthesizedFallback(type);
    }
  };

  private playSynthesizedFallback(type: keyof typeof this.soundPaths) {
    if (!this.context) return;
    const osc = this.context.createOscillator();
    const gainNode = this.context.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(this.context.destination);

    const now = this.context.currentTime;

    switch (type) {
      case 'primary': // Soft chime (300ms)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.3);
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        break;
        
      case 'nav': // Subtle click (150ms)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.1, now + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
        break;

      case 'success': // Ascending two-note
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.15);
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.2, now + 0.05);
        gainNode.gain.setValueAtTime(0.2, now + 0.15);
        gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        break;

      case 'error': // Soft warning beep
        osc.type = 'square';
        osc.frequency.setValueAtTime(300, now);
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.1, now + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        break;

      case 'hover': // Light pop
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.05, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
        break;
    }
  }

  public playPrimary = () => this.playSound('primary');
  public playNav = () => this.playSound('nav');
  public playSuccess = () => this.playSound('success');
  public playError = () => this.playSound('error');
  public playHover = () => this.playSound('hover');
}

export const audio = new AudioController();
