import React from 'react';
import { KrishXTattvaAvatar, KrishXTattvaAvatarProps } from './KrishXTattvaAvatar';

/**
 * MiloAvatar / KrishXTattvaAvatar
 * 
 * Production-ready human-like 3D cartoon character rendered using Three.js / React WebGL.
 * Features:
 * - Soft rounded face, large warm expressive eyes, gentle blinking animations
 * - Welcoming smile, synchronized mouth visemes
 * - Stylish pastel teal & soft white attire
 * - Dynamic states: Idle/breathing, thinking/pulse glow, speaking, error/review tilt
 */
export const MiloAvatar: React.FC<KrishXTattvaAvatarProps> = (props) => {
  return <KrishXTattvaAvatar {...props} characterTitle={props.characterTitle || 'Krish X Tattva (Milo)'} />;
};

export default MiloAvatar;
