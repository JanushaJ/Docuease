import { SupportedLanguage, SentenceTiming } from '../types/medscript';

export interface SpeechCallbacks {
  onStart?: () => void;
  onSentenceChange?: (sentenceIndex: number, sentenceText: string) => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

export interface SpeechItem {
  sentence: string;
  phoneticSentence?: string;
}

export const BCP47_LANG_MAP: Record<SupportedLanguage, string> = {
  en: 'en-US',
  te: 'te-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  bn: 'bn-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  pa: 'pa-IN',
  ur: 'ur-IN',
  or: 'or-IN',
  as: 'as-IN',
  bho: 'hi-IN',
  sa: 'hi-IN',
  ne: 'ne-NP',
  es: 'es-ES',
  fr: 'fr-FR',
  ar: 'ar-SA',
  de: 'de-DE'
};

class SpeechManager {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private isSpeaking = false;
  private isPaused = false;
  private items: SpeechItem[] = [];
  private currentSentenceIndex = 0;
  private callbacks: SpeechCallbacks = {};
  private language: SupportedLanguage = 'en';
  private rate: number = 0.95;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Warm up voice list
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.getVoices();
    }
  }

  public setRate(newRate: number) {
    this.rate = Math.max(0.7, Math.min(1.5, newRate));
    if (this.currentAudio) {
      this.currentAudio.playbackRate = this.rate;
    }
  }

  public speakText(
    fullText: string,
    sentences: (string | SentenceTiming | SpeechItem)[],
    language: SupportedLanguage,
    callbacks: SpeechCallbacks = {}
  ) {
    this.stop();

    if (sentences && sentences.length > 0) {
      this.items = sentences.map(s => {
        if (typeof s === 'string') {
          return { sentence: s };
        }
        return {
          sentence: s.sentence,
          phoneticSentence: (s as any).phoneticSentence
        };
      });
    } else {
      this.items = [{ sentence: fullText }];
    }

    this.currentSentenceIndex = 0;
    this.callbacks = callbacks;
    this.language = language;
    this.isSpeaking = true;
    this.isPaused = false;

    if (this.callbacks.onStart) {
      this.callbacks.onStart();
    }

    this.playNextSentence();
  }

  public speakScript(
    script: string,
    language: SupportedLanguage,
    callbacks?: SpeechCallbacks,
    rate?: number
  ) {
    if (rate) this.rate = rate;
    const rawSentences = script.split(/(?<=[.!?।])\s+/).filter(Boolean);
    const sentences = rawSentences.length > 0 ? rawSentences : [script];
    this.speakText(script, sentences, language, callbacks || {});
  }

  private playNextSentence() {
    if (this.currentSentenceIndex >= this.items.length) {
      this.isSpeaking = false;
      this.isPaused = false;
      if (this.callbacks.onEnd) {
        this.callbacks.onEnd();
      }
      return;
    }

    const item = this.items[this.currentSentenceIndex];
    if (this.callbacks.onSentenceChange) {
      this.callbacks.onSentenceChange(this.currentSentenceIndex, item.sentence);
    }

    const targetLangCode = BCP47_LANG_MAP[this.language] || 'en-US';
    const langPrefix = targetLangCode.slice(0, 2).toLowerCase();

    // Check if browser has a native voice for this exact language
    let matchedVoice: SpeechSynthesisVoice | null = null;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const voices = window.speechSynthesis.getVoices();
      matchedVoice = voices.find(v => {
        const vLang = v.lang.toLowerCase().replace('_', '-');
        return vLang.startsWith(targetLangCode.toLowerCase()) || vLang.startsWith(langPrefix);
      }) || null;
    }

    // For English or languages with verified browser voice, use speech synthesis
    // For regional languages where Windows/Chrome lacks local voice packs, use high-fidelity natural TTS audio
    const shouldUseAudioStream = !matchedVoice || (this.language !== 'en' && !matchedVoice.lang.toLowerCase().startsWith(langPrefix));

    if (shouldUseAudioStream) {
      this.playViaAudioStream(item.sentence, this.language);
    } else {
      this.playViaSpeechSynthesis(item.sentence, targetLangCode, matchedVoice);
    }
  }

  private playViaAudioStream(text: string, lang: SupportedLanguage) {
    try {
      const audioUrl = `/api/tts?text=${encodeURIComponent(text.slice(0, 250))}&lang=${lang}`;
      const audio = new Audio(audioUrl);
      this.currentAudio = audio;
      audio.playbackRate = this.rate;

      audio.onplay = () => {
        this.isSpeaking = true;
        this.isPaused = false;
      };

      audio.onended = () => {
        this.currentAudio = null;
        this.currentSentenceIndex++;
        this.playNextSentence();
      };

      audio.onerror = (e) => {
        console.warn(`[Audio stream error for lang=${lang}, advancing]:`, e);
        this.currentAudio = null;
        this.currentSentenceIndex++;
        this.playNextSentence();
      };

      audio.play().catch((err) => {
        console.warn('[Audio play prevented or interrupted]:', err);
        // Fallback to speech synthesis if audio play fails
        this.playViaSpeechSynthesis(text, BCP47_LANG_MAP[lang] || 'en-US', null);
      });
    } catch (err) {
      console.warn('[Failed creating audio stream]:', err);
      this.playViaSpeechSynthesis(text, BCP47_LANG_MAP[lang] || 'en-US', null);
    }
  }

  private playViaSpeechSynthesis(text: string, langCode: string, voice: SpeechSynthesisVoice | null) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.currentSentenceIndex++;
      this.playNextSentence();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;
    utterance.lang = langCode;
    if (voice) {
      utterance.voice = voice;
    }
    utterance.rate = this.rate;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      this.currentSentenceIndex++;
      this.playNextSentence();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error on sentence:', e);
      // Try audio stream if synthesis failed
      if (this.language !== 'en' && !this.currentAudio) {
        this.playViaAudioStream(text, this.language);
      } else {
        this.currentSentenceIndex++;
        this.playNextSentence();
      }
    };

    window.speechSynthesis.speak(utterance);
  }

  public pause() {
    this.isPaused = true;
    this.isSpeaking = false;
    if (this.currentAudio) {
      this.currentAudio.pause();
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
  }

  public resume() {
    this.isPaused = false;
    this.isSpeaking = true;
    if (this.currentAudio) {
      this.currentAudio.play().catch(console.warn);
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
  }

  public stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.isPaused = false;
    this.currentSentenceIndex = 0;
    if (this.callbacks.onEnd) {
      this.callbacks.onEnd();
    }
  }

  public getStatus() {
    return {
      isSpeaking: this.isSpeaking,
      isPaused: this.isPaused,
      currentSentenceIndex: this.currentSentenceIndex
    };
  }

  public static speak(
    text: string,
    language: SupportedLanguage,
    options?: { speed?: number; onEnd?: () => void; onError?: (err: any) => void; onStart?: () => void }
  ) {
    speechManager.speakScript(
      text,
      language,
      { onStart: options?.onStart, onEnd: options?.onEnd, onError: options?.onError },
      options?.speed
    );
  }

  public static stop() {
    speechManager.stop();
  }
}

export { SpeechManager };
export const speechManager = new SpeechManager();

// Legacy compatibility exports
export function speakText(text: string, options?: any) {
  speechManager.speakScript(text, options?.language || 'en', {
    onEnd: options?.onEnd,
    onError: options?.onError
  });
}

export function stopSpeaking() {
  speechManager.stop();
}

export function createSpeechRecognizer(..._args: any[]) { return null; }
export function isSpeechRecognitionSupported() { return false; }
