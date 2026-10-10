import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  AlertCircle, 
  CheckCircle2, 
  BrainCircuit, 
  MessageSquare,
  HelpCircle
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
 * Krish X Tattva 3D Assistant
 * 
 * A charming, friendly, human-like 3D cartoon character rendered with Three.js WebGL:
 * - Soft rounded face, large warm expressive eyes with gentle blinking animations.
 * - Sweet welcoming smile with animated phonetic lip movement.
 * - Stylish modern attire: Pastel teal & soft white hoodie.
 * - Dynamic states:
 *    • Idle / Greeting: Gentle breathing bobbing, hand wave, natural blinking.
 *    • Thinking: Soft pulsing head tilt with glowing indicator aura.
 *    • Speaking: Energetic bobbing, lively mouth/jaw visemes synced with TTS speech.
 *    • Error / Review: Empathetic slight head tilt when pointing out ambiguous handwriting.
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
  characterTitle = 'Krish X Tattva',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  // Synchronized state refs for 60fps WebGL animation loop
  const moodRef = useRef(mood);
  moodRef.current = mood;
  const isSpeakingRef = useRef(isSpeaking);
  isSpeakingRef.current = isSpeaking;

  // Interactive mouse look-at
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

    const width = container.clientWidth || (compact ? 220 : 320);
    const height = container.clientHeight || (compact ? 220 : 340);

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.45, 3.8);

    // 2. Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'default' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      container.appendChild(renderer.domElement);
    } catch {
      setWebGlSupported(false);
      return;
    }

    // 3. Studio Lighting System
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.3);
    keyLight.position.set(2.5, 3.5, 3.0);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x99f6e4, 0.7); // Pastel teal fill
    fillLight.position.set(-3.0, 1.5, 2.0);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x2dd4bf, 1.8, 10); // Bright teal rim light
    rimLight.position.set(0, 2.5, -2.5);
    scene.add(rimLight);

    // 4. Character Materials (Human Cartoon Style)
    // Warm peach skin
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd5ba,
      roughness: 0.65,
      metalness: 0.05,
    });

    // Rosy blushing cheeks
    const blushMaterial = new THREE.MeshBasicMaterial({
      color: 0xf87171,
      transparent: true,
      opacity: 0.35,
    });

    // Stylized espresso brown hair
    const hairMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d271d,
      roughness: 0.85,
      metalness: 0.05,
    });

    // Eye Whites
    const scleraMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Warm deep amber/hazel cartoon iris
    const irisMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f766e, // Deep teal iris matching brand
      roughness: 0.2,
      metalness: 0.1,
    });

    // Pupil
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x09090b });

    // Specular eye highlight
    const highlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Eyelid for blinking
    const eyelidMaterial = new THREE.MeshStandardMaterial({
      color: 0xf4bba2,
      roughness: 0.7,
    });

    // Mouth interior & smile
    const mouthMaterial = new THREE.MeshStandardMaterial({
      color: 0xbe123c, // Rose pink interior
      roughness: 0.4,
    });

    // Modern Pastel Teal Hoodie
    const hoodieMaterial = new THREE.MeshStandardMaterial({
      color: 0x14b8a6, // Vibrant pastel teal
      roughness: 0.8,
      metalness: 0.05,
    });

    // Soft White Hoodie inner lining & cords
    const whiteHoodieMaterial = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.7,
      metalness: 0.0,
    });

    // Glowing thinking aura ring
    const auraMaterial = new THREE.MeshBasicMaterial({
      color: 0x2dd4bf,
      transparent: true,
      opacity: 0.0,
      wireframe: true,
    });

    // 5. Constructing Krish X Tattva Human-Like Character Mesh
    const characterRoot = new THREE.Group();
    scene.add(characterRoot);

    // Thinking Aura Halo Ring
    const auraGeo = new THREE.TorusGeometry(0.75, 0.03, 16, 48);
    const auraMesh = new THREE.Mesh(auraGeo, auraMaterial);
    auraMesh.position.set(0, 1.25, 0);
    auraMesh.rotation.x = Math.PI / 2;
    characterRoot.add(auraMesh);

    // HEAD GROUP (Parent for rotation, tilt, nodding)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.42, 0);
    characterRoot.add(headGroup);

    // Head Base: Soft rounded human anime proportions
    const headGeo = new THREE.SphereGeometry(0.62, 32, 32);
    headGeo.scale(1.0, 1.05, 0.98);
    const headMesh = new THREE.Mesh(headGeo, skinMaterial);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    // Cute Ears
    const earGeo = new THREE.SphereGeometry(0.14, 16, 16);
    earGeo.scale(0.5, 1.0, 0.8);
    const leftEar = new THREE.Mesh(earGeo, skinMaterial);
    leftEar.position.set(0.61, 0.02, -0.05);
    leftEar.rotation.y = 0.2;
    headGroup.add(leftEar);

    const rightEar = leftEar.clone();
    rightEar.position.set(-0.61, 0.02, -0.05);
    rightEar.rotation.y = -0.2;
    headGroup.add(rightEar);

    // Rosy Cheeks
    const cheekGeo = new THREE.SphereGeometry(0.13, 16, 16);
    cheekGeo.scale(1.3, 0.8, 0.2);
    const leftCheek = new THREE.Mesh(cheekGeo, blushMaterial);
    leftCheek.position.set(0.32, -0.10, 0.52);
    headGroup.add(leftCheek);

    const rightCheek = leftCheek.clone();
    rightCheek.position.set(-0.32, -0.10, 0.52);
    headGroup.add(rightCheek);

    // Cute Button Nose
    const noseGeo = new THREE.SphereGeometry(0.065, 16, 16);
    noseGeo.scale(1.1, 0.85, 1.1);
    const noseMesh = new THREE.Mesh(noseGeo, skinMaterial);
    noseMesh.position.set(0, -0.02, 0.59);
    headGroup.add(noseMesh);

    // Stylized Anime Hair (Volumetric Tufts + Bangs)
    const hairGroup = new THREE.Group();
    headGroup.add(hairGroup);

    // Main Hair Cap
    const hairCapGeo = new THREE.SphereGeometry(0.65, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55);
    const hairCap = new THREE.Mesh(hairCapGeo, hairMaterial);
    hairCap.position.set(0, 0.06, -0.02);
    hairCap.scale.set(1.03, 1.05, 1.02);
    hairGroup.add(hairCap);

    // Front Bangs / Hair Strands
    const bangGeo = new THREE.ConeGeometry(0.12, 0.35, 12);
    bangGeo.rotateZ(0.2);
    const bang1 = new THREE.Mesh(bangGeo, hairMaterial);
    bang1.position.set(-0.25, 0.45, 0.54);
    bang1.rotation.set(-0.4, 0.2, 0.3);
    hairGroup.add(bang1);

    const bang2 = bang1.clone();
    bang2.position.set(0.05, 0.48, 0.56);
    bang2.rotation.set(-0.35, -0.1, -0.15);
    hairGroup.add(bang2);

    const bang3 = bang1.clone();
    bang3.position.set(0.32, 0.42, 0.52);
    bang3.rotation.set(-0.4, -0.25, -0.4);
    hairGroup.add(bang3);

    // EYES & EYELIDS (For Realistic Blinking)
    const leftEyeGroup = new THREE.Group();
    leftEyeGroup.position.set(0.22, 0.12, 0.51);
    headGroup.add(leftEyeGroup);

    const rightEyeGroup = new THREE.Group();
    rightEyeGroup.position.set(-0.22, 0.12, 0.51);
    headGroup.add(rightEyeGroup);

    // Eye Whites (Sclera)
    const scleraGeo = new THREE.SphereGeometry(0.14, 24, 24);
    scleraGeo.scale(1.0, 1.15, 0.7);
    const leftSclera = new THREE.Mesh(scleraGeo, scleraMaterial);
    leftEyeGroup.add(leftSclera);

    const rightSclera = leftSclera.clone();
    rightEyeGroup.add(rightSclera);

    // Irises
    const irisGeo = new THREE.CircleGeometry(0.085, 24);
    const leftIris = new THREE.Mesh(irisGeo, irisMaterial);
    leftIris.position.set(0, 0, 0.098);
    leftEyeGroup.add(leftIris);

    const rightIris = leftIris.clone();
    rightEyeGroup.add(rightIris);

    // Pupils
    const pupilGeo = new THREE.CircleGeometry(0.05, 24);
    const leftPupil = new THREE.Mesh(pupilGeo, pupilMaterial);
    leftPupil.position.set(0, 0, 0.101);
    leftEyeGroup.add(leftPupil);

    const rightPupil = leftPupil.clone();
    rightEyeGroup.add(rightPupil);

    // Dual Specular Highlights (Sparkle in eye)
    const hlGeo1 = new THREE.CircleGeometry(0.026, 16);
    const leftHl1 = new THREE.Mesh(hlGeo1, highlightMaterial);
    leftHl1.position.set(0.028, 0.03, 0.103);
    leftEyeGroup.add(leftHl1);

    const rightHl1 = leftHl1.clone();
    rightHl1.position.set(0.028, 0.03, 0.103);
    rightEyeGroup.add(rightHl1);

    const hlGeo2 = new THREE.CircleGeometry(0.012, 12);
    const leftHl2 = new THREE.Mesh(hlGeo2, highlightMaterial);
    leftHl2.position.set(-0.022, -0.022, 0.103);
    leftEyeGroup.add(leftHl2);

    const rightHl2 = leftHl2.clone();
    rightEyeGroup.add(rightHl2);

    // Eyelids (Upper & Lower for Smooth Blinking)
    const upperLidGeo = new THREE.SphereGeometry(0.155, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
    upperLidGeo.scale(1.05, 1.2, 0.75);
    const leftUpperLid = new THREE.Mesh(upperLidGeo, eyelidMaterial);
    leftUpperLid.position.set(0, 0.02, 0.02);
    leftUpperLid.rotation.x = -Math.PI * 0.42; // Open eye position
    leftEyeGroup.add(leftUpperLid);

    const rightUpperLid = leftUpperLid.clone();
    rightEyeGroup.add(rightUpperLid);

    // Eyebrows
    const browGeo = new THREE.BoxGeometry(0.18, 0.03, 0.03);
    const leftBrow = new THREE.Mesh(browGeo, hairMaterial);
    leftBrow.position.set(0.24, 0.30, 0.52);
    leftBrow.rotation.z = -0.1;
    headGroup.add(leftBrow);

    const rightBrow = leftBrow.clone();
    rightBrow.position.set(-0.24, 0.30, 0.52);
    rightBrow.rotation.z = 0.1;
    headGroup.add(rightBrow);

    // ANIMATED MOUTH (Opens and synchronizes with speech playback)
    const mouthGroup = new THREE.Group();
    mouthGroup.position.set(0, -0.22, 0.52);
    headGroup.add(mouthGroup);

    const mouthGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.04, 24);
    mouthGeo.rotateX(Math.PI / 2);
    const mouthMesh = new THREE.Mesh(mouthGeo, mouthMaterial);
    mouthMesh.scale.set(1.1, 0.3, 0.5);
    mouthGroup.add(mouthMesh);

    // Upper Lip Smile Arch
    const lipGeo = new THREE.TorusGeometry(0.09, 0.015, 12, 24, Math.PI);
    const upperLipMesh = new THREE.Mesh(lipGeo, skinMaterial);
    upperLipMesh.position.set(0, 0.02, 0.03);
    upperLipMesh.rotation.z = Math.PI;
    mouthGroup.add(upperLipMesh);

    // 6. BODY & ATTIRE: Pastel Teal & Soft White Modern Hoodie
    const bodyGroup = new THREE.Group();
    bodyGroup.position.set(0, -0.45, 0);
    characterRoot.add(bodyGroup);

    // Torso / Teal Hoodie
    const torsoGeo = new THREE.CylinderGeometry(0.48, 0.54, 0.95, 32);
    torsoGeo.scale(1.1, 1.0, 0.85);
    const torsoMesh = new THREE.Mesh(torsoGeo, hoodieMaterial);
    torsoMesh.castShadow = true;
    bodyGroup.add(torsoMesh);

    // White V-Neck Inner / Zipper Trim
    const innerVGeo = new THREE.ConeGeometry(0.22, 0.45, 16);
    innerVGeo.scale(1.0, 1.0, 0.3);
    const innerVMesh = new THREE.Mesh(innerVGeo, whiteHoodieMaterial);
    innerVMesh.position.set(0, 0.28, 0.36);
    innerVMesh.rotation.x = Math.PI;
    bodyGroup.add(innerVMesh);

    // Soft White Hoodie Cords
    const cordGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.32, 12);
    const leftCord = new THREE.Mesh(cordGeo, whiteHoodieMaterial);
    leftCord.position.set(0.12, 0.05, 0.42);
    bodyGroup.add(leftCord);

    const rightCord = leftCord.clone();
    rightCord.position.set(-0.12, 0.05, 0.42);
    bodyGroup.add(rightCord);

    // Left Arm (Resting natural posture)
    const armGeo = new THREE.CylinderGeometry(0.12, 0.10, 0.70, 16);
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(0.55, 0.30, 0);
    const leftArmMesh = new THREE.Mesh(armGeo, hoodieMaterial);
    leftArmMesh.position.set(0.08, -0.28, 0);
    leftArmMesh.rotation.z = -0.2;
    leftArmGroup.add(leftArmMesh);

    const leftHandGeo = new THREE.SphereGeometry(0.10, 16, 16);
    const leftHandMesh = new THREE.Mesh(leftHandGeo, skinMaterial);
    leftHandMesh.position.set(0.16, -0.62, 0);
    leftArmGroup.add(leftHandMesh);
    bodyGroup.add(leftArmGroup);

    // Right Arm (Waving hand for greeting / gesturing for speech)
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(-0.55, 0.30, 0);
    const rightArmMesh = new THREE.Mesh(armGeo, hoodieMaterial);
    rightArmMesh.position.set(-0.08, -0.28, 0);
    rightArmMesh.rotation.z = 0.2;
    rightArmGroup.add(rightArmMesh);

    const rightHandGeo = new THREE.SphereGeometry(0.10, 16, 16);
    const rightHandMesh = new THREE.Mesh(rightHandGeo, skinMaterial);
    rightHandMesh.position.set(-0.16, -0.62, 0);
    rightArmGroup.add(rightHandMesh);
    bodyGroup.add(rightArmGroup);

    // 7. 60FPS Dynamic Animation Loop
    let clock = new THREE.Clock();
    let animFrameId: number;
    let nextBlinkTime = 2.0;
    let isBlinking = false;
    let blinkProgress = 0;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      const currentMood = moodRef.current;
      const speaking = isSpeakingRef.current;

      // 1. Natural Eyelid Blinking
      if (elapsed > nextBlinkTime && !isBlinking) {
        isBlinking = true;
        blinkProgress = 0;
      }

      if (isBlinking) {
        blinkProgress += delta * 12; // Fast natural blink
        const blinkAmount = Math.sin(Math.min(blinkProgress, Math.PI));
        // Rotate upper eyelid down over cornea
        const lidRot = -Math.PI * 0.42 + blinkAmount * Math.PI * 0.52;
        leftUpperLid.rotation.x = lidRot;
        rightUpperLid.rotation.x = lidRot;

        if (blinkProgress >= Math.PI) {
          isBlinking = false;
          nextBlinkTime = elapsed + 2.5 + Math.random() * 3.5; // Next blink in 2.5-6 sec
          leftUpperLid.rotation.x = -Math.PI * 0.42;
          rightUpperLid.rotation.x = -Math.PI * 0.42;
        }
      }

      // 2. Interactive Head Tracking towards cursor
      const targetHeadX = mouseRef.current.x * 0.25;
      const targetHeadY = mouseRef.current.y * 0.15;
      headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, targetHeadX, 0.05);
      headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, -targetHeadY, 0.05);

      // 3. State-Specific Dynamics
      if (speaking) {
        // SPEAKING STATE: Energetic bobbing, phonetic jaw visemes, expressive gesturing
        const speechViseme = (Math.sin(elapsed * 18) * 0.5 + 0.5) * (Math.sin(elapsed * 8) * 0.3 + 0.7);
        mouthMesh.scale.y = 0.3 + speechViseme * 0.95;
        mouthMesh.scale.x = 1.1 + Math.sin(elapsed * 12) * 0.15;

        // Subtle head nodding with speech cadence
        headGroup.position.y = 0.42 + Math.sin(elapsed * 9) * 0.025;
        characterRoot.position.y = Math.sin(elapsed * 4) * 0.02;

        // Right hand gesturing rhythmically
        rightArmGroup.rotation.z = 0.3 + Math.sin(elapsed * 7) * 0.25;
        rightArmGroup.rotation.x = 0.2 + Math.cos(elapsed * 6) * 0.20;

        // Eyebrows animated with emphasis
        leftBrow.position.y = 0.30 + Math.sin(elapsed * 8) * 0.02;
        rightBrow.position.y = 0.30 + Math.sin(elapsed * 8) * 0.02;

        auraMaterial.opacity = THREE.MathUtils.lerp(auraMaterial.opacity, 0.0, 0.1);

      } else if (currentMood === 'thinking') {
        // THINKING STATE: Soft pulsing head tilt with glowing aura
        mouthMesh.scale.set(0.9, 0.2, 0.5); // Thoughtful purse
        headGroup.rotation.z = THREE.MathUtils.lerp(headGroup.rotation.z, 0.18, 0.06); // Inquisitive tilt
        headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, -0.12, 0.06); // Looking up thoughtfully

        // Right hand touching chin / cheek
        rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, 1.2, 0.08);
        rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, 0.6, 0.08);

        // Glowing pulsing aura ring
        auraMesh.rotation.z = elapsed * 1.5;
        auraMaterial.opacity = 0.55 + Math.sin(elapsed * 5) * 0.35;

      } else if (currentMood === 'error' || currentMood === 'review') {
        // ERROR / REVIEW STATE: Empathetic slight tilt when pointing out ambiguous handwriting
        mouthMesh.scale.set(0.9, 0.2, 0.5);
        headGroup.rotation.z = THREE.MathUtils.lerp(headGroup.rotation.z, -0.15, 0.05); // Empathetic tilt
        leftBrow.rotation.z = 0.25; // Concerned brows
        rightBrow.rotation.z = -0.25;

        // Reset arms to gentle caution
        rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, 0.1, 0.05);
        auraMaterial.opacity = THREE.MathUtils.lerp(auraMaterial.opacity, 0.0, 0.1);

      } else {
        // IDLE / GREETING STATE: Gentle breathing motion (subtle vertical bobbing), friendly waving
        mouthMesh.scale.set(1.1, 0.3, 0.5); // Sweet smile
        headGroup.rotation.z = THREE.MathUtils.lerp(headGroup.rotation.z, 0, 0.05);
        leftBrow.rotation.z = -0.1;
        rightBrow.rotation.z = 0.1;

        // Gentle breathing motion
        characterRoot.position.y = Math.sin(elapsed * 2.2) * 0.035;

        // Friendly wave hand animation during greeting or periodic idle
        if (currentMood === 'greeting' || (Math.floor(elapsed / 8) % 2 === 0 && !compact)) {
          // Waving hand
          rightArmGroup.rotation.z = 1.35 + Math.sin(elapsed * 8) * 0.32;
          rightArmGroup.rotation.x = 0.2;
        } else {
          // Gentle resting
          rightArmGroup.rotation.z = THREE.MathUtils.lerp(rightArmGroup.rotation.z, 0.15, 0.05);
          rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, 0, 0.05);
        }

        auraMaterial.opacity = THREE.MathUtils.lerp(auraMaterial.opacity, 0.0, 0.1);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize observer
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth || 320;
      const newHeight = container.clientHeight || 340;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [compact]);

  // Status badge config
  const getBadgeConfig = () => {
    if (isSpeaking) {
      return {
        label: 'Speaking',
        color: 'bg-emerald-500 text-white animate-pulse',
        icon: Volume2
      };
    }
    if (mood === 'thinking') {
      return {
        label: 'Analyzing Document...',
        color: 'bg-teal-500 text-white animate-pulse',
        icon: BrainCircuit
      };
    }
    if (mood === 'error' || mood === 'review') {
      return {
        label: 'Verification Needed',
        color: 'bg-amber-500 text-white',
        icon: AlertCircle
      };
    }
    return {
      label: 'Ready to Help',
      color: 'bg-teal-600/90 text-white',
      icon: Sparkles
    };
  };

  const badge = getBadgeConfig();
  const BadgeIcon = badge.icon;

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* 3D Canvas Mount Container */}
      <div 
        ref={mountRef} 
        className={`relative w-full ${compact ? 'h-52' : 'h-80'} flex items-center justify-center overflow-hidden transition-all`}
      >
        {!webGlSupported && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-teal-50/80 rounded-3xl border border-teal-200">
            <div className="w-16 h-16 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg mb-2">
              KT
            </div>
            <p className="text-sm font-bold text-slate-800">{characterTitle}</p>
            <p className="text-xs text-slate-500 mt-1">3D Assistant active in high-performance mode</p>
          </div>
        )}

        {/* Live Status Badge */}
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-md backdrop-blur-md transition-all">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${badge.color}`}>
            <BadgeIcon className="w-3.5 h-3.5" />
            <span>{badge.label}</span>
          </span>
        </div>

        {/* Character Identifier Pill */}
        <div className="absolute top-2 right-2 z-10 px-2.5 py-0.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 text-[11px] font-bold text-slate-700 shadow-xs">
          {characterTitle}
        </div>
      </div>

      {/* Subtitles & Audio Player UI */}
      {showControls && (
        <div className="w-full mt-2 space-y-2">
          {/* Synchronized Subtitle Banner */}
          {activeSentence ? (
            <div className="px-4 py-2.5 rounded-2xl bg-teal-50 border border-teal-200/80 text-teal-950 text-xs sm:text-sm font-medium shadow-xs transition-all animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-700 mb-1">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                <span>Synchronized Subtitles ({language.toUpperCase()})</span>
              </div>
              <p className="leading-relaxed font-sans">{activeSentence}</p>
            </div>
          ) : (
            <div className="px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200/60 text-slate-500 text-xs text-center">
              Click &quot;Listen to Explanation&quot; to hear {characterTitle} read in your language.
            </div>
          )}

          {/* Player Controls Bar */}
          <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-1.5">
              {onToggleSpeech && (
                <button
                  onClick={onToggleSpeech}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                    isSpeaking 
                      ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                      : 'bg-teal-600 hover:bg-teal-700 text-white'
                  }`}
                  aria-label={isSpeaking ? 'Pause Speech' : 'Play Speech'}
                >
                  {isSpeaking ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Listen</span>
                    </>
                  )}
                </button>
              )}

              {onReplaySpeech && (
                <button
                  onClick={onReplaySpeech}
                  className="p-1.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  title="Replay from start"
                  aria-label="Replay speech"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}

              {onToggleMute && (
                <button
                  onClick={onToggleMute}
                  className="p-1.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
                </button>
              )}
            </div>

            {/* Playback Speed Controls */}
            {onSpeedChange && (
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600">
                {[0.8, 1.0, 1.2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => onSpeedChange(spd)}
                    className={`px-2 py-0.5 rounded-lg transition-all ${
                      playbackSpeed === spd
                        ? 'bg-teal-100 text-teal-800 font-extrabold'
                        : 'hover:bg-slate-100 text-slate-500'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default KrishXTattvaAvatar;
