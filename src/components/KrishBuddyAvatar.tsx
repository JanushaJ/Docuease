import React from 'react';
import { 
  KrishBuddy3DHumanAvatar, 
  AvatarState, 
  AvatarAttire 
} from './KrishBuddy3DHumanAvatar';
import { SupportedLanguage } from '../types/medscript';

export type { AvatarState, AvatarAttire };

export interface KrishBuddyAvatarProps {
  isSpeaking: boolean;
  onToggleSpeech: () => void;
  onReplaySpeech: () => void;
  language: SupportedLanguage;
  activeSentence?: string;
  isMuted?: boolean;
  onToggleMute?: () => void;
  state?: AvatarState;
  hasWarnings?: boolean;
  onPointToDetails?: () => void;
  playbackSpeed?: number;
  onSpeedChange?: (speed: number) => void;
  spokenScript?: string;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  attire?: AvatarAttire;
}

/**
 * KrishBuddyAvatar
 * Primary 3D Human Avatar component for Krishxtattva.
 * Renders a realistic 3D human guide with Three.js WebGL.
 */
export const KrishBuddyAvatar: React.FC<KrishBuddyAvatarProps> = (props) => {
  return (
    <KrishBuddy3DHumanAvatar
      isSpeaking={props.isSpeaking}
      onToggleSpeech={props.onToggleSpeech}
      onReplaySpeech={props.onReplaySpeech}
      language={props.language}
      activeSentence={props.activeSentence}
      isMuted={props.isMuted}
      onToggleMute={props.onToggleMute}
      state={props.state}
      hasWarnings={props.hasWarnings}
      onPointToDetails={props.onPointToDetails}
      playbackSpeed={props.playbackSpeed}
      onSpeedChange={props.onSpeedChange}
      spokenScript={props.spokenScript}
      onLanguageChange={props.onLanguageChange}
      attire={props.attire || 'doctor'}
      title="KrishBuddy"
      subtitle="3D Universal Document Guide"
    />
  );
};
