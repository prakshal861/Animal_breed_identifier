import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  isProcessing: boolean;
  clearPreview: () => void;
  previewUrl: string | null;
}

const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
    />
  </svg>
);

const CameraIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.776 48.776 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, isProcessing, clearPreview, previewUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleClear = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    clearPreview();
  };

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        if (err instanceof Error) {
            if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
                setCameraError("Camera permission denied. Please allow camera access in your browser settings.");
            } else {
                setCameraError(`Could not access the camera: ${err.message}`);
            }
        } else {
            setCameraError("An unknown error occurred while accessing the camera.");
        }
        setIsCameraOpen(false);
      }
    };

    const stopCamera = () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };

    if (isCameraOpen) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isCameraOpen]);
  
  const handleUseCameraClick = () => {
    setCameraError(null);
    setIsCameraOpen(true);
  };

  const handleCapture = useCallback(() => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "camera-photo.jpg", { type: "image/jpeg" });
            onImageSelect(file);
            setIsCameraOpen(false);
          }
        }, 'image/jpeg');
      }
    }
  }, [onImageSelect]);


  return (
    <motion.div 
        className="w-full max-w-lg mx-auto p-6 bg-white brutal-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        disabled={isProcessing}
      />

      {cameraError && (
        <div className="mb-4 text-center bg-red-400 text-black px-4 py-2 brutal-border" role="alert">
            <p className="font-bold">{cameraError}</p>
        </div>
      )}

      {previewUrl ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-full aspect-square overflow-hidden border-2 border-black bg-gray-200">
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <button
            onClick={handleClear}
            disabled={isProcessing}
            className="w-full px-4 py-3 bg-red-500 text-black font-bold brutal-btn disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Clear Image
          </button>
        </div>
      ) : isCameraOpen ? (
         <div className="flex flex-col items-center gap-4">
            <div className="w-full aspect-square overflow-hidden border-2 border-black bg-black flex items-center justify-center">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => setIsCameraOpen(false)}
                    disabled={isProcessing}
                    className="w-full px-4 py-3 bg-gray-300 text-black font-bold brutal-btn disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Cancel
                </button>
                <button
                    onClick={handleCapture}
                    disabled={isProcessing}
                    className="w-full px-4 py-3 bg-yellow-300 text-black font-bold brutal-btn disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Take Photo
                </button>
            </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
            <div 
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-black cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={handleButtonClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleButtonClick()}
            >
              <div className="text-center">
                <UploadIcon className="mx-auto h-12 w-12 text-black" />
                <p className="mt-2 text-lg">
                  <span className="font-bold underline">Click to upload</span> or drag & drop
                </p>
                <p className="text-sm text-gray-600">PNG, JPG, or WEBP</p>
              </div>
            </div>

            <div className="flex items-center w-full my-4">
                <div className="flex-grow border-t-2 border-black"></div>
                <span className="flex-shrink mx-4 text-sm font-bold">OR</span>
                <div className="flex-grow border-t-2 border-black"></div>
            </div>

            <button
                onClick={handleUseCameraClick}
                disabled={isProcessing}
                className="w-full px-4 py-3 bg-yellow-300 text-black font-bold brutal-btn disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                <CameraIcon className="w-5 h-5" />
                Use Camera
            </button>
        </div>
      )}
    </motion.div>
  );
};