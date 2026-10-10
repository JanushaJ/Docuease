import React, { useState, useRef, useEffect } from 'react';
import { 
  UploadCloud, 
  Camera, 
  FileText, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCw,
  Sliders,
  PenTool,
  Zap,
  Building2,
  GraduationCap,
  Scale,
  Stethoscope,
  X,
  FileImage,
  Sun,
  Contrast,
  RefreshCw
} from 'lucide-react';
import { ProcessedDocument, MainMode } from '../types/medscript';

interface DocumentUploadProps {
  onFileSelect: (file: File | { name: string; dataUrl: string; type: string }) => void;
  onSelectDemo: (demoDoc: ProcessedDocument) => void;
  demoDocuments: ProcessedDocument[];
  isProcessing: boolean;
  initialMode?: MainMode;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onFileSelect,
  onSelectDemo,
  demoDocuments,
  isProcessing,
  initialMode = 'medical'
}) => {
  const [activeMode, setActiveMode] = useState<MainMode>(initialMode);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Preprocessing controls
  const [showPreprocessTools, setShowPreprocessTools] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [contrastLevel, setContrastLevel] = useState(100);
  const [brightnessLevel, setBrightnessLevel] = useState(100);
  const [enhanceHandwriting, setEnhanceHandwriting] = useState(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [pendingFileName, setPendingFileName] = useState<string>('document.png');

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  // Global clipboard paste listener (Ctrl+V / Cmd+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.items) {
        for (let i = 0; i < e.clipboardData.items.length; i++) {
          const item = e.clipboardData.items[i];
          if (item.type.indexOf('image') !== -1) {
            const file = item.getAsFile();
            if (file) {
              setUploadError(null);
              handleFile(file);
              return;
            }
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  // Update canvas preview when preprocessing filters change
  useEffect(() => {
    if (!previewDataUrl) return;

    const img = new Image();
    img.src = previewDataUrl;
    img.onload = () => {
      const canvas = previewCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const isRotated = rotationAngle === 90 || rotationAngle === 270;
      canvas.width = isRotated ? img.height : img.width;
      canvas.height = isRotated ? img.width : img.height;

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotationAngle * Math.PI) / 180);

      // Build CSS filter string
      let filter = `brightness(${brightnessLevel}%) contrast(${contrastLevel}%)`;
      if (enhanceHandwriting) {
        // High-contrast stroke enhancement
        filter += ' grayscale(100%) contrast(160%)';
      }
      ctx.filter = filter;

      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      ctx.restore();
    };
  }, [previewDataUrl, rotationAngle, contrastLevel, brightnessLevel, enhanceHandwriting]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setUploadError(null);
    const validExtensions = /\.(jpg|jpeg|png|webp|jfif|avif|bmp|tiff|heic|svg|pdf)$/i;
    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    if (!isImage && !isPdf && !file.name.match(validExtensions)) {
      setUploadError(`The file "${file.name}" is not supported. Please upload a JPG, PNG, WebP, or PDF.`);
      return;
    }

    if (file.size > 40 * 1024 * 1024) {
      setUploadError('File exceeds 40 MB. Please upload a smaller file or photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreviewDataUrl(dataUrl);
      setPendingFileName(file.name);
      setShowPreprocessTools(true);
    };
    reader.readAsDataURL(file);
  };

  const handleConfirmAndProcess = () => {
    if (!previewCanvasRef.current || !previewDataUrl) {
      return;
    }

    // Export processed canvas data URL
    const processedDataUrl = previewCanvasRef.current.toDataURL('image/jpeg', 0.92);
    setShowPreprocessTools(false);
    onFileSelect({
      name: pendingFileName,
      dataUrl: processedDataUrl,
      type: activeMode
    });
  };

  // Mobile camera capture
  const startCamera = async () => {
    setShowCameraModal(true);
    setUploadError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err) {
      console.warn('Camera access error:', err);
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setShowCameraModal(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 800;
      canvas.height = videoRef.current.videoHeight || 1000;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        stopCamera();
        setPreviewDataUrl(dataUrl);
        setPendingFileName(`Photo_Capture_${new Date().toISOString().slice(0, 10)}.jpg`);
        setShowPreprocessTools(true);
      }
    }
  };

  // Trigger test for quality rejection (Blur test simulation)
  const triggerBlurryTest = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, 600, 800);
      ctx.fillStyle = '#94a3b8';
      ctx.filter = 'blur(12px)';
      ctx.font = '24px serif';
      ctx.fillText('Unreadable blurry doctor note', 100, 200);
      ctx.fillText('Rx: Illegible 500mg or 50mg?', 100, 260);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
      onFileSelect({
        name: 'Blurry_Unreadable_Prescription_Photo.jpg',
        dataUrl,
        type: 'medical'
      });
    }
  };

  return (
    <div id="upload-section" className="max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Upload Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10 mb-8">
        
        {/* Mode Switcher Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200 shadow-2xs">
            <button
              onClick={() => setActiveMode('medical')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeMode === 'medical'
                  ? 'bg-white text-teal-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-teal-600" />
              <span>Medical Documents</span>
            </button>
            <button
              onClick={() => setActiveMode('general')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeMode === 'general'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-4 h-4 text-indigo-600" />
              <span>General Documents</span>
            </button>
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {activeMode === 'medical' ? 'Upload Medical Document' : 'Upload Any Difficult Document'}
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">
            {activeMode === 'medical'
              ? 'Handwritten prescriptions, laboratory blood panels, doctor notes, or medicine labels.'
              : 'Electricity/gas bills, bank letters, government circulars, school notices, or legal agreements.'}
          </p>
        </div>

        {/* Error notification banner if any */}
        {uploadError && (
          <div className="mb-4 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-left flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs text-rose-800 leading-relaxed font-medium">
              <strong className="font-bold text-rose-900">Upload Issue: </strong>
              {uploadError}
            </div>
            <button onClick={() => setUploadError(null)} className="ml-auto text-rose-400 hover:text-rose-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Preprocessing Toolbar & Live Canvas (shown when an image is loaded) */}
        {showPreprocessTools && (
          <div className="mb-6 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Sliders className="w-4 h-4 text-teal-600" />
                <span>Image Preprocessing &amp; Handwriting Enhancement</span>
              </div>
              <button
                onClick={() => {
                  setRotationAngle(0);
                  setContrastLevel(100);
                  setBrightnessLevel(100);
                  setEnhanceHandwriting(false);
                }}
                className="text-2xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
              {/* Rotate Button */}
              <div>
                <label className="text-2xs font-semibold text-slate-600 block mb-1">Rotation</label>
                <button
                  onClick={() => setRotationAngle((prev) => (prev + 90) % 360)}
                  className="w-full py-2 px-3 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 hover:bg-slate-100"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Rotate 90&deg; ({rotationAngle}&deg;)</span>
                </button>
              </div>

              {/* Contrast Slider */}
              <div>
                <label className="text-2xs font-semibold text-slate-600 block mb-1">Contrast ({contrastLevel}%)</label>
                <input
                  type="range"
                  min="60"
                  max="180"
                  value={contrastLevel}
                  onChange={(e) => setContrastLevel(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>

              {/* Brightness Slider */}
              <div>
                <label className="text-2xs font-semibold text-slate-600 block mb-1">Brightness ({brightnessLevel}%)</label>
                <input
                  type="range"
                  min="60"
                  max="160"
                  value={brightnessLevel}
                  onChange={(e) => setBrightnessLevel(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>

              {/* Handwriting Sharpness Toggle */}
              <div>
                <label className="text-2xs font-semibold text-slate-600 block mb-1">Handwriting Boost</label>
                <button
                  onClick={() => setEnhanceHandwriting(!enhanceHandwriting)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                    enhanceHandwriting
                      ? 'bg-teal-600 text-white border-teal-700'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>{enhanceHandwriting ? 'Active (High Edge)' : 'Enhance Ink'}</span>
                </button>
              </div>
            </div>

            {/* Preview Canvas */}
            <div className="flex justify-center bg-slate-900/5 rounded-xl p-3 max-h-64 overflow-hidden mb-4">
              <canvas ref={previewCanvasRef} className="max-h-56 max-w-full rounded-lg shadow-xs object-contain" />
            </div>

            {/* Confirm & Process Button */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPreprocessTools(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAndProcess}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-md transition"
              >
                Process Enhanced Document
              </button>
            </div>
          </div>
        )}

        {/* Drag & Drop Zone */}
        {!showPreprocessTools && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
              isDragOver
                ? 'border-teal-500 bg-teal-50/60 scale-[1.01]'
                : 'border-slate-300 hover:border-teal-400 bg-slate-50/50 hover:bg-slate-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleFileChange}
            />

            <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4 border border-teal-100 shadow-2xs">
              <UploadCloud className="w-8 h-8" />
            </div>

            <p className="text-base font-bold text-slate-800 mb-1">
              Drag &amp; drop document or <span className="text-teal-600 underline">browse files</span>
            </p>
            <p className="text-xs text-slate-400 font-medium mb-4">
              Supports PNG, JPG, JPEG, WEBP, PDF (Up to 40 MB) &bull; Paste with Ctrl+V
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  startCamera();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold shadow-2xs hover:bg-slate-100 transition"
              >
                <Camera className="w-4 h-4 text-teal-600" />
                <span>Take Photo</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold shadow-2xs hover:bg-teal-700 transition"
              >
                <FileImage className="w-4 h-4" />
                <span>Choose From Device</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Realistic Sample Documents Library (Section 26 & 31) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Instant Test Library</span>
            <h3 className="text-lg font-bold text-slate-900">Try Real Sample Documents</h3>
          </div>
          <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
            Real Pipeline &bull; No Fake Demo
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {demoDocuments.map((demoDoc, idx) => {
            const isMedical = demoDoc.categoryGroup === 'medical' || demoDoc.type === 'prescription' || demoDoc.type === 'lab_report';
            const isBill = demoDoc.categoryGroup === 'utility' || demoDoc.type === 'bill';
            const isBank = demoDoc.categoryGroup === 'financial' || demoDoc.type === 'banking';
            const isGov = demoDoc.categoryGroup === 'government' || demoDoc.type === 'government';
            const isLegal = demoDoc.categoryGroup === 'legal' || demoDoc.type === 'legal';

            const Icon = isBill ? Zap : isBank ? Building2 : isGov ? FileText : isLegal ? Scale : Stethoscope;
            const badgeColor = isBill ? 'text-amber-700 bg-amber-50' : isBank ? 'text-blue-700 bg-blue-50' : isGov ? 'text-emerald-700 bg-emerald-50' : isLegal ? 'text-purple-700 bg-purple-50' : 'text-teal-700 bg-teal-50';

            return (
              <div
                key={demoDoc.id}
                onClick={() => onSelectDemo(demoDoc)}
                className="p-3.5 rounded-2xl border border-slate-200 hover:border-teal-400 bg-slate-50/60 hover:bg-white cursor-pointer transition shadow-2xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${badgeColor}`}>
                      {demoDoc.detectedCategoryLabel || demoDoc.documentClassification || 'Sample'}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                    {demoDoc.name}
                  </h4>
                  <p className="text-2xs text-slate-500 mt-1 line-clamp-2">
                    {demoDoc.explanation?.simpleSummary}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-2xs font-bold text-teal-700">
                  <span>Run through pipeline</span>
                  <span>&rarr;</span>
                </div>
              </div>
            );
          })}

          {/* Test 7: Blurry Document (Quality Gate Rejection Test) */}
          <div
            onClick={triggerBlurryTest}
            className="p-3.5 rounded-2xl border border-dashed border-rose-300 hover:border-rose-400 bg-rose-50/50 hover:bg-rose-50 cursor-pointer transition shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md text-rose-700 bg-rose-100">
                  Quality Gate Test
                </span>
                <AlertTriangle className="w-4 h-4 text-rose-500" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 leading-snug">
                Blurry / Motion Smeared Prescription
              </h4>
              <p className="text-2xs text-slate-500 mt-1">
                Tests image quality pre-check with actionable retake suggestions.
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-rose-200/60 flex items-center justify-between text-2xs font-bold text-rose-700">
              <span>Test Quality Gate</span>
              <span>&rarr;</span>
            </div>
          </div>
        </div>
      </div>

      {/* Camera Capture Modal */}
      {showCameraModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-teal-400" />
                <span className="text-sm font-bold">Document Camera Capture</span>
              </div>
              <button onClick={stopCamera} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative bg-black flex items-center justify-center min-h-[320px]">
              <video ref={videoRef} autoPlay playsInline className="w-full max-h-[420px] object-cover" />
              {/* Document Alignment Frame */}
              <div className="absolute inset-8 border-2 border-teal-400/80 border-dashed rounded-xl pointer-events-none flex items-center justify-center">
                <span className="text-2xs bg-black/60 text-white px-2 py-1 rounded">Align document edges</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 flex items-center justify-between">
              <button onClick={stopCamera} className="text-xs font-semibold text-slate-600 hover:text-slate-900">
                Cancel
              </button>
              <button
                onClick={capturePhoto}
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md transition"
              >
                Capture Photo
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
