/**
 * Vaidyalens Voice Map
 * Maps language × gender to TTS voice names.
 * Voice MUST match the avatar gender. If no voice of selected gender exists,
 * automatically switch to the avatar that matches the available voice.
 */

import { SupportedLanguage, DoctorGender, VoiceMapEntry } from '../../src/types/vaidyalens';

// Google Cloud TTS Neural voices for Indian languages
// Azure Neural TTS voices as fallback
const VOICE_MAP: VoiceMapEntry[] = [
  // English
  { language: 'en', gender: 'female', voiceName: 'en-IN-Wavenet-A', provider: 'google', isAvailable: true },
  { language: 'en', gender: 'male', voiceName: 'en-IN-Wavenet-B', provider: 'google', isAvailable: true },
  // Telugu
  { language: 'te', gender: 'female', voiceName: 'te-IN-Standard-A', provider: 'google', isAvailable: true },
  { language: 'te', gender: 'male', voiceName: 'te-IN-Standard-B', provider: 'google', isAvailable: true },
  // Hindi
  { language: 'hi', gender: 'female', voiceName: 'hi-IN-Wavenet-A', provider: 'google', isAvailable: true },
  { language: 'hi', gender: 'male', voiceName: 'hi-IN-Wavenet-B', provider: 'google', isAvailable: true },
  // Tamil
  { language: 'ta', gender: 'female', voiceName: 'ta-IN-Standard-A', provider: 'google', isAvailable: true },
  { language: 'ta', gender: 'male', voiceName: 'ta-IN-Standard-B', provider: 'google', isAvailable: true },
  // Kannada
  { language: 'kn', gender: 'female', voiceName: 'kn-IN-Standard-A', provider: 'google', isAvailable: true },
  { language: 'kn', gender: 'male', voiceName: 'kn-IN-Standard-B', provider: 'google', isAvailable: true },
  // Malayalam
  { language: 'ml', gender: 'female', voiceName: 'ml-IN-Standard-A', provider: 'google', isAvailable: true },
  { language: 'ml', gender: 'male', voiceName: 'ml-IN-Standard-B', provider: 'google', isAvailable: true },
  // Bengali
  { language: 'bn', gender: 'female', voiceName: 'bn-IN-Standard-A', provider: 'google', isAvailable: true },
  { language: 'bn', gender: 'male', voiceName: 'bn-IN-Standard-B', provider: 'google', isAvailable: true },
  // Marathi
  { language: 'mr', gender: 'female', voiceName: 'mr-IN-Standard-A', provider: 'google', isAvailable: true },
  { language: 'mr', gender: 'male', voiceName: 'mr-IN-Standard-B', provider: 'google', isAvailable: true },
];

export interface VoiceSelection {
  voiceEntry: VoiceMapEntry;
  genderSwitched: boolean;
  switchNotice?: string;
  originalGender: DoctorGender;
  effectiveGender: DoctorGender;
}

/**
 * Select the appropriate voice for a language and gender.
 * If the requested gender is unavailable, switch to the available gender
 * and return a notice so the UI can switch the avatar to match.
 */
export function selectVoice(language: SupportedLanguage, requestedGender: DoctorGender): VoiceSelection {
  // Try exact match first
  const exact = VOICE_MAP.find(
    v => v.language === language && v.gender === requestedGender && v.isAvailable
  );

  if (exact) {
    return {
      voiceEntry: exact,
      genderSwitched: false,
      originalGender: requestedGender,
      effectiveGender: requestedGender,
    };
  }

  // Try opposite gender
  const oppositeGender: DoctorGender = requestedGender === 'female' ? 'male' : 'female';
  const fallback = VOICE_MAP.find(
    v => v.language === language && v.gender === oppositeGender && v.isAvailable
  );

  if (fallback) {
    return {
      voiceEntry: fallback,
      genderSwitched: true,
      switchNotice: `A ${requestedGender} voice is not available for this language. Using ${oppositeGender} voice and avatar instead.`,
      originalGender: requestedGender,
      effectiveGender: oppositeGender,
    };
  }

  // Browser fallback — gender unknown
  const browserFallback: VoiceMapEntry = {
    language,
    gender: requestedGender,
    voiceName: 'browser-default',
    provider: 'browser',
    isAvailable: true,
  };

  return {
    voiceEntry: browserFallback,
    genderSwitched: false,
    switchNotice: 'Using browser text-to-speech as fallback. Voice gender may not match avatar.',
    originalGender: requestedGender,
    effectiveGender: requestedGender,
  };
}

/**
 * Get browser speech synthesis voice language code
 */
export function getBrowserVoiceLang(language: SupportedLanguage): string {
  const map: Record<SupportedLanguage, string> = {
    en: 'en-IN',
    te: 'te-IN',
    hi: 'hi-IN',
    ta: 'ta-IN',
    kn: 'kn-IN',
    ml: 'ml-IN',
    bn: 'bn-IN',
    mr: 'mr-IN',
  };
  return map[language] || 'en-IN';
}

export { VOICE_MAP };
