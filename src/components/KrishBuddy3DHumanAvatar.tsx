import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Globe, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle,
  Stethoscope,
  GraduationCap
} from 'lucide-react';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from '../types/medscript';

export type AvatarAttire = 'doctor' | 'professional';
export type AvatarState = 'idle' | 'thinking' | 'speaking' | 'warning' | 'error' | 'success';

export interface KrishBuddy3DHumanAvatarProps {
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
  attire?: AvatarAttire;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  title?: string;
  subtitle?: string;
}

/**
 * KrishBuddy 3D Human Avatar
 * A realistic, human-looking 3D assistant powered by Three.js WebGL.
 * Features realistic human facial anatomy, expressive almond eyes with natural blinking,
 * realistic lips with dynamic phonetic lip-sync, professional doctor/guide attire,
 * life-like idle breathing, pointing gestures towards documents, and full multilingual speech.
 */
export const KrishBuddy3DHumanAvatar: React.FC<KrishBuddy3DHumanAvatarProps> = ({
  isSpeaking,
  onToggleSpeech,
  onReplaySpeech,
  language,
  activeSentence,
  isMuted = false,
  onToggleMute,
  state: externalState,
  hasWarnings = false,
  onPointToDetails,
  playbackSpeed = 1.0,
  onSpeedChange,
  spokenScript,
  attire = 'doctor',
  onLanguageChange,
  title = 'KrishBuddy',
  subtitle = '3D Accessibility Guide'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Model bone/group references for dynamic procedural animation
  const characterGroupRef = useRef<THREE.Group | null>(null);
  const headGroupRef = useRef<THREE.Group | null>(null);
  const leftEyeLidRef = useRef<THREE.Mesh | null>(null);
  const rightEyeLidRef = useRef<THREE.Mesh | null>(null);
  const leftBrowRef = useRef<THREE.Mesh | null>(null);
  const rightBrowRef = useRef<THREE.Mesh | null>(null);
  const mouthRef = useRef<THREE.Mesh | null>(null);
  const lowerLipRef = useRef<THREE.Mesh | null>(null);
  const rightArmGroupRef = useRef<THREE.Group | null>(null);
  const leftArmGroupRef = useRef<THREE.Group | null>(null);

  // Synchronized state refs for requestAnimationFrame
  const isSpeakingRef = useRef(isSpeaking);
  isSpeakingRef.current = isSpeaking;

  const state: AvatarState = externalState || (
    isSpeaking 
      ? 'speaking' 
      : hasWarnings 
        ? 'warning' 
        : 'idle'
  );
  const stateRef = useRef(state);
  stateRef.current = state;

  const [isPointerActive, setIsPointerActive] = useState(false);

  // Initialize Three.js Realistic Human Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 420;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 3.8);
    camera.lookAt(0, 1.3, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting (Studio Setup for Realistic Human Skin)
    const ambientLight = new THREE.AmbientLight(0xfff5eb, 1.3);
    scene.add(ambientLight);

    // Warm Key Light (Face Highlight)
    const keyLight = new THREE.DirectionalLight(0xffebd2, 2.4);
    keyLight.position.set(1.8, 3.2, 3.0);
    scene.add(keyLight);

    // Cool Soft Fill Light (Natural Depth)
    const fillLight = new THREE.DirectionalLight(0x7dd3fc, 1.2);
    fillLight.position.set(-2.5, 2.0, 2.2);
    scene.add(fillLight);

    // Luxury Golden Rim / Hair Light
    const rimLight = new THREE.DirectionalLight(0xf59e0b, 2.2);
    rimLight.position.set(0, 3.8, -2.8);
    scene.add(rimLight);

    // Soft Bounce Light from Below
    const bounceLight = new THREE.DirectionalLight(0xfff7ed, 0.6);
    bounceLight.position.set(0, -1.5, 2.0);
    scene.add(bounceLight);

    // -------------------------------------------------------------
    // CUTE PIXAR/DISNEY CHIBI HUMAN MATERIALS
    // -------------------------------------------------------------
    // Soft warm peach chibi complexion
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xffdfd0, // Soft glowing peach complexion
      roughness: 0.52,
      metalness: 0.02
    });

    // Cute rosy blush
    const blushMat = new THREE.MeshStandardMaterial({
      color: 0xfb7185, // Kawaii rosy pink blush
      roughness: 0.8,
      transparent: true,
      opacity: 0.75
    });

    // Warm rich espresso styled hair
    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x241610,
      roughness: 0.65,
      metalness: 0.08
    });

    // Disney Anime Eye Materials
    const scleraMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const irisMat = new THREE.MeshStandardMaterial({
      color: 0x0d9488, // Luminous oceanic teal iris
      roughness: 0.25,
      metalness: 0.1
    });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x09090b });
    const specHighlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Cute Rosy Lips
    const lipMat = new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      roughness: 0.42,
      metalness: 0.02
    });

    // Eyebrows Material
    const browMat = new THREE.MeshStandardMaterial({
      color: 0x1f140e,
      roughness: 0.85
    });

    // Attire Materials (Cute Chibi Lab Coat / Suit)
    const whiteCoatMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc, // Crisp White Doctor Lab Coat
      roughness: 0.5,
      metalness: 0.05
    });

    const navySuitMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a, // Tailored Navy Blue Suit
      roughness: 0.65,
      metalness: 0.1
    });

    const scrubMat = new THREE.MeshStandardMaterial({
      color: 0x0d9488, // Teal medical scrub collar
      roughness: 0.4,
      metalness: 0.1
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Golden Assistant Badge
      roughness: 0.2,
      metalness: 0.85
    });

    const stethoscopeMat = new THREE.MeshStandardMaterial({
      color: 0x14b8a6,
      roughness: 0.35,
      metalness: 0.25
    });

    const stethChromeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.15,
      metalness: 0.95
    });

    // -------------------------------------------------------------
    // BUILD CUTE 3D CHIBI HUMAN ANATOMY
    // -------------------------------------------------------------
    const characterGroup = new THREE.Group();
    characterGroup.position.set(0, 0, 0);
    scene.add(characterGroup);
    characterGroupRef.current = characterGroup;

    // --- Torso & Attire ---
    const isDoctor = attire === 'doctor';
    const mainCoatMat = isDoctor ? whiteCoatMat : navySuitMat;

    // Rounded Chibi Torso
    const torsoGeo = new THREE.CylinderGeometry(0.48, 0.42, 0.95, 32);
    const torso = new THREE.Mesh(torsoGeo, mainCoatMat);
    torso.position.set(0, 0.48, 0);
    characterGroup.add(torso);

    // Inner Teal V-Neck Scrub Shirt
    const scrubGeo = new THREE.BoxGeometry(0.24, 0.28, 0.1);
    const scrub = new THREE.Mesh(scrubGeo, scrubMat);
    scrub.position.set(0, 0.78, 0.44);
    characterGroup.add(scrub);

    // Coat Lapels
    const lapelLeftGeo = new THREE.BoxGeometry(0.12, 0.42, 0.04);
    lapelLeftGeo.rotateZ(0.22);
    const leftLapel = new THREE.Mesh(lapelLeftGeo, mainCoatMat);
    leftLapel.position.set(-0.16, 0.7, 0.46);
    characterGroup.add(leftLapel);

    const lapelRightGeo = new THREE.BoxGeometry(0.12, 0.42, 0.04);
    lapelRightGeo.rotateZ(-0.22);
    const rightLapel = new THREE.Mesh(lapelRightGeo, mainCoatMat);
    rightLapel.position.set(0.16, 0.7, 0.46);
    characterGroup.add(rightLapel);

    // Golden Assistant Badge
    const badgeGeo = new THREE.BoxGeometry(0.11, 0.15, 0.02);
    const badge = new THREE.Mesh(badgeGeo, goldMat);
    badge.position.set(-0.26, 0.58, 0.46);
    characterGroup.add(badge);

    // Miniature Stethoscope around Neck
    if (isDoctor) {
      const stethLoopGeo = new THREE.TorusGeometry(0.34, 0.03, 16, 32, Math.PI * 1.15);
      stethLoopGeo.rotateX(Math.PI / 2.2);
      stethLoopGeo.rotateZ(-Math.PI * 0.08);
      const stethLoop = new THREE.Mesh(stethLoopGeo, stethoscopeMat);
      stethLoop.position.set(0, 0.88, 0.14);
      characterGroup.add(stethLoop);

      const bellGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.025, 24);
      bellGeo.rotateX(Math.PI / 2);
      const bell = new THREE.Mesh(bellGeo, stethChromeMat);
      bell.position.set(0.08, 0.58, 0.48);
      characterGroup.add(bell);
    }

    // --- Neck ---
    const neckGeo = new THREE.CylinderGeometry(0.18, 0.2, 0.24, 24);
    const neck = new THREE.Mesh(neckGeo, skinMat);
    neck.position.set(0, 1.02, 0);
    characterGroup.add(neck);

    // --- Head Group ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.48, 0);
    characterGroup.add(headGroup);
    headGroupRef.current = headGroup;

    // Cute Rounded Chibi Head
    const headGeo = new THREE.SphereGeometry(0.60, 32, 32);
    headGeo.scale(1.06, 1.0, 1.02);
    const head = new THREE.Mesh(headGeo, skinMat);
    headGroup.add(head);

    // Rosy Blushing Cheeks (Cute Kawaii Discs)
    const cheekGeo = new THREE.SphereGeometry(0.13, 16, 16);
    cheekGeo.scale(1.2, 0.7, 0.3);

    const leftCheek = new THREE.Mesh(cheekGeo, blushMat);
    leftCheek.position.set(-0.35, -0.07, 0.54);
    headGroup.add(leftCheek);

    const rightCheek = new THREE.Mesh(cheekGeo, blushMat);
    rightCheek.position.set(0.35, -0.07, 0.54);
    headGroup.add(rightCheek);

    // Cute Chibi Ears
    const earGeo = new THREE.SphereGeometry(0.11, 16, 16);
    earGeo.scale(0.5, 1.0, 0.8);

    const leftEar = new THREE.Mesh(earGeo, skinMat);
    leftEar.position.set(-0.64, 0.04, 0.02);
    headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, skinMat);
    rightEar.position.set(0.64, 0.04, 0.02);
    headGroup.add(rightEar);

    // Styled Human Chibi Hair (Soft Organic Shell + Bangs + Cowlick)
    const hairCapGeo = new THREE.SphereGeometry(0.64, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.65);
    hairCapGeo.rotateX(-0.35);
    const hairCap = new THREE.Mesh(hairCapGeo, hairMat);
    hairCap.position.set(0, 0.06, -0.05);
    headGroup.add(hairCap);

    // Front Bangs
    const bangCenterGeo = new THREE.SphereGeometry(0.17, 16, 16);
    bangCenterGeo.scale(1.2, 0.65, 0.4);
    bangCenterGeo.rotateZ(0.1);
    const bangCenter = new THREE.Mesh(bangCenterGeo, hairMat);
    bangCenter.position.set(-0.04, 0.38, 0.52);
    headGroup.add(bangCenter);

    const bangLeftGeo = new THREE.SphereGeometry(0.19, 16, 16);
    bangLeftGeo.scale(1.1, 0.8, 0.45);
    bangLeftGeo.rotateZ(0.35);
    const bangLeft = new THREE.Mesh(bangLeftGeo, hairMat);
    bangLeft.position.set(-0.32, 0.34, 0.48);
    headGroup.add(bangLeft);

    const bangRightGeo = new THREE.SphereGeometry(0.19, 16, 16);
    bangRightGeo.scale(1.1, 0.8, 0.45);
    bangRightGeo.rotateZ(-0.35);
    const bangRight = new THREE.Mesh(bangRightGeo, hairMat);
    bangRight.position.set(0.32, 0.34, 0.48);
    headGroup.add(bangRight);

    // Playful Top Cowlick Swoop
    const cowlickGeo = new THREE.TorusGeometry(0.11, 0.035, 12, 24, Math.PI * 0.9);
    cowlickGeo.rotateZ(0.4);
    const cowlick = new THREE.Mesh(cowlickGeo, hairMat);
    cowlick.position.set(0.04, 0.66, 0.05);
    headGroup.add(cowlick);

    // --- Big Sparkling Disney/Anime Eyes with Natural Blinking Eyelids ---
    const createCuteEye = (xPos: number) => {
      const eyeGroup = new THREE.Group();
      eyeGroup.position.set(xPos, 0.08, 0.50);

      // Sclera (White eye background)
      const eyeBallGeo = new THREE.SphereGeometry(0.13, 24, 24);
      eyeBallGeo.scale(1.0, 1.15, 0.5);
      const eyeBall = new THREE.Mesh(eyeBallGeo, scleraMat);
      eyeGroup.add(eyeBall);

      // Teal Iris
      const irisGeo = new THREE.SphereGeometry(0.088, 20, 20);
      irisGeo.scale(1.0, 1.1, 0.3);
      const iris = new THREE.Mesh(irisGeo, irisMat);
      iris.position.set(0, 0, 0.045);
      eyeGroup.add(iris);

      // Deep Pupil
      const pupilGeo = new THREE.SphereGeometry(0.052, 16, 16);
      pupilGeo.scale(1.0, 1.1, 0.2);
      const pupil = new THREE.Mesh(pupilGeo, pupilMat);
      pupil.position.set(0, 0, 0.065);
      eyeGroup.add(pupil);

      // Triple Specular Highlights (Disney Sparkle)
      const glint1Geo = new THREE.SphereGeometry(0.032, 12, 12);
      const glint1 = new THREE.Mesh(glint1Geo, specHighlightMat);
      glint1.position.set(-0.026, 0.034, 0.085);
      eyeGroup.add(glint1);

      const glint2Geo = new THREE.SphereGeometry(0.015, 10, 10);
      const glint2 = new THREE.Mesh(glint2Geo, specHighlightMat);
      glint2.position.set(0.028, -0.03, 0.085);
      eyeGroup.add(glint2);

      const glint3Geo = new THREE.SphereGeometry(0.010, 8, 8);
      const glint3 = new THREE.Mesh(glint3Geo, specHighlightMat);
      glint3.position.set(-0.008, -0.016, 0.09);
      eyeGroup.add(glint3);

      // Smooth Curved Eyelid for Natural Blinking
      const eyelidGeo = new THREE.SphereGeometry(0.135, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
      eyelidGeo.rotateX(Math.PI / 2);
      const lid = new THREE.Mesh(eyelidGeo, skinMat);
      lid.position.set(0, 0.07, 0.02);
      lid.visible = false;
      eyeGroup.add(lid);

      return { eyeGroup, lid, iris };
    };

    const leftEye = createCuteEye(-0.22);
    const rightEye = createCuteEye(0.22);
    headGroup.add(leftEye.eyeGroup);
    headGroup.add(rightEye.eyeGroup);
    leftEyeLidRef.current = leftEye.lid;
    rightEyeLidRef.current = rightEye.lid;

    // --- Eyebrows ---
    const browGeo = new THREE.CapsuleGeometry(0.02, 0.15, 8, 8);
    browGeo.rotateZ(Math.PI / 2);

    const leftBrow = new THREE.Mesh(browGeo, browMat);
    leftBrow.position.set(-0.22, 0.26, 0.54);
    leftBrow.rotation.z = 0.08;
    headGroup.add(leftBrow);
    leftBrowRef.current = leftBrow;

    const rightBrow = new THREE.Mesh(browGeo, browMat);
    rightBrow.position.set(0.22, 0.26, 0.54);
    rightBrow.rotation.z = -0.08;
    headGroup.add(rightBrow);
    rightBrowRef.current = rightBrow;

    // --- Cute Button Nose ---
    const noseGeo = new THREE.SphereGeometry(0.042, 16, 16);
    const nose = new THREE.Mesh(noseGeo, skinMat);
    nose.position.set(0, -0.02, 0.60);
    headGroup.add(nose);

    // --- Sweet Smiling Human Mouth with Viseme Sync ---
    const mouthGroup = new THREE.Group();
    mouthGroup.position.set(0, -0.16, 0.56);
    headGroup.add(mouthGroup);

    // Resting smile curve
    const smileArcGeo = new THREE.TorusGeometry(0.08, 0.02, 12, 24, Math.PI * 0.9);
    smileArcGeo.rotateZ(Math.PI * 1.05);
    const upperLip = new THREE.Mesh(smileArcGeo, lipMat);
    mouthGroup.add(upperLip);
    mouthRef.current = upperLip;

    // Speaking Viseme
    const lowerLipGeo = new THREE.SphereGeometry(0.06, 16, 16);
    lowerLipGeo.scale(1.2, 0.8, 0.3);
    const lowerLip = new THREE.Mesh(lowerLipGeo, lipMat);
    lowerLip.position.set(0, -0.02, 0);
    mouthGroup.add(lowerLip);
    lowerLipRef.current = lowerLip;

    // --- Rounded Cute Chibi Hands & Gestures ---
    const handGeo = new THREE.SphereGeometry(0.13, 20, 20);
    handGeo.scale(1.0, 1.15, 0.85);

    // Right Arm (Pointing / Conversational)
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(-0.54, 0.82, 0.08);
    characterGroup.add(rightArmGroup);
    rightArmGroupRef.current = rightArmGroup;

    const rightHand = new THREE.Mesh(handGeo, skinMat);
    rightHand.position.set(-0.16, -0.22, 0.22);
    rightArmGroup.add(rightHand);

    // Left Arm (Natural resting / waving)
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(0.54, 0.82, 0.08);
    characterGroup.add(leftArmGroup);
    leftArmGroupRef.current = leftArmGroup;

    const leftHand = new THREE.Mesh(handGeo, skinMat);
    leftHand.position.set(0.16, -0.22, 0.22);
    leftArmGroup.add(leftHand);

    // --- Holographic Base Platform with Gold Accent ---
    const floorGeo = new THREE.CylinderGeometry(1.3, 1.5, 0.08, 36);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x09122c,
      roughness: 0.35,
      metalness: 0.85
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.set(0, -0.15, 0);
    characterGroup.add(floor);

    const auraRingGeo = new THREE.RingGeometry(1.35, 1.45, 36);
    const auraRingMat = new THREE.MeshBasicMaterial({
      color: 0x0f766e,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7
    });
    const auraRing = new THREE.Mesh(auraRingGeo, auraRingMat);
    auraRing.rotation.x = Math.PI / 2;
    auraRing.position.set(0, -0.1, 0);
    characterGroup.add(auraRing);

    // -------------------------------------------------------------
    // ANIMATION LOOP (LIFELIKE ORGANIC PROCEDURAL MOTION)
    // -------------------------------------------------------------
    const clock = new THREE.Clock();
    let blinkTimer = 0;
    let isBlinking = false;

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();
      const currentSpeaking = isSpeakingRef.current;
      const currentState = stateRef.current;

      // 1. Natural Breathing Cycle
      if (characterGroupRef.current) {
        characterGroupRef.current.position.y = Math.sin(time * 1.5) * 0.022;
      }

      // 2. Head Tilt & Expressive Micro-Movements
      if (headGroupRef.current) {
        if (currentSpeaking) {
          // Dynamic conversational nodding & turning towards document
          headGroupRef.current.rotation.x = Math.sin(time * 4.2) * 0.055 - 0.015;
          headGroupRef.current.rotation.y = Math.sin(time * 2.1) * 0.075 - 0.14; // gentle turn toward document on left
          headGroupRef.current.rotation.z = Math.cos(time * 2.6) * 0.025;
        } else if (currentState === 'warning') {
          // Attentive, serious posture
          headGroupRef.current.rotation.x = -0.04;
          headGroupRef.current.rotation.y = THREE.MathUtils.lerp(headGroupRef.current.rotation.y, 0, 0.08);
          headGroupRef.current.rotation.z = Math.sin(time * 2) * 0.01;
        } else {
          // Calm idle tracking
          headGroupRef.current.rotation.x = Math.sin(time * 1.1) * 0.02;
          headGroupRef.current.rotation.y = Math.sin(time * 0.7) * 0.035;
          headGroupRef.current.rotation.z = 0;
        }
      }

      // 3. Eyebrows Expression
      if (leftBrowRef.current && rightBrowRef.current) {
        if (currentState === 'warning') {
          // Slightly lowered/focused brows for medical warning
          leftBrowRef.current.position.y = 0.19;
          leftBrowRef.current.rotation.z = 0.16;
          rightBrowRef.current.position.y = 0.19;
          rightBrowRef.current.rotation.z = -0.16;
        } else if (currentSpeaking) {
          // Naturally animated brows
          const browLift = Math.sin(time * 3) * 0.02;
          leftBrowRef.current.position.y = 0.22 + browLift;
          rightBrowRef.current.position.y = 0.22 + browLift;
        } else {
          leftBrowRef.current.position.y = 0.22;
          leftBrowRef.current.rotation.z = 0.08;
          rightBrowRef.current.position.y = 0.22;
          rightBrowRef.current.rotation.z = -0.08;
        }
      }

      // 4. Natural Eye Blinking (Every ~3.8 seconds)
      blinkTimer += delta;
      if (blinkTimer > 3.8 && !isBlinking) {
        isBlinking = true;
        blinkTimer = 0;
      }

      if (isBlinking) {
        if (leftEyeLidRef.current && rightEyeLidRef.current) {
          leftEyeLidRef.current.visible = true;
          rightEyeLidRef.current.visible = true;
          if (blinkTimer > 0.16) {
            isBlinking = false;
            leftEyeLidRef.current.visible = false;
            rightEyeLidRef.current.visible = false;
          }
        }
      } else {
        if (leftEyeLidRef.current && rightEyeLidRef.current) {
          leftEyeLidRef.current.visible = false;
          rightEyeLidRef.current.visible = false;
        }
      }

      // 5. Dynamic Phonetic Lip-Sync when Speaking
      if (mouthRef.current && lowerLipRef.current) {
        if (currentSpeaking) {
          // Dynamic oscillation simulating realistic speech visemes
          const mouthOpen = (Math.sin(time * 15) * 0.5 + 0.5) * 0.12;
          mouthRef.current.scale.y = 0.45 + mouthOpen * 8;
          mouthRef.current.scale.x = 1.5 - mouthOpen * 3;
          lowerLipRef.current.position.y = -0.04 - mouthOpen * 0.8;
        } else {
          mouthRef.current.scale.y = 0.45;
          mouthRef.current.scale.x = 1.5;
          lowerLipRef.current.position.y = -0.04;
        }
      }

      // 6. Pointing Gestures towards Document
      if (rightArmGroupRef.current) {
        if (currentSpeaking) {
          // Active pointing gesture towards document
          const gestureNod = Math.sin(time * 2.8) * 0.04;
          rightArmGroupRef.current.position.x = -0.52 + gestureNod;
          rightArmGroupRef.current.rotation.y = -0.18 + Math.sin(time * 2) * 0.06;
          rightArmGroupRef.current.rotation.z = Math.sin(time * 2.4) * 0.03;
        } else {
          rightArmGroupRef.current.position.x = THREE.MathUtils.lerp(rightArmGroupRef.current.position.x, -0.52, 0.05);
          rightArmGroupRef.current.rotation.y = THREE.MathUtils.lerp(rightArmGroupRef.current.rotation.y, 0, 0.05);
          rightArmGroupRef.current.rotation.z = THREE.MathUtils.lerp(rightArmGroupRef.current.rotation.z, 0, 0.05);
        }
      }

      // 7. Aura ring rotation
      if (auraRing) {
        auraRing.rotation.z += 0.006;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Mouse Dragging / Touch Orbit
    let isDragging = false;
    let prevMouseX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !characterGroupRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      characterGroupRef.current.rotation.y += deltaX * 0.008;
      prevMouseX = e.clientX;
    };

    const onMouseUp = () => { isDragging = false; };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

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
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }
    };
  }, [attire]);

  const langInfo = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="relative flex flex-col items-center w-full bg-slate-900 rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden backdrop-blur-md">
      {/* Top Header & Assistant Status Bar */}
      <div className="w-full flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/70">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-2xl bg-gradient-to-tr from-teal-500 via-emerald-400 to-amber-400 text-slate-950 font-black shadow-md">
            {attire === 'doctor' ? <Stethoscope className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
            {isSpeaking && (
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold tracking-tight text-white font-sans">
                {title}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/30">
                3D HUMAN GUIDE
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {isSpeaking 
                ? `Explaining in ${langInfo.nativeName}...` 
                : state === 'warning' 
                  ? 'Verify with qualified human' 
                  : subtitle}
            </p>
          </div>
        </div>

        {/* Real-time Audio Waves */}
        {isSpeaking && !isMuted ? (
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-900 border border-teal-500/40">
            <span className="w-1 bg-teal-400 rounded-full h-3 animate-pulse" />
            <span className="w-1 bg-teal-300 rounded-full h-5 animate-pulse delay-75" />
            <span className="w-1 bg-amber-400 rounded-full h-4 animate-pulse delay-150" />
            <span className="w-1 bg-teal-400 rounded-full h-6 animate-pulse delay-100" />
            <span className="w-1 bg-emerald-400 rounded-full h-3 animate-pulse" />
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
            <span>Interactive 3D</span>
          </div>
        )}
      </div>

      {/* 3D WebGL Canvas Container */}
      <div 
        ref={containerRef} 
        className="relative w-full h-[320px] sm:h-[370px] cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950/40 via-slate-900 to-slate-950"
      >
        {/* Soft Radial Studio Spotlight behind Avatar */}
        <div className="absolute inset-0 bg-radial from-teal-500/10 via-transparent to-transparent pointer-events-none" />

        {/* Live Speaking Speech Bubble Overlay */}
        {isSpeaking && (
          <div className="absolute bottom-3 left-4 right-4 z-20 pointer-events-none transition-all duration-300">
            <div className="p-3.5 rounded-2xl bg-slate-950/95 border border-teal-500/50 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-300 font-mono">
                  {title} Speaking ({langInfo.nativeName}):
                </span>
              </div>
              <p className="text-xs font-semibold text-white leading-relaxed line-clamp-3">
                "{activeSentence || spokenScript}"
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Synchronized Pointer Notice */}
      <div className="w-full px-4 py-2 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="text-teal-400 font-bold">👉 Pointing to:</span>
          <span className="font-semibold text-white truncate max-w-[240px] sm:max-w-xs">
            {state === 'warning' ? 'Important Verification Alert' : 'Active Document Findings'}
          </span>
        </div>
        <button
          onClick={() => {
            if (characterGroupRef.current) characterGroupRef.current.rotation.y = 0;
          }}
          className="text-[11px] text-slate-400 hover:text-white transition-colors"
          title="Reset 3D Avatar View Angle"
        >
          Reset View
        </button>
      </div>

      {/* Control Bar */}
      <div className="w-full p-3.5 bg-slate-900/95 border-t border-slate-800 flex flex-col gap-2.5">
        {/* Primary Play/Pause Controls */}
        <div className="flex items-center justify-between gap-2">
          {/* Main Play / Pause Button */}
          <button
            onClick={onToggleSpeech}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all bg-gradient-to-r from-teal-500 via-emerald-400 to-amber-400 text-slate-950 shadow-lg hover:shadow-teal-500/25 active:scale-98"
          >
            {isSpeaking ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause Explanation</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current ml-0.5" />
                <span>Listen to 3D Explainer</span>
              </>
            )}
          </button>

          {/* Replay */}
          <button
            onClick={onReplaySpeech}
            className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 transition-all"
            title="Replay Voice Explanation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Secondary Bar: Mute, Speed, Language Picker */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800">
          {/* Mute Toggle */}
          {onToggleMute && (
            <button
              onClick={onToggleMute}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isMuted 
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                  : 'bg-slate-800 hover:bg-slate-750 text-slate-200'
              }`}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-teal-400" />}
              <span className="text-[11px]">{isMuted ? 'Muted' : 'Voice'}</span>
            </button>
          )}

          {/* Speed Controls */}
          {onSpeedChange && (
            <div className="flex items-center bg-slate-800 rounded-xl p-0.5 text-[11px] font-mono">
              {[0.8, 1.0, 1.2].map(speed => (
                <button
                  key={speed}
                  onClick={() => onSpeedChange(speed)}
                  className={`px-2 py-1 rounded-lg font-bold transition-all ${
                    playbackSpeed === speed 
                      ? 'bg-teal-500 text-slate-950 shadow-xs' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          )}

          {/* Language Selector */}
          {onLanguageChange && (
            <div className="relative">
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
                className="appearance-none bg-slate-800 hover:bg-slate-750 text-white text-[11px] font-bold py-1.5 pl-7 pr-4 rounded-xl border border-slate-700 focus:outline-none focus:border-teal-400 cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
              <Globe className="w-3.5 h-3.5 text-teal-400 absolute left-2 top-2.5 pointer-events-none" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
