import React, { useState, useRef, useCallback } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Camera, 
  Sparkles,
  FileImage,
  RefreshCw
} from 'lucide-react';

export interface FileUploadProps {
  onFileSelect: (file: File | { name: string; dataUrl: string; type: string }) => void;
  isProcessing?: boolean;
  acceptedTypes?: string[];
  maxSizeMB?: number;
  sampleOptions?: Array<{
    id: string;
    title: string;
    category: string;
    previewUrl?: string;
    description: string;
    dataUrl?: string;
    text?: string;
  }>;
  onSelectSample?: (sample: any) => void;
  title?: string;
  subtitle?: string;
}

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/bmp',
  'application/pdf'
];

/**
 * FileUpload Component
 * Features:
 * - Drag-and-drop with active hovering states
 * - MIME type validation and file size constraints
 * - Camera snapshot integration
 * - Quick-load high-yield sample document selector for hackathon judges
 */
export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  isProcessing = false,
  acceptedTypes = ALLOWED_MIME_TYPES,
  maxSizeMB = 25,
  sampleOptions = [],
  onSelectSample,
  title = 'Upload Your Document',
  subtitle = 'Drag & drop image or PDF (Prescription, Lab Report, Bill, Notice)',
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string; previewUrl?: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const validateAndHandleFile = useCallback((file: File) => {
    setErrorMessage(null);

    // MIME type check
    const isAllowed = acceptedTypes.includes(file.type) || 
      (file.type === '' && /\.(png|jpe?g|webp|pdf)$/i.test(file.name));

    if (!isAllowed) {
      setErrorMessage(`Unsupported file format. Please upload JPG, PNG, WEBP, or PDF.`);
      return;
    }

    // Size limit check
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > maxSizeMB) {
      setErrorMessage(`File is too large (${sizeInMB.toFixed(1)} MB). Maximum allowed size is ${maxSizeMB} MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setSelectedFile({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        previewUrl: file.type.startsWith('image/') ? dataUrl : undefined
      });
      onFileSelect({
        name: file.name,
        dataUrl,
        type: file.type || 'image/jpeg'
      });
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read file. Please try again.');
    };
    reader.readAsDataURL(file);
  }, [acceptedTypes, maxSizeMB, onFileSelect]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (isProcessing) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndHandleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndHandleFile(e.target.files[0]);
    }
  };

  // Camera handling
  const startCamera = async () => {
    try {
      setErrorMessage(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch {
      setErrorMessage('Could not access camera. Please upload an image file instead.');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 1280;
    canvas.height = videoRef.current.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      setSelectedFile({
        name: `camera_capture_${Date.now()}.jpg`,
        size: '1.2 MB',
        previewUrl: dataUrl
      });
      stopCamera();
      onFileSelect({
        name: `camera_capture_${Date.now()}.jpg`,
        dataUrl,
        type: 'image/jpeg'
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full space-y-4">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept={acceptedTypes.join(',')}
        className="hidden"
        disabled={isProcessing}
      />

      {/* Camera Live Modal */}
      {cameraActive && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-lg w-full space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Camera className="w-5 h-5 text-teal-600" />
                Capture Document Photo
              </h3>
              <button 
                onClick={stopCamera} 
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-3">
              <button
                onClick={capturePhoto}
                className="flex-1 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all"
              >
                Snap Document Photo
              </button>
              <button
                onClick={stopCamera}
                className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Drag & Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !isProcessing && !selectedFile && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-6 sm:p-8 transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
          isDragOver
            ? 'border-teal-500 bg-teal-50/70 scale-[1.01]'
            : selectedFile
            ? 'border-teal-300 bg-teal-50/30 cursor-default'
            : 'border-slate-300 hover:border-teal-400 bg-white hover:bg-teal-50/20'
        } ${isProcessing ? 'pointer-events-none opacity-80' : ''}`}
      >
        {selectedFile ? (
          <div className="w-full flex flex-col items-center gap-4">
            {selectedFile.previewUrl ? (
              <div className="relative max-h-56 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <img 
                  src={selectedFile.previewUrl} 
                  alt="Document Preview" 
                  className="max-h-56 object-contain bg-slate-50"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearSelection();
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-red-600 transition-colors shadow-md"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <FileText className="w-8 h-8 text-teal-600" />
                <div className="text-left">
                  <p className="font-bold text-slate-900 text-sm">{selectedFile.name}</p>
                  <p className="text-xs text-slate-500">{selectedFile.size}</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearSelection();
                  }}
                  className="p-1 rounded-full text-slate-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Document Ready for Analysis</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-200 shadow-sm transition-transform hover:scale-105">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900">{title}</h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{subtitle}</p>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-all"
              >
                Browse Files
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  startCamera();
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
              >
                <Camera className="w-3.5 h-3.5" />
                Use Camera
              </button>
            </div>

            <p className="text-[11px] text-slate-400 mt-1">
              Supports JPEG, PNG, WEBP, and PDF up to {maxSizeMB}MB
            </p>
          </div>
        )}

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xs rounded-3xl flex flex-col items-center justify-center gap-3">
            <RefreshCw className="w-8 h-8 text-teal-600 animate-spin" />
            <p className="font-bold text-sm text-slate-800">Processing document through Gemini multimodal...</p>
          </div>
        )}
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Hackathon Judge Quick Samples */}
      {sampleOptions.length > 0 && onSelectSample && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Or test with a pre-loaded real sample:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {sampleOptions.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => onSelectSample(sample)}
                disabled={isProcessing}
                className="flex items-start gap-2.5 p-2.5 rounded-2xl border border-slate-200 bg-white hover:border-teal-500 hover:bg-teal-50/40 text-left transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-teal-100 group-hover:text-teal-700 flex items-center justify-center shrink-0">
                  <FileImage className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate group-hover:text-teal-800">
                    {sample.title}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">{sample.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default FileUpload;
