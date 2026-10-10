import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  Heart,
  Activity,
  Smile
} from 'lucide-react';
import { SupportedLanguage } from '../types/medscript';

export type KrishMood = 'idle' | 'greeting' | 'thinking' | 'speaking' | 'error' | 'review' | 'success';

export interface KrishXTattvaAvatarProps {
  mood?: KrishMood;
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
  language?: SupportedLanguage;
  characterTitle?: string;
}

/**
 * DocuBot (Milo) — 3D Cute Robot-Doctor Mascot
 * 
 * An adorable, friendly teal-and-white 3D AI healthcare companion rendered with Three.js WebGL:
 * - Glossy pearl-white and pastel-teal medical chassis with soft studio lighting.
 * - Curved obsidian glass visor with big expressive glowing cyan anime eyes.
 * - Natural blinking, smiling, and mouse-gaze tracking.
 * - Tiny silver chrome stethoscope around the neck with chestpiece.
 * - Medical assistant badge with a gentle pulsing heartbeat indicator.
 * - Floating magnetic hands that wave cheerfully and gesture while talking.
 * - Real-time lip-sync waveform smile synchronized with Google Translate audio speech!
 */
export const KrishXTattvaAvatar: React.FC<KrishXTattvaAvatarProps> = ({
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
  showControls = true,
  language = 'en',
  characterTitle = 'Dr. Krish (AI Doctor)',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const [localSpeaking, setLocalSpeaking] = useState(isSpeaking);

  // Synchronized state refs for 60fps WebGL animation loop
  const moodRef = useRef(mood);
  moodRef.current = mood;
  const isSpeakingRef = useRef(isSpeaking || localSpeaking);
  isSpeakingRef.current = isSpeaking || localSpeaking;

  // Mouse look-at tracking
  const mouseRef = useRef({ x: 0, y: 0 });

  // Listen to global TTS speaking events from SpeechManager
  useEffect(() => {
    const handleSpeakingEvent = (e: any) => {
      if (e.detail) {
        setLocalSpeaking(Boolean(e.detail.isSpeaking));
      }
    };
    window.addEventListener('docubot:speaking', handleSpeakingEvent);
    return () => window.removeEventListener('docubot:speaking', handleSpeakingEvent);
  }, []);

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

    // 1. Scene, Camera, Renderer Setup
    const width = container.clientWidth || 320;
    const height = container.clientHeight || (compact ? 240 : 360);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf0fdfa, 0.05);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 3.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.replaceChildren(renderer.domElement);

    // 2. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Key Light: Warm soft sunlight from upper-right
    const keyLight = new THREE.DirectionalLight(0xfffaed, 2.2);
    keyLight.position.set(2.5, 4, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Fill Light: Soft cyan bounce light from lower-left
    const fillLight = new THREE.DirectionalLight(0xccfbf1, 1.2);
    fillLight.position.set(-2.5, 1, 2);
    scene.add(fillLight);

    // Rim Light: Crisp mint accent rim light from behind
    const rimLight = new THREE.DirectionalLight(0x14b8a6, 2.0);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    // Soft Chest Pulse Glow (Heart monitor)
    const chestPulseLight = new THREE.PointLight(0x2dd4bf, 1.5, 2.5);
    chestPulseLight.position.set(0, -0.15, 0.5);
    scene.add(chestPulseLight);

    // 3. High-Quality Materials
    // 3. High-Quality Human Healthcare Materials
    // Soft Warm Human Skin Tone
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xfbdac2, // Warm natural peach skin
      roughness: 0.58,
      metalness: 0.04,
    });

    // Rosy Blushing Cheeks
    const blushMaterial = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      roughness: 0.6,
      transparent: true,
      opacity: 0.32,
    });

    // Dark Stylish Anime Hair
    const hairMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f1917, // Deep natural dark hair
      roughness: 0.65,
      metalness: 0.08,
    });

    // Crisp White Doctor Lab Coat
    const coatMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.28,
      metalness: 0.02,
    });

    // Medical Teal Scrubs (Underneath Lab Coat)
    const scrubsMaterial = new THREE.MeshStandardMaterial({
      color: 0x0d9488, // #0D9488 fresh clinical teal
      roughness: 0.38,
      metalness: 0.08,
    });

    // Chrome Metallic Stethoscope
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.15,
      metalness: 0.92,
    });

    // Stethoscope Rubber Tubing (Deep Teal-Slate)
    const tubeMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f766e,
      roughness: 0.45,
      metalness: 0.05,
    });

    // Anime Eye Materials
    const scleraMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const irisMaterial = new THREE.MeshBasicMaterial({ color: 0x451a03 }); // Warm hazel/brown
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x0f172a }); // Deep pupil
    const highlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Specular highlights
    const eyebrowMaterial = new THREE.MeshBasicMaterial({ color: 0x1f1917 });
    const heartGlowMaterial = new THREE.MeshBasicMaterial({ color: 0xef4444 }); // Doctor red cross

    // 4. Constructing 3D Human Doctor Mesh Tree
    const robotRoot = new THREE.Group();
    scene.add(robotRoot);

    // Ground Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(1.6, 1.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x0f766e,
      transparent: true,
      opacity: 0.14,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.15;
    scene.add(shadowMesh);

    // --- BODY: DOCTOR LAB COAT & SCRUBS ---
    const bodyGroup = new THREE.Group();
    bodyGroup.position.set(0, -0.35, 0);
    robotRoot.add(bodyGroup);

    // Torso: Lab Coat Body
    const torsoGeo = new THREE.SphereGeometry(0.52, 32, 32);
    torsoGeo.scale(0.96, 1.15, 0.9);
    const torsoMesh = new THREE.Mesh(torsoGeo, coatMaterial);
    torsoMesh.castShadow = true;
    bodyGroup.add(torsoMesh);

    // Teal Scrubs Shirt (Visible at Chest V-Neck)
    const scrubsGeo = new THREE.CylinderGeometry(0.24, 0.32, 0.42, 16);
    scrubsGeo.scale(1.0, 1.0, 0.6);
    const scrubsMesh = new THREE.Mesh(scrubsGeo, scrubsMaterial);
    scrubsMesh.position.set(0, 0.18, 0.35);
    bodyGroup.add(scrubsMesh);

    // Lab Coat Left & Right Lapels
    const lapelGeo = new THREE.BoxGeometry(0.12, 0.45, 0.05);
    const leftLapel = new THREE.Mesh(lapelGeo, coatMaterial);
    leftLapel.position.set(0.16, 0.14, 0.42);
    leftLapel.rotation.z = -0.22;
    bodyGroup.add(leftLapel);

    const rightLapel = new THREE.Mesh(lapelGeo, coatMaterial);
    rightLapel.position.set(-0.16, 0.14, 0.42);
    rightLapel.rotation.z = 0.22;
    bodyGroup.add(rightLapel);

    // Doctor ID Badge ("Dr. Krish • MD")
    const badgeGeo = new THREE.BoxGeometry(0.18, 0.14, 0.03);
    const badgeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
    const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
    badgeMesh.position.set(-0.25, 0.06, 0.45);
    badgeMesh.rotation.y = 0.2;
    bodyGroup.add(badgeMesh);

    // Red Cross on Doctor Badge
    const crossHGeo = new THREE.BoxGeometry(0.08, 0.024, 0.02);
    const crossVGeo = new THREE.BoxGeometry(0.024, 0.08, 0.02);
    const crossH = new THREE.Mesh(crossHGeo, heartGlowMaterial);
    const crossV = new THREE.Mesh(crossVGeo, heartGlowMaterial);
    crossH.position.set(-0.25, 0.06, 0.47);
    crossV.position.set(-0.25, 0.06, 0.47);
    crossH.rotation.y = 0.2;
    crossV.rotation.y = 0.2;
    bodyGroup.add(crossH);
    bodyGroup.add(crossV);

    // --- REAL STETHOSCOPE ---
    const stethCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.24, 0.28, 0.12),
      new THREE.Vector3(-0.32, 0.02, 0.38),
      new THREE.Vector3(0.0, -0.16, 0.48),
      new THREE.Vector3(0.32, 0.02, 0.38),
      new THREE.Vector3(0.24, 0.28, 0.12),
    ]);
    const stethGeo = new THREE.TubeGeometry(stethCurve, 32, 0.024, 12, false);
    const stethMesh = new THREE.Mesh(stethGeo, tubeMaterial);
    bodyGroup.add(stethMesh);

    // Stethoscope Chestpiece (Bell / Diaphragm)
    const bellGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.03, 24);
    const bellMesh = new THREE.Mesh(bellGeo, chromeMaterial);
    bellMesh.position.set(0, -0.16, 0.48);
    bellMesh.rotation.x = Math.PI / 2 - 0.2;
    bodyGroup.add(bellMesh);

    // --- HEAD GROUP: HUMAN DOCTOR ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.38, 0);
    robotRoot.add(headGroup);

    // Human Head: Cute stylized proportions
    const headGeo = new THREE.SphereGeometry(0.58, 36, 36);
    headGeo.scale(1.0, 1.05, 0.96);
    const headMesh = new THREE.Mesh(headGeo, skinMaterial);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    // Cute Ears
    const earGeo = new THREE.SphereGeometry(0.12, 16, 16);
    earGeo.scale(0.5, 1.0, 0.7);
    const leftEar = new THREE.Mesh(earGeo, skinMaterial);
    leftEar.position.set(0.56, -0.02, 0.0);
    headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, skinMaterial);
    rightEar.position.set(-0.56, -0.02, 0.0);
    headGroup.add(rightEar);

    // Rosy Blushing Cheeks
    const cheekGeo = new THREE.SphereGeometry(0.1, 16, 16);
    cheekGeo.scale(1.2, 0.6, 0.3);
    const leftCheek = new THREE.Mesh(cheekGeo, blushMaterial);
    leftCheek.position.set(0.3, -0.12, 0.48);
    headGroup.add(leftCheek);

    const rightCheek = new THREE.Mesh(cheekGeo, blushMaterial);
    rightCheek.position.set(-0.3, -0.12, 0.48);
    headGroup.add(rightCheek);

    // Tiny Cute Button Nose
    const noseGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const noseMesh = new THREE.Mesh(noseGeo, skinMaterial);
    noseMesh.position.set(0, -0.04, 0.58);
    headGroup.add(noseMesh);

    // --- STYLISH DARK HAIR ---
    // Hair Back & Top Volume
    const hairGeo = new THREE.SphereGeometry(0.62, 36, 36);
    hairGeo.scale(1.04, 1.06, 1.04);
    const hairMesh = new THREE.Mesh(hairGeo, hairMaterial);
    hairMesh.position.set(0, 0.06, -0.06);
    headGroup.add(hairMesh);

    // Front Bangs / Hair Fringe
    const bangGeo1 = new THREE.SphereGeometry(0.24, 16, 16);
    bangGeo1.scale(1.2, 0.7, 0.6);
    const bang1 = new THREE.Mesh(bangGeo1, hairMaterial);
    bang1.position.set(-0.16, 0.42, 0.45);
    bang1.rotation.z = 0.2;
    headGroup.add(bang1);

    const bangGeo2 = new THREE.SphereGeometry(0.22, 16, 16);
    bangGeo2.scale(1.1, 0.65, 0.6);
    const bang2 = new THREE.Mesh(bangGeo2, hairMaterial);
    bang2.position.set(0.18, 0.44, 0.44);
    bang2.rotation.z = -0.15;
    headGroup.add(bang2);

    // Hair Side Tufts
    const tuftGeo = new THREE.ConeGeometry(0.1, 0.3, 12);
    const leftTuft = new THREE.Mesh(tuftGeo, hairMaterial);
    leftTuft.position.set(0.55, 0.1, 0.15);
    leftTuft.rotation.z = -0.3;
    headGroup.add(leftTuft);

    const rightTuft = new THREE.Mesh(tuftGeo, hairMaterial);
    rightTuft.position.set(-0.55, 0.1, 0.15);
    rightTuft.rotation.z = 0.3;
    headGroup.add(rightTuft);

    // --- EXPRESSIVE ANIME HUMAN EYES ---
    const eyeGroup = new THREE.Group();
    eyeGroup.position.set(0, 0.02, 0.52);
    headGroup.add(eyeGroup);

    // Left Eye
    const eyeShapeGeo = new THREE.SphereGeometry(0.12, 24, 24);
    eyeShapeGeo.scale(1.0, 1.25, 0.35);

    const leftEye = new THREE.Mesh(eyeShapeGeo, scleraMaterial);
    leftEye.position.set(0.22, 0.02, 0);
    eyeGroup.add(leftEye);

    // Left Hazel Iris
    const irisGeo = new THREE.SphereGeometry(0.08, 20, 20);
    irisGeo.scale(1.0, 1.15, 0.25);
    const leftIris = new THREE.Mesh(irisGeo, irisMaterial);
    leftIris.position.set(0.22, 0.02, 0.03);
    eyeGroup.add(leftIris);

    // Left Pupil
    const pupilGeo = new THREE.SphereGeometry(0.045, 16, 16);
    pupilGeo.scale(1.0, 1.1, 0.2);
    const leftPupil = new THREE.Mesh(pupilGeo, pupilMaterial);
    leftPupil.position.set(0.22, 0.02, 0.05);
    eyeGroup.add(leftPupil);

    // Left Eye Sparkle Highlights
    const sparkleBigGeo = new THREE.SphereGeometry(0.038, 16, 16);
    sparkleBigGeo.scale(1.0, 1.0, 0.2);
    const leftSparkle1 = new THREE.Mesh(sparkleBigGeo, highlightMaterial);
    leftSparkle1.position.set(0.24, 0.06, 0.065);
    eyeGroup.add(leftSparkle1);

    const sparkleSmallGeo = new THREE.SphereGeometry(0.02, 12, 12);
    sparkleSmallGeo.scale(1.0, 1.0, 0.2);
    const leftSparkle2 = new THREE.Mesh(sparkleSmallGeo, highlightMaterial);
    leftSparkle2.position.set(0.19, -0.01, 0.065);
    eyeGroup.add(leftSparkle2);

    // Right Eye
    const rightEye = new THREE.Mesh(eyeShapeGeo, scleraMaterial);
    rightEye.position.set(-0.22, 0.02, 0);
    eyeGroup.add(rightEye);

    const rightIris = new THREE.Mesh(irisGeo, irisMaterial);
    rightIris.position.set(-0.22, 0.02, 0.03);
    eyeGroup.add(rightIris);

    const rightPupil = new THREE.Mesh(pupilGeo, pupilMaterial);
    rightPupil.position.set(-0.22, 0.02, 0.05);
    eyeGroup.add(rightPupil);

    const rightSparkle1 = leftSparkle1.clone();
    rightSparkle1.position.set(-0.20, 0.06, 0.065);
    eyeGroup.add(rightSparkle1);

    const rightSparkle2 = leftSparkle2.clone();
    rightSparkle2.position.set(-0.25, -0.01, 0.065);
    eyeGroup.add(rightSparkle2);

    // Eyebrows
    const browCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.09, -0.01, 0),
      new THREE.Vector3(0, 0.03, 0.01),
      new THREE.Vector3(0.09, -0.01, 0)
    );
    const browGeo = new THREE.TubeGeometry(browCurve, 16, 0.015, 6, false);
    const leftBrow = new THREE.Mesh(browGeo, eyebrowMaterial);
    leftBrow.position.set(0.22, 0.18, 0.54);
    leftBrow.rotation.z = -0.1;
    headGroup.add(leftBrow);

    const rightBrow = new THREE.Mesh(browGeo, eyebrowMaterial);
    rightBrow.position.set(-0.22, 0.18, 0.54);
    rightBrow.rotation.z = 0.1;
    headGroup.add(rightBrow);

    // --- SMILING HUMAN MOUTH ---
    const mouthGroup = new THREE.Group();
    mouthGroup.position.set(0, -0.20, 0.54);
    headGroup.add(mouthGroup);

    const smileCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.11, 0.02, 0),
      new THREE.Vector3(0, -0.04, 0.02),
      new THREE.Vector3(0.11, 0.02, 0)
    );
    const mouthGeo = new THREE.TubeGeometry(smileCurve, 20, 0.018, 8, false);
    const mouthMat = new THREE.MeshStandardMaterial({ color: 0xbe123c, roughness: 0.4 });
    const mouthMesh = new THREE.Mesh(mouthGeo, mouthMat);
    mouthGroup.add(mouthMesh);

    // --- DOCTOR ARMS & HANDS ---
    // Left Arm (Lab Coat Sleeve + Skin Hand)
    const leftHandGroup = new THREE.Group();
    leftHandGroup.position.set(0.62, -0.32, 0.15);
    robotRoot.add(leftHandGroup);

    const sleeveGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.35, 16);
    const leftSleeve = new THREE.Mesh(sleeveGeo, coatMaterial);
    leftSleeve.position.set(0, 0.1, 0);
    leftHandGroup.add(leftSleeve);

    const handGeo = new THREE.SphereGeometry(0.12, 20, 20);
    handGeo.scale(0.85, 1.0, 0.65);
    const leftHandMesh = new THREE.Mesh(handGeo, skinMaterial);
    leftHandMesh.castShadow = true;
    leftHandGroup.add(leftHandMesh);

    // Right Arm (Friendly Waving Doctor Hand)
    const rightHandGroup = new THREE.Group();
    rightHandGroup.position.set(-0.62, -0.32, 0.15);
    robotRoot.add(rightHandGroup);

    const rightSleeve = new THREE.Mesh(sleeveGeo, coatMaterial);
    rightSleeve.position.set(0, 0.1, 0);
    rightHandGroup.add(rightSleeve);

    const rightHandMesh = new THREE.Mesh(handGeo, skinMaterial);
    rightHandMesh.castShadow = true;
    rightHandGroup.add(rightHandMesh);

    // 5. 60 FPS Dynamic Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let blinkTimer = 0;
    let nextBlinkTime = 3.0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Idle vertical floating & breathing bobbing
      const floatY = Math.sin(time * 2.2) * 0.065;
      robotRoot.position.y = floatY;

      // Ground shadow scales inversely with height
      shadowMesh.scale.setScalar(0.9 - floatY * 1.2);

      // Mouse Look-At Smooth Interpolation
      const targetRotX = mouseRef.current.y * 0.22;
      const targetRotY = mouseRef.current.x * 0.35;
      headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, targetRotX, 0.08);
      headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, targetRotY, 0.08);

      // Natural Blinking
      blinkTimer += delta;
      if (blinkTimer > nextBlinkTime) {
        // Quick blink (0.15s duration)
        const blinkProgress = (blinkTimer - nextBlinkTime) / 0.15;
        if (blinkProgress <= 1.0) {
          const blinkScale = Math.sin(blinkProgress * Math.PI);
          const eyeScaleY = THREE.MathUtils.lerp(1.25, 0.05, blinkScale);
          leftEye.scale.y = eyeScaleY;
          rightEye.scale.y = eyeScaleY;
          leftSparkle1.visible = eyeScaleY > 0.4;
          leftSparkle2.visible = eyeScaleY > 0.4;
          rightSparkle1.visible = eyeScaleY > 0.4;
          rightSparkle2.visible = eyeScaleY > 0.4;
        } else {
          leftEye.scale.y = 1.25;
          rightEye.scale.y = 1.25;
          leftSparkle1.visible = true;
          leftSparkle2.visible = true;
          rightSparkle1.visible = true;
          rightSparkle2.visible = true;
          blinkTimer = 0;
          nextBlinkTime = 2.5 + Math.random() * 2.5;
        }
      }

      // Doctor ID badge cross pulse
      const heartPulse = 1.0 + Math.sin(time * 5.0) * 0.12;
      crossH.scale.setScalar(heartPulse);
      crossV.scale.setScalar(heartPulse);
      chestPulseLight.intensity = 1.0 + heartPulse * 0.4;

      // Hand Animations: Cheerful Wave on Right Hand
      if (moodRef.current === 'greeting' || !isSpeakingRef.current) {
        // Friendly gentle wave
        const wave = Math.sin(time * 4.0) * 0.28;
        rightHandGroup.position.y = -0.15 + Math.sin(time * 4.0) * 0.08;
        rightHandGroup.rotation.z = -0.3 + wave;
        rightHandGroup.rotation.x = 0.2 + Math.cos(time * 4.0) * 0.1;

        // Left hand rests in gentle float
        leftHandGroup.position.y = -0.32 + Math.sin(time * 2.2 + 0.5) * 0.04;
        leftHandGroup.rotation.z = 0.1;
      }

      // Speaking Animations: Synchronized lip-sync and gesturing
      if (isSpeakingRef.current) {
        // Mouth talking visemes (dynamic scale and opening)
        const speechViseme = Math.abs(Math.sin(time * 14.0)) * 1.6 + 0.4;
        mouthGroup.scale.set(1.0 + Math.sin(time * 8.0) * 0.2, speechViseme, 1.0);

        // Head nods gently to punctuate speech
        headGroup.position.y = 0.38 + Math.sin(time * 7.0) * 0.025;
        headGroup.rotation.z = Math.sin(time * 3.5) * 0.06;

        // Enthusiastic hand gestures
        leftHandGroup.position.y = -0.22 + Math.sin(time * 6.0) * 0.08;
        leftHandGroup.rotation.x = -0.2 + Math.cos(time * 6.0) * 0.2;

        rightHandGroup.position.y = -0.2 + Math.cos(time * 6.0) * 0.08;
        rightHandGroup.rotation.x = -0.2 + Math.sin(time * 6.0) * 0.2;


      } else {
        mouthGroup.scale.set(1.0, 1.0, 1.0);
        headGroup.position.y = 0.38;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 320;
      const newH = container.clientHeight || (compact ? 240 : 360);
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [compact]);

  // Click interaction: Cute giggle bounce
  const handlePokeMascot = () => {
    setIsInteracting(true);
    setTimeout(() => setIsInteracting(false), 900);
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* 3D Mascot WebGL Canvas Container */}
      <div 
        onClick={handlePokeMascot}
        className={`relative w-full cursor-pointer transition-transform duration-300 ${
          compact ? 'h-52 sm:h-64' : 'h-72 sm:h-96'
        } ${isInteracting ? 'scale-105 -translate-y-2' : 'hover:scale-[1.02]'}`}
        title="Click to interact with DocuBot!"
      >
        <div ref={mountRef} className="w-full h-full flex items-center justify-center" />

        {/* Floating Cute Mascot Badge */}
        <div className="absolute top-2 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-teal-200/80 shadow-xs text-xs font-bold text-teal-800">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
          <span>{characterTitle}</span>
        </div>

        {/* Speaking Status Pill */}
        {(isSpeaking || localSpeaking) && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-600 text-white text-xs font-semibold shadow-md shadow-teal-500/30 animate-bounce">
            <Volume2 className="w-3.5 h-3.5 animate-pulse" />
            <span>Speaking in {language.toUpperCase()}...</span>
          </div>
        )}
      </div>

      {/* Synchronized Subtitles Banner */}
      {activeSentence && (
        <div className="w-full max-w-md mx-auto mt-2 px-4 py-2.5 rounded-xl bg-teal-900/90 text-white text-xs sm:text-sm font-medium text-center shadow-lg backdrop-blur-md border border-teal-500/30 transition-all">
          <p className="line-clamp-2 leading-relaxed font-sans">{activeSentence}</p>
        </div>
      )}

      {/* Audio Playback Controls */}
      {showControls && (
        <div className="flex items-center justify-center gap-2 mt-3 p-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-teal-100 shadow-xs">
          {onToggleSpeech && (
            <button
              onClick={onToggleSpeech}
              className="p-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-all shadow-xs"
              title={isSpeaking || localSpeaking ? 'Pause Speech' : 'Play Speech'}
              aria-label="Toggle Speech"
            >
              {isSpeaking || localSpeaking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
          )}

          {onReplaySpeech && (
            <button
              onClick={onReplaySpeech}
              className="p-2 rounded-lg bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700 transition-all"
              title="Replay from start"
              aria-label="Replay Speech"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {onToggleMute && (
            <button
              onClick={onToggleMute}
              className={`p-2 rounded-lg transition-all ${
                isMuted 
                  ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' 
                  : 'bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label="Toggle Mute"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}

          {onSpeedChange && (
            <div className="flex items-center gap-1 pl-1 border-l border-slate-200">
              {[0.8, 1.0, 1.2].map(speed => (
                <button
                  key={speed}
                  onClick={() => onSpeedChange(speed)}
                  className={`px-2 py-1 text-[11px] font-bold rounded-md transition-all ${
                    playbackSpeed === speed
                      ? 'bg-teal-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default KrishXTattvaAvatar;
