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
  characterTitle = 'DocuBot (Milo)',
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
    // Glossy Pearl-White Robot Chassis
    const pearlWhiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.18,
      metalness: 0.1,
    });

    // Vibrant Medical Pastel Teal
    const tealMaterial = new THREE.MeshStandardMaterial({
      color: 0x0d9488, // #0D9488 fresh teal
      roughness: 0.25,
      metalness: 0.15,
    });

    // Dark Curved Glass Visor
    const visorMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a, // Deep slate
      roughness: 0.1,
      metalness: 0.85,
    });

    // Glowing Cyan Anime Eyes
    const eyeMaterial = new THREE.MeshBasicMaterial({
      color: 0x22d3ee, // Bright glowing cyan
    });

    // White Eye Pupil & Specular Highlights
    const highlightMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    // Chrome Metallic Stethoscope
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.15,
      metalness: 0.9,
    });

    // Stethoscope Rubber Tubing (Deep Teal)
    const tubeMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f766e,
      roughness: 0.45,
      metalness: 0.05,
    });

    // Glowing Heart Pulse
    const heartGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x34d399, // Emerald mint glow
    });

    // 4. Constructing 3D Mascot Mesh Tree
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

    // --- BODY (CHASSIS) ---
    const bodyGroup = new THREE.Group();
    bodyGroup.position.set(0, -0.35, 0);
    robotRoot.add(bodyGroup);

    // Torso: Cute rounded egg/pear shape
    const torsoGeo = new THREE.SphereGeometry(0.52, 32, 32);
    torsoGeo.scale(0.95, 1.1, 0.9);
    const torsoMesh = new THREE.Mesh(torsoGeo, pearlWhiteMaterial);
    torsoMesh.castShadow = true;
    bodyGroup.add(torsoMesh);

    // Doctor Scrub Vest / Bib (Front Teal Plate)
    const vestGeo = new THREE.SphereGeometry(0.53, 32, 16, 0, Math.PI);
    vestGeo.scale(0.9, 0.9, 0.92);
    const vestMesh = new THREE.Mesh(vestGeo, tealMaterial);
    vestMesh.rotation.y = Math.PI / 2;
    vestMesh.position.set(0, -0.05, 0.03);
    bodyGroup.add(vestMesh);

    // Chest Screen / Heart Monitor Badge
    const badgeGeo = new THREE.BoxGeometry(0.24, 0.16, 0.04);
    const badgeMat = new THREE.MeshStandardMaterial({ color: 0x134e4a, roughness: 0.2 });
    const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
    badgeMesh.position.set(0, 0.05, 0.48);
    badgeMesh.rotation.x = -0.1;
    bodyGroup.add(badgeMesh);

    // Heart Cross / Pulse on badge
    const crossHGeo = new THREE.BoxGeometry(0.12, 0.035, 0.02);
    const crossVGeo = new THREE.BoxGeometry(0.035, 0.12, 0.02);
    const crossH = new THREE.Mesh(crossHGeo, heartGlowMaterial);
    const crossV = new THREE.Mesh(crossVGeo, heartGlowMaterial);
    crossH.position.set(0, 0.05, 0.51);
    crossV.position.set(0, 0.05, 0.51);
    crossH.rotation.x = -0.1;
    crossV.rotation.x = -0.1;
    bodyGroup.add(crossH);
    bodyGroup.add(crossV);

    // --- STETHOSCOPE ---
    // Stethoscope Tube around neck
    const stethCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.28, 0.22, 0.1),
      new THREE.Vector3(-0.35, 0.0, 0.35),
      new THREE.Vector3(0.0, -0.18, 0.48),
      new THREE.Vector3(0.35, 0.0, 0.35),
      new THREE.Vector3(0.28, 0.22, 0.1),
    ]);
    const stethGeo = new THREE.TubeGeometry(stethCurve, 32, 0.028, 12, false);
    const stethMesh = new THREE.Mesh(stethGeo, tubeMaterial);
    bodyGroup.add(stethMesh);

    // Stethoscope Chestpiece (Bell / Diaphragm)
    const bellGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.035, 24);
    const bellMesh = new THREE.Mesh(bellGeo, chromeMaterial);
    bellMesh.position.set(0, -0.18, 0.48);
    bellMesh.rotation.x = Math.PI / 2 - 0.2;
    bodyGroup.add(bellMesh);

    // --- HEAD GROUP ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.38, 0);
    robotRoot.add(headGroup);

    // Outer Helmet Chassis: Rounded, cute chibi proportions
    const helmetGeo = new THREE.SphereGeometry(0.66, 36, 36);
    helmetGeo.scale(1.08, 0.98, 1.0);
    const helmetMesh = new THREE.Mesh(helmetGeo, pearlWhiteMaterial);
    helmetMesh.castShadow = true;
    headGroup.add(helmetMesh);

    // Curved Obsidian Visor Face Plate
    const visorGeo = new THREE.SphereGeometry(0.63, 32, 32, 0, Math.PI * 0.9, 0, Math.PI * 0.65);
    visorGeo.scale(0.98, 0.88, 0.98);
    const visorMesh = new THREE.Mesh(visorGeo, visorMaterial);
    visorMesh.position.set(0, -0.04, 0.08);
    visorMesh.rotation.x = 0.15;
    headGroup.add(visorMesh);

    // Side Earmuffs / Headphone Pods (Teal with Chrome ring)
    const earGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.12, 24);
    earGeo.rotateZ(Math.PI / 2);

    const leftEar = new THREE.Mesh(earGeo, tealMaterial);
    leftEar.position.set(0.72, 0, 0);
    headGroup.add(leftEar);

    const leftEarRing = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.02, 16, 32), chromeMaterial);
    leftEarRing.rotation.y = Math.PI / 2;
    leftEarRing.position.set(0.78, 0, 0);
    headGroup.add(leftEarRing);

    const rightEar = new THREE.Mesh(earGeo, tealMaterial);
    rightEar.position.set(-0.72, 0, 0);
    headGroup.add(rightEar);

    const rightEarRing = leftEarRing.clone();
    rightEarRing.position.set(-0.78, 0, 0);
    headGroup.add(rightEarRing);

    // Top Antenna
    const stemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.22, 12);
    const stemMesh = new THREE.Mesh(stemGeo, chromeMaterial);
    stemMesh.position.set(0, 0.72, 0);
    headGroup.add(stemMesh);

    const orbGeo = new THREE.SphereGeometry(0.09, 20, 20);
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0x14b8a6,
      emissive: 0x14b8a6,
      emissiveIntensity: 0.8,
      roughness: 0.1,
    });
    const orbMesh = new THREE.Mesh(orbGeo, orbMat);
    orbMesh.position.set(0, 0.84, 0);
    headGroup.add(orbMesh);

    // --- EXPRESSIVE EYES ---
    const eyeGroup = new THREE.Group();
    eyeGroup.position.set(0, -0.02, 0.58);
    headGroup.add(eyeGroup);

    // Left Eye & Highlights
    const eyeShapeGeo = new THREE.SphereGeometry(0.13, 24, 24);
    eyeShapeGeo.scale(1.0, 1.25, 0.35);

    const leftEye = new THREE.Mesh(eyeShapeGeo, eyeMaterial);
    leftEye.position.set(0.24, 0.04, 0);
    eyeGroup.add(leftEye);

    // Big anime sparkle pupil highlight
    const sparkleBigGeo = new THREE.SphereGeometry(0.045, 16, 16);
    sparkleBigGeo.scale(1.0, 1.0, 0.2);
    const leftSparkle1 = new THREE.Mesh(sparkleBigGeo, highlightMaterial);
    leftSparkle1.position.set(0.26, 0.09, 0.06);
    eyeGroup.add(leftSparkle1);

    const sparkleSmallGeo = new THREE.SphereGeometry(0.025, 12, 12);
    sparkleSmallGeo.scale(1.0, 1.0, 0.2);
    const leftSparkle2 = new THREE.Mesh(sparkleSmallGeo, highlightMaterial);
    leftSparkle2.position.set(0.21, 0.0, 0.06);
    eyeGroup.add(leftSparkle2);

    // Right Eye & Highlights
    const rightEye = new THREE.Mesh(eyeShapeGeo, eyeMaterial);
    rightEye.position.set(-0.24, 0.04, 0);
    eyeGroup.add(rightEye);

    const rightSparkle1 = leftSparkle1.clone();
    rightSparkle1.position.set(-0.22, 0.09, 0.06);
    eyeGroup.add(rightSparkle1);

    const rightSparkle2 = leftSparkle2.clone();
    rightSparkle2.position.set(-0.27, 0.0, 0.06);
    eyeGroup.add(rightSparkle2);

    // Mouth: Digital LED smiling arc / speech waveform
    const mouthGroup = new THREE.Group();
    mouthGroup.position.set(0, -0.22, 0.58);
    headGroup.add(mouthGroup);

    const smileCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.12, 0.03, 0),
      new THREE.Vector3(0, -0.04, 0.02),
      new THREE.Vector3(0.12, 0.03, 0)
    );
    const mouthGeo = new THREE.TubeGeometry(smileCurve, 20, 0.02, 8, false);
    const mouthMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    const mouthMesh = new THREE.Mesh(mouthGeo, mouthMat);
    mouthGroup.add(mouthMesh);

    // --- MAGNETIC FLOATING HANDS ---
    // Left Hand (Mitten)
    const handGeo = new THREE.SphereGeometry(0.16, 20, 20);
    handGeo.scale(0.85, 1.1, 0.7);

    const leftHandGroup = new THREE.Group();
    leftHandGroup.position.set(0.68, -0.32, 0.15);
    robotRoot.add(leftHandGroup);

    const leftHandMesh = new THREE.Mesh(handGeo, pearlWhiteMaterial);
    leftHandMesh.castShadow = true;
    leftHandGroup.add(leftHandMesh);

    const thumbGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const leftThumb = new THREE.Mesh(thumbGeo, tealMaterial);
    leftThumb.position.set(-0.06, 0.05, 0.06);
    leftHandGroup.add(leftThumb);

    // Right Hand (Friendly Waving Mitten)
    const rightHandGroup = new THREE.Group();
    rightHandGroup.position.set(-0.68, -0.32, 0.15);
    robotRoot.add(rightHandGroup);

    const rightHandMesh = new THREE.Mesh(handGeo, pearlWhiteMaterial);
    rightHandMesh.castShadow = true;
    rightHandGroup.add(rightHandMesh);

    const rightThumb = new THREE.Mesh(thumbGeo, tealMaterial);
    rightThumb.position.set(0.06, 0.05, 0.06);
    rightHandGroup.add(rightThumb);

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

      // Heart Monitor gentle pulsing
      const heartPulse = 1.0 + Math.sin(time * 5.0) * 0.18;
      crossH.scale.setScalar(heartPulse);
      crossV.scale.setScalar(heartPulse);
      chestPulseLight.intensity = 1.2 + heartPulse * 0.5;

      // Antenna Orb Pulse
      orbMat.emissiveIntensity = 0.6 + Math.sin(time * 3.5) * 0.4;

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

        // Antenna pulses brighter during speech
        orbMat.emissiveIntensity = 1.2 + Math.sin(time * 10.0) * 0.5;
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
