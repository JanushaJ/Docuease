import React from 'react';
import { 
  KrishBuddy3DHumanAvatar, 
  AvatarState 
} from './KrishBuddy3DHumanAvatar';
import { SupportedLanguage } from '../types/medscript';

export interface ThreeDoctorAvatarProps {
  isSpeaking: boolean;
  onToggleSpeech: () => void;
  onReplaySpeech: () => void;
  language: SupportedLanguage;
  activeSentence?: string;
  isMuted: boolean;
  onToggleMute: () => void;
  isVerifiedContent?: boolean;
  spokenScript?: string;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  playbackSpeed?: number;
  onSpeedChange?: (speed: number) => void;
  state?: AvatarState;
}

/**
 * ThreeDoctorAvatar - Signature MedScript AI 3D Doctor
 * Labeled: "MedScript AI — Virtual Medical Explainer"
 * Features natural eye blinking, gentle breathing, speech gestures, and lip-sync.
 */
export const ThreeDoctorAvatar: React.FC<ThreeDoctorAvatarProps> = (props) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
        {/* Medical Banner */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-medblue-900 via-slate-900 to-medteal-950 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-medteal-400 animate-ping" />
            <div>
              <h3 className="text-sm font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>MedScript AI</span>
                <span className="text-xs font-normal text-medteal-300">— Virtual Medical Explainer</span>
              </h3>
              <p className="text-[11px] text-slate-300">
                Speaks verified medical records in your selected language
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-medblue-500/20 text-medblue-300 border border-medblue-400/30 uppercase tracking-wider">
            Verified Audio Guide
          </span>
        </div>

        {/* 3D Human Avatar WebGL Render */}
        <KrishBuddy3DHumanAvatar
          isSpeaking={props.isSpeaking}
          onToggleSpeech={props.onToggleSpeech}
          onReplaySpeech={props.onReplaySpeech}
          language={props.language}
          activeSentence={props.activeSentence}
          isMuted={props.isMuted}
          onToggleMute={props.onToggleMute}
          spokenScript={props.spokenScript}
          onLanguageChange={props.onLanguageChange}
          playbackSpeed={props.playbackSpeed}
          onSpeedChange={props.onSpeedChange}
          state={props.state}
          attire="doctor"
          title="MedScript AI"
          subtitle="Virtual Medical Explainer"
        />

        {/* Reassuring Medical Boundary Disclaimer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
          <p className="text-[11px] text-slate-500 font-medium">
            👨‍⚕️ <strong>Notice:</strong> MedScript AI explains verified document text and does not provide an autonomous diagnosis or replace your physician.
          </p>
        </div>
      </div>
    </div>
  );
};
