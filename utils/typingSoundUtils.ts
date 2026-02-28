class TypingSoundController {
  private context: AudioContext | null = null;
  private initialized: boolean = false;
  private buffers: Map<string, AudioBuffer> = new Map();

  private soundPaths = {
    keyPress: '/sounds/key-press.mp3',
    backspace: '/sounds/backspace.mp3',
    focusPop: '/sounds/focus-pop.mp3',
    aiType: '/sounds/ai-type.mp3',
    completeChime: '/sounds/complete-chime.mp3',
  };

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
      console.error('Typing Web Audio API init failed', e);
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
        // Fallback will be used
      }
    };
    await Promise.all(Object.entries(this.soundPaths).map(([key, path]) => loadSound(key, path)));
  }

  private isMuted = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('keywordpro_muted') === 'true';
    }
    return false;
  };

  private playSound = (type: keyof typeof this.soundPaths) => {
    if (this.isMuted() || !this.context) return;
    if (this.context.state === 'suspended') this.context.resume();

    const buffer = this.buffers.get(type);
    if (buffer) {
      const source = this.context.createBufferSource();
      source.buffer = buffer;
      source.connect(this.context.destination);
      source.start(0);
    } else {
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
      case 'keyPress': // Subtle modern keyboard click (100ms)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.15, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
        break;

      case 'backspace': // Light whoosh/eraser
        // Using a low-frequency triangle wave to simulate a dull whoosh
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.15);
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.2, now + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
        break;

      case 'focusPop': // Tiny pop
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.1, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
        break;

      case 'aiType': // Soft fast typewriter (80ms)
        osc.type = 'square';
        // Slight randomization for realistic typewriter feel
        const randomFreq = 400 + Math.random() * 200; 
        osc.frequency.setValueAtTime(randomFreq, now);
        osc.frequency.exponentialRampToValueAtTime(randomFreq / 2, now + 0.04);
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.05, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
        break;

      case 'completeChime': // Soft ascending chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554.37, now + 0.1); // C#
        osc.frequency.setValueAtTime(659.25, now + 0.2); // E
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.1, now + 0.05);
        gainNode.gain.setValueAtTime(0.1, now + 0.2);
        gainNode.gain.linearRampToValueAtTime(0, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
        break;
    }
  }

  public playKeyPress = () => this.playSound('keyPress');
  public playBackspace = () => this.playSound('backspace');
  public playFocusPop = () => this.playSound('focusPop');
  public playAiType = () => this.playSound('aiType');
  public playCompleteChime = () => this.playSound('completeChime');
}

export const typingAudio = new TypingSoundController();
