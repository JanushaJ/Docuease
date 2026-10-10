import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Globe, 
  FileText, 
  Sparkles, 
  GraduationCap, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from '../types/medscript';
import { TeacherStep } from '../services/teacherCurriculum';

export interface TeacherAvatar3DProps {
  currentStep: TeacherStep;
  currentStepIndex: number;
  totalSteps: number;
  isSpeaking: boolean;
  isMuted: boolean;
  playbackSpeed: number;
  language: SupportedLanguage;
  activeSubtitleSentence?: string;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onToggleMute: () => void;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onSpeedChange: (speed: number) => void;
  onReplayStep: () => void;
  onToggleTranscript?: () => void;
  showTranscript?: boolean;
}

export const TeacherAvatar3D: React.FC<TeacherAvatar3DProps> = ({
  currentStep,
  currentStepIndex,
  totalSteps,
  isSpeaking,
  isMuted,
  playbackSpeed,
  language,
  activeSubtitleSentence,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onToggleMute,
  onLanguageChange,
  onSpeedChange,
  onReplayStep,
  onToggleTranscript,
  showTranscript = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Model part references for real-time procedural animation
  const headGroupRef = useRef<THREE.Group | null>(null);
  const leftEyeLidRef = useRef<THREE.Mesh | null>(null);
  const rightEyeLidRef = useRef<THREE.Mesh | null>(null);
  const mouthRef = useRef<THREE.Mesh | null>(null);
  const pointingArmRef = useRef<THREE.Group | null>(null);
  const pointerStickRef = useRef<THREE.Mesh | null>(null);

  // Animation states
  const isSpeakingRef = useRef(isSpeaking);
  isSpeakingRef.current = isSpeaking;

  // Initialize Three.js scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = null; // transparent background

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.25, 4.2);
    camera.lookAt(0, 1.15, 0);

    // Renderer with Anti-aliasing
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 1.2);
    scene.add(ambientLight);

    // Key Light (Warm Key)
    const keyLight = new THREE.DirectionalLight(0xfff0dd, 2.2);
    keyLight.position.set(2, 3, 3);
    scene.add(keyLight);

    // Fill Light (Soft Cyan Blue Fill)
    const fillLight = new THREE.DirectionalLight(0x7dd3fc, 1.1);
    fillLight.position.set(-3, 2, 2);
    scene.add(fillLight);

    // Rim / Hair Light (Luxury Gold Rim)
    const rimLight = new THREE.DirectionalLight(0xe5c07b, 2.5);
    rimLight.position.set(0, 4, -3);
    scene.add(rimLight);

    // Materials
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xf5d0b5,
      roughness: 0.65,
      metalness: 0.05
    });

    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x221a15,
      roughness: 0.85
    });

    const blazerMat = new THREE.MeshStandardMaterial({
      color: 0x0c1638, // Dark Blue Navy Blazer
      roughness: 0.7,
      metalness: 0.1
    });

    const shirtMat = new THREE.MeshStandardMaterial({
      color: 0xfbf8ee, // Cream Shirt
      roughness: 0.6
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xe5c07b, // Gold Accents
      roughness: 0.3,
      metalness: 0.85
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.85,
      ior: 1.5
    });

    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const irisMat = new THREE.MeshStandardMaterial({ color: 0x3b2413, roughness: 0.3 });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const lipMat = new THREE.MeshStandardMaterial({ color: 0xd98275, roughness: 0.5 });

    // --- Build Avatar Anatomy ---
    const characterGroup = new THREE.Group();
    characterGroup.position.set(0, 0, 0);
    scene.add(characterGroup);

    // Torso / Navy Blazer
    const torsoGeo = new THREE.CylinderGeometry(0.55, 0.65, 1.2, 24);
    const torso = new THREE.Mesh(torsoGeo, blazerMat);
    torso.position.set(0, 0.45, 0);
    characterGroup.add(torso);

    // Cream Shirt V-Neck / Collar Insert
    const shirtGeo = new THREE.BoxGeometry(0.35, 0.7, 0.35);
    const shirt = new THREE.Mesh(shirtGeo, shirtMat);
    shirt.position.set(0, 0.65, 0.18);
    characterGroup.add(shirt);

    // Golden Teacher Badge / Lapel Pin
    const pinGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.02, 16);
    const pin = new THREE.Mesh(pinGeo, goldMat);
    pin.rotation.x = Math.PI / 2;
    pin.position.set(-0.25, 0.8, 0.32);
    characterGroup.add(pin);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.35, 20);
    const neck = new THREE.Mesh(neckGeo, skinMat);
    neck.position.set(0, 1.15, 0);
    characterGroup.add(neck);

    // Head Group (allows nodding, tilting, and turning towards the document)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.35, 0);
    characterGroup.add(headGroup);
    headGroupRef.current = headGroup;

    // Face / Head Base
    const headGeo = new THREE.SphereGeometry(0.42, 32, 32);
    headGeo.scale(1, 1.15, 0.95);
    const head = new THREE.Mesh(headGeo, skinMat);
    headGroup.add(head);

    // Professional Hair (Curated Teacher Hairstyle)
    const hairGeo = new THREE.SphereGeometry(0.46, 32, 24);
    hairGeo.scale(1.02, 1.12, 1.05);
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.set(0, 0.08, -0.04);
    headGroup.add(hair);

    // Hair Front Fringe / Parting
    const fringeGeo = new THREE.BoxGeometry(0.65, 0.22, 0.25);
    const fringe = new THREE.Mesh(fringeGeo, hairMat);
    fringe.position.set(-0.04, 0.38, 0.32);
    fringe.rotation.z = -0.15;
    headGroup.add(fringe);

    // Eyes (Left & Right)
    const createEye = (xPos: number) => {
      const eyeGroup = new THREE.Group();
      eyeGroup.position.set(xPos, 0.06, 0.36);

      // Eye White
      const eyeBallGeo = new THREE.SphereGeometry(0.085, 20, 20);
      const eyeBall = new THREE.Mesh(eyeBallGeo, eyeWhiteMat);
      eyeGroup.add(eyeBall);

      // Iris
      const irisGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.02, 16);
      const iris = new THREE.Mesh(irisGeo, irisMat);
      iris.rotation.x = Math.PI / 2;
      iris.position.set(0, 0, 0.08);
      eyeGroup.add(iris);

      // Pupil
      const pupilGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.025, 16);
      const pupil = new THREE.Mesh(pupilGeo, pupilMat);
      pupil.rotation.x = Math.PI / 2;
      pupil.position.set(0, 0, 0.085);
      eyeGroup.add(pupil);

      // Eyelid for Blinking
      const lidGeo = new THREE.BoxGeometry(0.18, 0.1, 0.08);
      const lid = new THREE.Mesh(lidGeo, skinMat);
      lid.position.set(0, 0.06, 0.07);
      eyeGroup.add(lid);

      return { eyeGroup, lid };
    };

    const leftEye = createEye(-0.16);
    const rightEye = createEye(0.16);
    headGroup.add(leftEye.eyeGroup);
    headGroup.add(rightEye.eyeGroup);
    leftEyeLidRef.current = leftEye.lid;
    rightEyeLidRef.current = rightEye.lid;

    // Eyebrows
    const browGeo = new THREE.BoxGeometry(0.16, 0.03, 0.03);
    const leftBrow = new THREE.Mesh(browGeo, hairMat);
    leftBrow.position.set(-0.16, 0.18, 0.38);
    leftBrow.rotation.z = 0.08;
    headGroup.add(leftBrow);

    const rightBrow = new THREE.Mesh(browGeo, hairMat);
    rightBrow.position.set(0.16, 0.18, 0.38);
    rightBrow.rotation.z = -0.08;
    headGroup.add(rightBrow);

    // Nose
    const noseGeo = new THREE.ConeGeometry(0.05, 0.14, 16);
    const nose = new THREE.Mesh(noseGeo, skinMat);
    nose.rotation.x = -Math.PI / 2;
    nose.position.set(0, -0.04, 0.42);
    headGroup.add(nose);

    // Mouth with Lip-Sync Movement
    const mouthGeo = new THREE.SphereGeometry(0.08, 16, 12);
    mouthGeo.scale(1.4, 0.4, 0.4);
    const mouth = new THREE.Mesh(mouthGeo, lipMat);
    mouth.position.set(0, -0.22, 0.38);
    headGroup.add(mouth);
    mouthRef.current = mouth;

    // Professional Teacher Spectacles (Glasses)
    const glassesGroup = new THREE.Group();
    glassesGroup.position.set(0, 0.06, 0.38);

    const frameMat = goldMat;
    const ringGeo = new THREE.TorusGeometry(0.11, 0.015, 12, 32);

    const leftFrame = new THREE.Mesh(ringGeo, frameMat);
    leftFrame.position.set(-0.16, 0, 0.02);
    glassesGroup.add(leftFrame);

    const rightFrame = new THREE.Mesh(ringGeo, frameMat);
    rightFrame.position.set(0.16, 0, 0.02);
    glassesGroup.add(rightFrame);

    // Bridge
    const bridgeGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.12, 12);
    const bridge = new THREE.Mesh(bridgeGeo, frameMat);
    bridge.rotation.z = Math.PI / 2;
    bridge.position.set(0, 0.02, 0.02);
    glassesGroup.add(bridge);

    // Lenses
    const lensGeo = new THREE.CircleGeometry(0.1, 24);
    const leftLens = new THREE.Mesh(lensGeo, glassMat);
    leftLens.position.set(-0.16, 0, 0.02);
    glassesGroup.add(leftLens);

    const rightLens = new THREE.Mesh(lensGeo, glassMat);
    rightLens.position.set(0.16, 0, 0.02);
    glassesGroup.add(rightLens);

    headGroup.add(glassesGroup);

    // --- Right Arm with Golden Pointer Stick ---
    // (Arm reaches out leftwards towards the document to point!)
    const armGroup = new THREE.Group();
    armGroup.position.set(-0.48, 0.85, 0.05); // Shoulder
    characterGroup.add(armGroup);
    pointingArmRef.current = armGroup;

    // Upper Arm
    const upperArmGeo = new THREE.CylinderGeometry(0.11, 0.1, 0.45, 16);
    const upperArm = new THREE.Mesh(upperArmGeo, blazerMat);
    upperArm.position.set(-0.12, -0.18, 0.08);
    upperArm.rotation.z = 0.55;
    armGroup.add(upperArm);

    // Forearm
    const forearmGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.45, 16);
    const forearm = new THREE.Mesh(forearmGeo, blazerMat);
    forearm.position.set(-0.32, -0.32, 0.22);
    forearm.rotation.z = 1.15;
    forearm.rotation.x = -0.4;
    armGroup.add(forearm);

    // Hand
    const handGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const hand = new THREE.Mesh(handGeo, skinMat);
    hand.position.set(-0.52, -0.36, 0.35);
    armGroup.add(hand);

    // Pointer Stick (Extending toward document on left)
    const stickGeo = new THREE.CylinderGeometry(0.015, 0.02, 0.9, 12);
    const stick = new THREE.Mesh(stickGeo, goldMat);
    stick.position.set(-0.95, -0.38, 0.48);
    stick.rotation.z = Math.PI / 2.3;
    stick.rotation.y = 0.25;
    armGroup.add(stick);
    pointerStickRef.current = stick;

    // Glowing Tip on Pointer
    const tipGeo = new THREE.SphereGeometry(0.035, 12, 12);
    const tipMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const tip = new THREE.Mesh(tipGeo, tipMat);
    tip.position.set(-0.45, 0, 0);
    stick.add(tip);

    // Left Arm (Gentle Resting / Gesturing)
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(0.48, 0.85, 0.05);
    characterGroup.add(leftArmGroup);

    const leftUpperArmGeo = new THREE.CylinderGeometry(0.11, 0.1, 0.5, 16);
    const leftUpperArm = new THREE.Mesh(leftUpperArmGeo, blazerMat);
    leftUpperArm.position.set(0.06, -0.22, 0.02);
    leftUpperArm.rotation.z = -0.2;
    leftArmGroup.add(leftUpperArm);

    const leftForearmGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.45, 16);
    const leftForearm = new THREE.Mesh(leftForearmGeo, blazerMat);
    leftForearm.position.set(0.12, -0.45, 0.14);
    leftForearm.rotation.z = -0.45;
    leftForearm.rotation.x = -0.3;
    leftArmGroup.add(leftForearm);

    const leftHand = new THREE.Mesh(handGeo, skinMat);
    leftHand.position.set(0.18, -0.6, 0.25);
    leftArmGroup.add(leftHand);

    // Holographic Base / Floor Grid
    const floorGeo = new THREE.CylinderGeometry(1.2, 1.4, 0.08, 32);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x080e24,
      roughness: 0.4,
      metalness: 0.8
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.set(0, -0.15, 0);
    characterGroup.add(floor);

    const ringAuraGeo = new THREE.RingGeometry(1.25, 1.35, 32);
    const ringAuraMat = new THREE.MeshBasicMaterial({
      color: 0xe5c07b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65
    });
    const ringAura = new THREE.Mesh(ringAuraGeo, ringAuraMat);
    ringAura.rotation.x = Math.PI / 2;
    ringAura.position.set(0, -0.1, 0);
    characterGroup.add(ringAura);

    // --- Animation Loop ---
    let clock = new THREE.Clock();
    let blinkTimer = 0;
    let isBlinking = false;

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // 1. Natural Breathing & Gentle Idle Movement
      if (characterGroup) {
        characterGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.02;
      }

      // 2. Head Tilt & Nod
      if (headGroupRef.current) {
        if (isSpeakingRef.current) {
          // Engaging teacher movement: nodding, slight turn toward document (left)
          headGroupRef.current.rotation.x = Math.sin(elapsedTime * 4.5) * 0.06 - 0.02;
          headGroupRef.current.rotation.y = Math.sin(elapsedTime * 2.2) * 0.08 - 0.12; // tilted slightly left
          headGroupRef.current.rotation.z = Math.cos(elapsedTime * 2.5) * 0.03;
        } else {
          // Calm idle tracking
          headGroupRef.current.rotation.x = Math.sin(elapsedTime * 1.2) * 0.02;
          headGroupRef.current.rotation.y = Math.sin(elapsedTime * 0.8) * 0.04;
          headGroupRef.current.rotation.z = 0;
        }
      }

      // 3. Natural Blinking (every 3.8s)
      blinkTimer += delta;
      if (blinkTimer > 3.8) {
        isBlinking = true;
        blinkTimer = 0;
      }

      if (isBlinking) {
        if (leftEyeLidRef.current && rightEyeLidRef.current) {
          leftEyeLidRef.current.position.y = THREE.MathUtils.lerp(leftEyeLidRef.current.position.y, 0, 0.4);
          rightEyeLidRef.current.position.y = THREE.MathUtils.lerp(rightEyeLidRef.current.position.y, 0, 0.4);

          if (Math.abs(leftEyeLidRef.current.position.y - 0) < 0.01) {
            isBlinking = false;
          }
        }
      } else {
        if (leftEyeLidRef.current && rightEyeLidRef.current) {
          leftEyeLidRef.current.position.y = THREE.MathUtils.lerp(leftEyeLidRef.current.position.y, 0.06, 0.25);
          rightEyeLidRef.current.position.y = THREE.MathUtils.lerp(rightEyeLidRef.current.position.y, 0.06, 0.25);
        }
      }

      // 4. Lip-Synchronization when Speaking
      if (mouthRef.current) {
        if (isSpeakingRef.current) {
          // Dynamic phonetic mouth oscillation
          const mouthOpen = (Math.sin(elapsedTime * 14) * 0.5 + 0.5) * 0.09;
          mouthRef.current.scale.y = 0.4 + mouthOpen * 12;
          mouthRef.current.scale.x = 1.4 - mouthOpen * 4;
        } else {
          mouthRef.current.scale.y = 0.4;
          mouthRef.current.scale.x = 1.4;
        }
      }

      // 5. Pointing Arm & Gesture
      if (pointingArmRef.current) {
        if (isSpeakingRef.current) {
          // Dynamic pointing gesture toward document
          const gestureNod = Math.sin(elapsedTime * 3) * 0.05;
          pointingArmRef.current.position.x = -0.48 + gestureNod;
          pointingArmRef.current.rotation.y = -0.15 + Math.sin(elapsedTime * 2) * 0.08;
          pointingArmRef.current.rotation.z = Math.sin(elapsedTime * 2.5) * 0.04;
        } else {
          pointingArmRef.current.position.x = THREE.MathUtils.lerp(pointingArmRef.current.position.x, -0.48, 0.05);
          pointingArmRef.current.rotation.y = THREE.MathUtils.lerp(pointingArmRef.current.rotation.y, 0, 0.05);
          pointingArmRef.current.rotation.z = THREE.MathUtils.lerp(pointingArmRef.current.rotation.z, 0, 0.05);
        }
      }

      // Glowing aura pulse
      if (ringAura) {
        ringAura.rotation.z += 0.005;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="relative flex flex-col items-center w-full bg-darkblue-850/90 rounded-2xl border border-darkblue-700/80 shadow-2xl overflow-hidden backdrop-blur-md">
      {/* Top Header & Status */}
      <div className="w-full flex items-center justify-between px-4 py-3 border-b border-darkblue-700/60 bg-darkblue-950/60">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-gold-500 to-amber-400 text-darkblue-950 font-bold shadow-md">
            <GraduationCap className="w-4 h-4" />
            {isSpeaking && (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-cream-100 font-sans">
                KrishBuddy
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-gold-500/20 text-gold-accent border border-gold-500/30">
                3D HUMAN GUIDE
              </span>
            </div>
            <p className="text-[11px] text-cream-300/80">
              {isSpeaking ? 'Teaching section...' : 'Ready to explain'}
            </p>
          </div>
        </div>

        {/* Audio Visualizer Waves */}
        {isSpeaking && !isMuted ? (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-darkblue-900 border border-gold-500/30">
            <span className="w-1 bg-gold-accent rounded-full audio-bar" />
            <span className="w-1 bg-gold-accent rounded-full audio-bar" />
            <span className="w-1 bg-gold-accent rounded-full audio-bar" />
            <span className="w-1 bg-gold-accent rounded-full audio-bar" />
            <span className="w-1 bg-gold-accent rounded-full audio-bar" />
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-cream-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive</span>
          </div>
        )}
      </div>

      {/* 3D WebGL Canvas Container */}
      <div 
        ref={containerRef} 
        className="relative w-full h-[320px] sm:h-[360px] cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden"
      >
        {/* Soft Background Radial Lighting behind avatar */}
        <div className="absolute inset-0 teacher-podium-glow pointer-events-none" />

        {/* Live Speaking Speech Bubble Overlay */}
        {isSpeaking && (
          <div className="absolute bottom-3 left-4 right-4 z-20 pointer-events-none transition-all duration-300">
            <div className="p-3 rounded-xl bg-darkblue-950/90 border border-gold-500/50 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-accent">
                  Teacher is explaining:
                </span>
              </div>
              <p className="text-xs font-medium text-cream-50 leading-relaxed line-clamp-2">
                "{activeSubtitleSentence || currentStep.spokenScript}"
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Synchronized Pointer Notice */}
      <div className="w-full px-4 py-2 bg-darkblue-950/80 border-t border-darkblue-700/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-cream-200">
          <span className="text-gold-accent font-bold">👉 Pointing to:</span>
          <span className="font-semibold text-cream-50 truncate max-w-[200px] sm:max-w-[260px]">
            {currentStep.title.replace(/^STEP \d+ — /, '')}
          </span>
        </div>
        <span className="text-[11px] font-mono text-gold-accent bg-darkblue-900 px-2 py-0.5 rounded border border-darkblue-700">
          {currentStepIndex + 1} / {totalSteps}
        </span>
      </div>

      {/* Teacher Control Bar */}
      <div className="w-full p-3 bg-darkblue-900/90 border-t border-darkblue-700 flex flex-col gap-2.5">
        {/* Top Controls: Playback Buttons & Progress */}
        <div className="flex items-center justify-between gap-2">
          {/* Previous Step */}
          <button
            onClick={onPrevious}
            disabled={currentStepIndex <= 0}
            className="p-2 rounded-lg bg-darkblue-800 hover:bg-darkblue-700 text-cream-100 disabled:opacity-30 disabled:pointer-events-none transition-all"
            title="Previous Step"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Primary Play/Pause Button */}
          <button
            onClick={isSpeaking ? onPause : onPlay}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all bg-gradient-to-r from-gold-500 via-amber-400 to-gold-accent text-darkblue-950 shadow-lg hover:shadow-gold-500/25 active:scale-98"
          >
            {isSpeaking ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause Lesson</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current ml-0.5" />
                <span>Teach This Part</span>
              </>
            )}
          </button>

          {/* Next Step */}
          <button
            onClick={onNext}
            disabled={currentStepIndex >= totalSteps - 1}
            className="p-2 rounded-lg bg-darkblue-800 hover:bg-darkblue-700 text-cream-100 disabled:opacity-30 disabled:pointer-events-none transition-all"
            title="Next Step"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Replay */}
          <button
            onClick={onReplayStep}
            className="p-2 rounded-lg bg-darkblue-800 hover:bg-darkblue-700 text-cream-200 transition-all"
            title="Replay Current Step"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Secondary Controls: Voice Mute, Speed, Language, Transcript */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-darkblue-800/80">
          {/* Voice Mute Toggle */}
          <button
            onClick={onToggleMute}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isMuted 
                ? 'bg-red-500/20 text-red-300 border border-red-500/40' 
                : 'bg-darkblue-800 hover:bg-darkblue-750 text-cream-200'
            }`}
            title={isMuted ? 'Unmute Teacher Voice' : 'Mute Voice'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-gold-accent" />}
            <span className="text-[11px]">{isMuted ? 'Muted' : 'Voice'}</span>
          </button>

          {/* Speed Selector (0.8x, 1.0x, 1.2x) */}
          <div className="flex items-center bg-darkblue-800 rounded-lg p-0.5 text-[11px] font-mono">
            {[0.8, 1.0, 1.2].map(speed => (
              <button
                key={speed}
                onClick={() => onSpeedChange(speed)}
                className={`px-2 py-1 rounded font-semibold transition-all ${
                  playbackSpeed === speed 
                    ? 'bg-gold-500 text-darkblue-950 shadow-sm' 
                    : 'text-cream-300 hover:text-cream-50'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              className="appearance-none bg-darkblue-800 hover:bg-darkblue-750 text-cream-100 text-[11px] font-semibold py-1.5 pl-7 pr-4 rounded-lg border border-darkblue-700 focus:outline-none focus:border-gold-accent cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code} className="bg-darkblue-900 text-cream-100">
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
            <Globe className="w-3.5 h-3.5 text-gold-accent absolute left-2 top-2.5 pointer-events-none" />
          </div>

          {/* Transcript Toggle */}
          {onToggleTranscript && (
            <button
              onClick={onToggleTranscript}
              className={`p-1.5 rounded-lg transition-all ${
                showTranscript 
                  ? 'bg-gold-500/20 text-gold-accent border border-gold-500/40' 
                  : 'bg-darkblue-800 hover:bg-darkblue-750 text-cream-300'
              }`}
              title="Show Full Teacher Transcript"
            >
              <FileText className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
