import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';

export type MiloMood = 'idle' | 'welcoming' | 'thinking' | 'speaking' | 'calm' | 'error';

export interface MiloAssistant3DProps {
  mood?: MiloMood;
  isSpeaking?: boolean;
  activeSentence?: string;
  onToggleSpeech?: () => void;
  onReplaySpeech?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
  playbackSpeed?: number;
  onSpeedChange?: (speed: number) => void;
  className?: string;
  compact?: boolean;
  showControls?: boolean;
}

/**
 * Milo 3D Assistant — Soooo Cute Human Chibi Assistant
 * A lovable, Pixar/Disney chibi 3D human doctor character for DocuEase AI.
 * Warm peach skin, rosy blushing cheeks, big expressive anime eyes with dual specular highlights,
 * natural blinking eyelids, cute button nose, smiling animated mouth with speech visemes,
 * styled espresso haircut with soft bangs, chibi doctor coat + miniature stethoscope,
 * and conversational animated gesturing hands.
 */
export const MiloAssistant3D: React.FC<MiloAssistant3DProps> = ({
  mood = 'idle',
  isSpeaking = false,
  activeSentence,
  onToggleSpeech,
  onReplaySpeech,
  isMuted = false,
  onToggleMute,
  playbackSpeed = 1,
  onSpeedChange,
  className = '',
  compact = false,
  showControls = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  // Synchronized refs for the 60fps animation loop
  const moodRef = useRef(mood);
  moodRef.current = mood;
  const isSpeakingRef = useRef(isSpeaking);
  isSpeakingRef.current = isSpeaking;

  // Mouse tracking for interactive head look-at
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current = {
        x: (e.clientX / innerWidth) * 2 - 1,
        y: -(e.clientY / innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    const width = container.clientWidth || 320;
    const height = container.clientHeight || (compact ? 240 : 340);

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.45, 4.0);

    // 2. Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'default' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL initialization failed, using cute fallback:', e);
      setWebGlSupported(false);
      return;
    }

    // 3. Studio Character Lighting (Flattering Pixar Soft Lighting)
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.3);
    scene.add(ambientLight);

    // Key Light (Warm soft face illuminator)
    const keyLight = new THREE.DirectionalLight(0xffedd5, 2.2);
    keyLight.position.set(2.2, 3.5, 3.5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Cool Soft Fill Light (Gentle teal-mint depth)
    const fillLight = new THREE.DirectionalLight(0xa5f3fc, 1.4);
    fillLight.position.set(-2.8, 1.8, 2.5);
    scene.add(fillLight);

    // Golden / Mint Rim Light (Hair halo & shoulder rim)
    const rimLight = new THREE.DirectionalLight(0x2dd4bf, 2.0);
    rimLight.position.set(0, 4.0, -3.0);
    scene.add(rimLight);

    // Soft Upward Bounce Light
    const bounceLight = new THREE.DirectionalLight(0xfffbeb, 0.7);
    bounceLight.position.set(0, -1.8, 2.2);
    scene.add(bounceLight);

    // 4. Materials (Soft Peach Chibi Human Palette)
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xffdfd0, // Soft warm peach chibi complexion
      roughness: 0.52,
      metalness: 0.02,
    });

    const blushMat = new THREE.MeshStandardMaterial({
      color: 0xfb7185, // Cute rosy blush
      roughness: 0.8,
      transparent: true,
      opacity: 0.72,
    });

    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x241610, // Warm rich espresso brown
      roughness: 0.65,
      metalness: 0.08,
    });

    const scleraMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const irisMat = new THREE.MeshStandardMaterial({
      color: 0x0f766e, // Deep luminous oceanic teal iris
      roughness: 0.25,
      metalness: 0.1,
    });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x09090b });
    const specHighlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const lipMat = new THREE.MeshStandardMaterial({
      color: 0xf472b6, // Soft rosy cute lips
      roughness: 0.42,
      metalness: 0.02,
    });

    const innerMouthMat = new THREE.MeshBasicMaterial({ color: 0x881337 });

    const browMat = new THREE.MeshStandardMaterial({
      color: 0x1f140e,
      roughness: 0.85,
    });

    const coatMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc, // Crisp white chibi doctor coat
      roughness: 0.5,
      metalness: 0.05,
    });

    const scrubMat = new THREE.MeshStandardMaterial({
      color: 0x0d9488, // Teal medical scrub collar
      roughness: 0.4,
      metalness: 0.1,
    });

    const stethTubingMat = new THREE.MeshStandardMaterial({
      color: 0x14b8a6,
      roughness: 0.35,
      metalness: 0.25,
    });

    const stethChromeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.15,
      metalness: 0.92,
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.2,
      metalness: 0.85,
    });

    // 5. Milo Human Character Hierarchy
    const miloGroup = new THREE.Group();
    scene.add(miloGroup);

    // --- Torso & Attire ---
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, -0.32, 0);
    miloGroup.add(torsoGroup);

    // Main Doctor Lab Coat (Soft rounded chibi torso)
    const coatGeo = new THREE.CylinderGeometry(0.5, 0.42, 0.88, 32);
    const coat = new THREE.Mesh(coatGeo, coatMat);
    coat.castShadow = true;
    coat.receiveShadow = true;
    torsoGroup.add(coat);

    // Inner Teal V-Neck Scrub Shirt
    const scrubGeo = new THREE.BoxGeometry(0.24, 0.26, 0.1);
    const scrub = new THREE.Mesh(scrubGeo, scrubMat);
    scrub.position.set(0, 0.32, 0.44);
    torsoGroup.add(scrub);

    // Coat Lapels
    const lapelLeftGeo = new THREE.BoxGeometry(0.12, 0.38, 0.04);
    lapelLeftGeo.rotateZ(0.22);
    const lapelLeft = new THREE.Mesh(lapelLeftGeo, coatMat);
    lapelLeft.position.set(-0.16, 0.24, 0.47);
    torsoGroup.add(lapelLeft);

    const lapelRightGeo = new THREE.BoxGeometry(0.12, 0.38, 0.04);
    lapelRightGeo.rotateZ(-0.22);
    const lapelRight = new THREE.Mesh(lapelRightGeo, coatMat);
    lapelRight.position.set(0.16, 0.24, 0.47);
    torsoGroup.add(lapelRight);

    // Cute Miniature Stethoscope around Neck
    const stethLoopGeo = new THREE.TorusGeometry(0.36, 0.032, 16, 32, Math.PI * 1.15);
    stethLoopGeo.rotateX(Math.PI / 2.2);
    stethLoopGeo.rotateZ(-Math.PI * 0.08);
    const stethLoop = new THREE.Mesh(stethLoopGeo, stethTubingMat);
    stethLoop.position.set(0, 0.36, 0.14);
    torsoGroup.add(stethLoop);

    // Stethoscope Hanging Bell / Chest Piece
    const stethChestGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.03, 24);
    stethChestGeo.rotateX(Math.PI / 2);
    const stethChest = new THREE.Mesh(stethChestGeo, stethChromeMat);
    stethChest.position.set(0.08, 0.06, 0.48);
    torsoGroup.add(stethChest);

    // Cute ID Badge / Assistant Emblem
    const badgeGeo = new THREE.BoxGeometry(0.11, 0.15, 0.02);
    const badge = new THREE.Mesh(badgeGeo, goldMat);
    badge.position.set(-0.26, 0.12, 0.46);
    torsoGroup.add(badge);

    // --- Neck ---
    const neckGeo = new THREE.CylinderGeometry(0.18, 0.2, 0.22, 24);
    const neck = new THREE.Mesh(neckGeo, skinMat);
    neck.position.set(0, 0.18, 0);
    miloGroup.add(neck);

    // --- Head Group ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.62, 0);
    miloGroup.add(headGroup);

    // Cute Rounded Chibi Head
    const headGeo = new THREE.SphereGeometry(0.64, 32, 32);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.scale.set(1.06, 1.0, 1.02);
    head.castShadow = true;
    headGroup.add(head);

    // Rosy Blushing Cheeks (Kawaii Chibi Discs)
    const cheekGeo = new THREE.SphereGeometry(0.13, 16, 16);
    cheekGeo.scale(1.2, 0.7, 0.3);

    const leftCheek = new THREE.Mesh(cheekGeo, blushMat);
    leftCheek.position.set(-0.36, -0.07, 0.55);
    headGroup.add(leftCheek);

    const rightCheek = new THREE.Mesh(cheekGeo, blushMat);
    rightCheek.position.set(0.36, -0.07, 0.55);
    headGroup.add(rightCheek);

    // --- Big Sparkling Disney/Anime Eyes ---
    const buildEye = (isLeft: boolean) => {
      const eyeGroup = new THREE.Group();
      eyeGroup.position.set(isLeft ? -0.23 : 0.23, 0.09, 0.54);

      // Sclera (White eye background)
      const scleraGeo = new THREE.SphereGeometry(0.135, 24, 24);
      scleraGeo.scale(1.0, 1.15, 0.5);
      const sclera = new THREE.Mesh(scleraGeo, scleraMat);
      eyeGroup.add(sclera);

      // Teal Iris
      const irisGeo = new THREE.SphereGeometry(0.092, 20, 20);
      irisGeo.scale(1.0, 1.1, 0.3);
      const iris = new THREE.Mesh(irisGeo, irisMat);
      iris.position.set(0, 0, 0.05);
      eyeGroup.add(iris);

      // Deep Pupil
      const pupilGeo = new THREE.SphereGeometry(0.055, 16, 16);
      pupilGeo.scale(1.0, 1.1, 0.2);
      const pupil = new THREE.Mesh(pupilGeo, pupilMat);
      pupil.position.set(0, 0, 0.07);
      eyeGroup.add(pupil);

      // Specular Highlight #1: Big Soulful Reflection Dot (Top-Right)
      const specGeo1 = new THREE.SphereGeometry(0.034, 12, 12);
      const spec1 = new THREE.Mesh(specGeo1, specHighlightMat);
      spec1.position.set(-0.028, 0.036, 0.09);
      eyeGroup.add(spec1);

      // Specular Highlight #2: Little Twinkle Dot (Bottom-Left)
      const specGeo2 = new THREE.SphereGeometry(0.016, 10, 10);
      const spec2 = new THREE.Mesh(specGeo2, specHighlightMat);
      spec2.position.set(0.03, -0.032, 0.09);
      eyeGroup.add(spec2);

      // Specular Highlight #3: Micro Sparkle (Center)
      const specGeo3 = new THREE.SphereGeometry(0.010, 8, 8);
      const spec3 = new THREE.Mesh(specGeo3, specHighlightMat);
      spec3.position.set(-0.01, -0.018, 0.095);
      eyeGroup.add(spec3);

      // Eyelid for Natural Blinking
      const eyelidGeo = new THREE.SphereGeometry(0.14, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
      eyelidGeo.rotateX(Math.PI / 2);
      const eyelid = new THREE.Mesh(eyelidGeo, skinMat);
      eyelid.position.set(0, 0.08, 0.02);
      eyelid.visible = false;
      eyeGroup.add(eyelid);

      return { eyeGroup, eyelid, iris, pupil };
    };

    const leftEye = buildEye(true);
    headGroup.add(leftEye.eyeGroup);

    const rightEye = buildEye(false);
    headGroup.add(rightEye.eyeGroup);

    // --- Eyebrows ---
    const browGeo = new THREE.CapsuleGeometry(0.022, 0.16, 8, 8);
    browGeo.rotateZ(Math.PI / 2);

    const leftBrow = new THREE.Mesh(browGeo, browMat);
    leftBrow.position.set(-0.24, 0.28, 0.58);
    leftBrow.rotation.z = 0.08;
    headGroup.add(leftBrow);

    const rightBrow = new THREE.Mesh(browGeo, browMat);
    rightBrow.position.set(0.24, 0.28, 0.58);
    rightBrow.rotation.z = -0.08;
    headGroup.add(rightBrow);

    // --- Cute Button Nose ---
    const noseGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const nose = new THREE.Mesh(noseGeo, skinMat);
    nose.position.set(0, -0.02, 0.65);
    headGroup.add(nose);

    // --- Sweet Smiling Human Mouth ---
    const mouthGroup = new THREE.Group();
    mouthGroup.position.set(0, -0.18, 0.60);
    headGroup.add(mouthGroup);

    // Resting smile curve (Torus arc)
    const smileArcGeo = new THREE.TorusGeometry(0.085, 0.022, 12, 24, Math.PI * 0.9);
    smileArcGeo.rotateZ(Math.PI * 1.05);
    const smileArc = new THREE.Mesh(smileArcGeo, lipMat);
    mouthGroup.add(smileArc);

    // Speaking Viseme Inner Mouth (Scales dynamically during speech)
    const visemeGeo = new THREE.SphereGeometry(0.065, 16, 16);
    visemeGeo.scale(1.2, 0.8, 0.3);
    const viseme = new THREE.Mesh(visemeGeo, innerMouthMat);
    viseme.position.set(0, -0.02, 0.01);
    viseme.scale.set(0, 0, 0);
    mouthGroup.add(viseme);

    // --- Cute Stylized Human Chibi Haircut ---
    const hairGroup = new THREE.Group();
    headGroup.add(hairGroup);

    // Back Hair Shell
    const hairCapGeo = new THREE.SphereGeometry(0.67, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.65);
    hairCapGeo.rotateX(-0.35);
    const hairCap = new THREE.Mesh(hairCapGeo, hairMat);
    hairCap.position.set(0, 0.06, -0.06);
    hairGroup.add(hairCap);

    // Cute Front Bangs (Center & Side Tufts)
    const bangCenterGeo = new THREE.SphereGeometry(0.18, 16, 16);
    bangCenterGeo.scale(1.2, 0.65, 0.4);
    bangCenterGeo.rotateZ(0.1);
    const bangCenter = new THREE.Mesh(bangCenterGeo, hairMat);
    bangCenter.position.set(-0.05, 0.42, 0.55);
    hairGroup.add(bangCenter);

    const bangLeftGeo = new THREE.SphereGeometry(0.2, 16, 16);
    bangLeftGeo.scale(1.1, 0.8, 0.45);
    bangLeftGeo.rotateZ(0.35);
    const bangLeft = new THREE.Mesh(bangLeftGeo, hairMat);
    bangLeft.position.set(-0.34, 0.36, 0.51);
    hairGroup.add(bangLeft);

    const bangRightGeo = new THREE.SphereGeometry(0.2, 16, 16);
    bangRightGeo.scale(1.1, 0.8, 0.45);
    bangRightGeo.rotateZ(-0.35);
    const bangRight = new THREE.Mesh(bangRightGeo, hairMat);
    bangRight.position.set(0.34, 0.36, 0.51);
    hairGroup.add(bangRight);

    // Playful Top Cowlick / Chibi Hair Swoop
    const cowlickGeo = new THREE.TorusGeometry(0.12, 0.038, 12, 24, Math.PI * 0.9);
    cowlickGeo.rotateZ(0.4);
    const cowlick = new THREE.Mesh(cowlickGeo, hairMat);
    cowlick.position.set(0.04, 0.72, 0.05);
    hairGroup.add(cowlick);

    // Cute Chibi Ears
    const earGeo = new THREE.SphereGeometry(0.11, 16, 16);
    earGeo.scale(0.6, 1.0, 0.8);

    const leftEar = new THREE.Mesh(earGeo, skinMat);
    leftEar.position.set(-0.66, 0.04, 0.02);
    headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, skinMat);
    rightEar.position.set(0.66, 0.04, 0.02);
    headGroup.add(rightEar);

    // --- Cute Chibi Hands ---
    const handGeo = new THREE.SphereGeometry(0.14, 20, 20);
    handGeo.scale(1.0, 1.15, 0.85);

    // Left Hand
    const leftHandGroup = new THREE.Group();
    leftHandGroup.position.set(-0.68, -0.28, 0.22);
    miloGroup.add(leftHandGroup);
    const leftHand = new THREE.Mesh(handGeo, skinMat);
    leftHandGroup.add(leftHand);

    // Right Hand (Conversational & Waving)
    const rightHandGroup = new THREE.Group();
    rightHandGroup.position.set(0.68, -0.28, 0.22);
    miloGroup.add(rightHandGroup);
    const rightHand = new THREE.Mesh(handGeo, skinMat);
    rightHandGroup.add(rightHand);

    // Soft Shadow Floor
    const shadowGeo = new THREE.CircleGeometry(0.85, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x0f172a,
      transparent: true,
      opacity: 0.14,
    });
    const shadowFloor = new THREE.Mesh(shadowGeo, shadowMat);
    shadowFloor.rotation.x = -Math.PI / 2;
    shadowFloor.position.y = -1.18;
    scene.add(shadowFloor);

    // 6. Interactive 60fps Animation Loop
    let animationId: number;
    const startTime = performance.now();
    let blinkTimer = 0;
    let isBlinking = false;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) / 1000;
      const currentMood = moodRef.current;
      const isSpeakingNow = isSpeakingRef.current;

      // Natural Human Breathing & Floating Physics
      const hoverFreq = currentMood === 'thinking' ? 2.8 : 1.8;
      const hoverAmp = currentMood === 'thinking' ? 0.03 : 0.055;
      miloGroup.position.y = Math.sin(elapsedTime * hoverFreq) * hoverAmp;
      shadowFloor.scale.setScalar(1 - Math.sin(elapsedTime * hoverFreq) * 0.08);

      // Smooth Head Tracking toward User Cursor
      const targetLookX = mouseRef.current.x * 0.26;
      const targetLookY = mouseRef.current.y * 0.18;
      headGroup.rotation.y += (targetLookX - headGroup.rotation.y) * 0.08;
      headGroup.rotation.x += (-targetLookY - headGroup.rotation.x) * 0.08;

      // Dynamic Eye Look Follow
      leftEye.iris.position.x = mouseRef.current.x * 0.02;
      leftEye.iris.position.y = mouseRef.current.y * 0.02;
      rightEye.iris.position.x = mouseRef.current.x * 0.02;
      rightEye.iris.position.y = mouseRef.current.y * 0.02;

      // Natural Human Blinking Logic
      blinkTimer += 0.016;
      if (blinkTimer > 3.8 && !isBlinking) {
        isBlinking = true;
        blinkTimer = 0;
      }

      if (isBlinking) {
        leftEye.eyelid.visible = true;
        rightEye.eyelid.visible = true;
        if (blinkTimer > 0.16) {
          isBlinking = false;
          leftEye.eyelid.visible = false;
          rightEye.eyelid.visible = false;
        }
      } else {
        leftEye.eyelid.visible = false;
        rightEye.eyelid.visible = false;
      }

      // Mood Adjustments & Expressive Gestures
      if (currentMood === 'welcoming') {
        // Joyful Wave with Right Hand & Inquisitive Head Tilt
        headGroup.rotation.z = Math.sin(elapsedTime * 2.0) * 0.04;
        rightHandGroup.position.set(
          0.72 + Math.cos(elapsedTime * 6) * 0.04,
          0.32 + Math.sin(elapsedTime * 6) * 0.12,
          0.38
        );
        rightHandGroup.rotation.z = Math.sin(elapsedTime * 6) * 0.25;
        leftHandGroup.position.set(-0.68, -0.28 + Math.sin(elapsedTime * 2) * 0.02, 0.22);
        leftBrow.position.y = 0.30;
        rightBrow.position.y = 0.30;
      } else if (currentMood === 'thinking') {
        // Pensive Head Tilt, Hand on Chin
        headGroup.rotation.z = 0.12;
        leftHandGroup.position.set(
          -0.34 + Math.sin(elapsedTime * 2) * 0.01,
          0.18 + Math.cos(elapsedTime * 2) * 0.01,
          0.48
        );
        rightHandGroup.position.set(0.65, -0.32, 0.2);
        leftBrow.position.y = 0.26;
        rightBrow.position.y = 0.31; // Asymmetric pensive eyebrows!
      } else if (currentMood === 'error') {
        // Concerned Head Tilt & Lowered Eyebrows
        headGroup.rotation.z = -0.1;
        leftBrow.position.y = 0.24;
        rightBrow.position.y = 0.24;
        leftBrow.rotation.z = -0.15;
        rightBrow.rotation.z = 0.15;
      } else {
        // Calm / Idle
        leftBrow.position.y = 0.28;
        rightBrow.position.y = 0.28;
        leftBrow.rotation.z = 0.08;
        rightBrow.rotation.z = -0.08;
        headGroup.rotation.z = 0;
        leftHandGroup.position.set(-0.68, -0.28 + Math.sin(elapsedTime * 2) * 0.025, 0.22);
        rightHandGroup.position.set(0.68, -0.28 + Math.sin(elapsedTime * 2 + 1) * 0.025, 0.22);
      }

      // Speech Animation (Natural Chibi Visemes & Conversational Cadence)
      if (isSpeakingNow) {
        // Gentle Head Bobbing along with Speech Cadence
        headGroup.position.y = 0.62 + Math.sin(elapsedTime * 11) * 0.016;

        // Animated Mouth Viseme (Opens and closes naturally)
        const mouthScaleY = Math.max(0.2, Math.abs(Math.sin(elapsedTime * 13)) * 1.3);
        const mouthScaleX = 0.9 + Math.abs(Math.cos(elapsedTime * 13)) * 0.4;
        viseme.scale.set(mouthScaleX, mouthScaleY, 1.0);

        // Conversational Hand Emphasis Gestures
        rightHandGroup.position.set(
          0.62 + Math.sin(elapsedTime * 7) * 0.06,
          -0.12 + Math.cos(elapsedTime * 7) * 0.08,
          0.36
        );
        rightHandGroup.rotation.z = Math.sin(elapsedTime * 7) * 0.18;
      } else {
        headGroup.position.y = 0.62;
        viseme.scale.set(0, 0, 0); // Resting sweet smile
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || (compact ? 240 : 340);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      try {
        renderer.dispose();
        scene.clear();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      } catch { /* ignore */ }
    };
  }, [compact]);

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      aria-label={`Milo 3D Assistant: ${isSpeaking ? 'Speaking' : mood}`}
      role="region"
    >
      {/* 3D Canvas / Cute Chibi Fallback Container */}
      <div className={`w-full ${compact ? 'h-56' : 'h-80 md:h-96'} relative flex items-center justify-center`}>
        {webGlSupported ? (
          <div ref={mountRef} className="w-full h-full relative flex items-center justify-center" />
        ) : (
          // Adorable Vector Illustration Fallback if WebGL is unavailable
          <div className="flex flex-col items-center justify-center p-6 text-center animate-pulse-subtle">
            <div className="relative w-28 h-28 mb-3 flex items-center justify-center">
              {/* Soft Radial Ambient Aura */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-400/20 via-pink-400/20 to-amber-300/20 blur-xl" />
              
              {/* Cute Chibi Human Avatar Illustration */}
              <svg viewBox="0 0 120 120" className="w-28 h-28 drop-shadow-md">
                {/* Hair Back */}
                <ellipse cx="60" cy="52" rx="38" ry="34" fill="#241610" />
                {/* Ears */}
                <circle cx="26" cy="60" r="7" fill="#ffdfd0" />
                <circle cx="94" cy="60" r="7" fill="#ffdfd0" />
                {/* Cute Round Chibi Head */}
                <circle cx="60" cy="58" r="32" fill="#ffdfd0" />
                {/* Cheeks (Kawaii Blush) */}
                <ellipse cx="40" cy="66" rx="6" ry="3.5" fill="#fb7185" opacity="0.8" />
                <ellipse cx="80" cy="66" rx="6" ry="3.5" fill="#fb7185" opacity="0.8" />
                {/* Front Hair Bangs */}
                <path d="M 28 50 C 35 34, 85 34, 92 50 C 80 44, 68 46, 60 52 C 52 46, 40 44, 28 50 Z" fill="#241610" />
                {/* Big Anime Eyes */}
                {/* Left Eye */}
                <circle cx="44" cy="56" r="6.5" fill="#0f766e" />
                <circle cx="44" cy="56" r="3.5" fill="#09090b" />
                <circle cx="42" cy="54" r="1.8" fill="#ffffff" />
                <circle cx="46" cy="58" r="0.9" fill="#ffffff" />
                {/* Right Eye */}
                <circle cx="76" cy="56" r="6.5" fill="#0f766e" />
                <circle cx="76" cy="56" r="3.5" fill="#09090b" />
                <circle cx="74" cy="54" r="1.8" fill="#ffffff" />
                <circle cx="78" cy="58" r="0.9" fill="#ffffff" />
                {/* Cute Button Nose */}
                <circle cx="60" cy="62" r="1.5" fill="#f43f5e" opacity="0.6" />
                {/* Sweet Smiling Mouth */}
                <path d="M 54 69 Q 60 75 66 69" stroke="#f472b6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                {/* Doctor Coat Collar */}
                <path d="M 38 88 L 60 98 L 82 88 L 86 115 L 34 115 Z" fill="#f8fafc" />
                {/* Inner Teal Scrub */}
                <path d="M 52 92 L 60 98 L 68 92 Z" fill="#0d9488" />
                {/* Stethoscope */}
                <path d="M 46 88 Q 60 102 74 88" stroke="#14b8a6" strokeWidth="2.5" fill="none" />
                <circle cx="60" cy="103" r="3.5" fill="#e2e8f0" stroke="#0d9488" strokeWidth="1" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-800">Milo</p>
            <p className="text-xs text-slate-500">{isSpeaking ? 'Speaking in your language...' : 'Ready to explain'}</p>
          </div>
        )}
      </div>

      {/* Status Badge & Accessible Caption */}
      <div className="w-full max-w-sm px-4 mt-1 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 border border-teal-100 shadow-sm text-xs font-semibold text-teal-800 backdrop-blur-sm">
          <span
            className={`w-2 h-2 rounded-full ${
              isSpeaking
                ? 'bg-emerald-500 animate-pulse'
                : mood === 'thinking'
                ? 'bg-blue-500 animate-spin'
                : mood === 'error'
                ? 'bg-amber-500'
                : 'bg-teal-500'
            }`}
          />
          <span className="font-bold tracking-tight">Milo</span>
          <span className="text-slate-300 font-normal">|</span>
          <span className="text-slate-600 font-normal capitalize">
            {isSpeaking
              ? 'Speaking'
              : mood === 'thinking'
              ? 'Analyzing document...'
              : mood === 'welcoming'
              ? 'Ready to guide you'
              : mood === 'calm'
              ? 'Standing by'
              : 'AI Assistant'}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-teal-600 ml-0.5" />
        </div>

        {/* Live Subtitle Snippet */}
        {activeSentence && (
          <div className="w-full mt-2.5 p-2.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs leading-relaxed text-center shadow-lg border border-slate-700/60 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <p className="line-clamp-2 italic font-medium">"{activeSentence}"</p>
          </div>
        )}

        {/* Optional Embedded Audio Controls */}
        {showControls && onToggleSpeech && (
          <div className="flex items-center gap-2 mt-3 px-3 py-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <button
              onClick={onToggleSpeech}
              className={`p-2 rounded-xl flex items-center justify-center transition-all ${
                isSpeaking
                  ? 'bg-amber-500 text-white hover:bg-amber-600'
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}
              title={isSpeaking ? 'Pause' : 'Play'}
              aria-label={isSpeaking ? 'Pause narration' : 'Play narration'}
            >
              {isSpeaking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            {onReplaySpeech && (
              <button
                onClick={onReplaySpeech}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                title="Replay from beginning"
                aria-label="Replay speech"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            {onToggleMute && (
              <button
                onClick={onToggleMute}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
                aria-label={isMuted ? 'Unmute speech' : 'Mute speech'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
              </button>
            )}

            {onSpeedChange && (
              <div className="flex items-center gap-1 ml-1 text-xs">
                {[0.75, 1, 1.25].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => onSpeedChange(spd)}
                    className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                      playbackSpeed === spd
                        ? 'bg-teal-100 text-teal-800'
                        : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MiloAssistant3D;
