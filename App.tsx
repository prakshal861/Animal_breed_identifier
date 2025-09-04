import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import Spinner from './components/Spinner';
import ResultDisplay from './components/ResultDisplay';
import Footer from './components/Footer';
import ErrorAlert from './components/ErrorAlert';
import type { AnimalInfo } from './types';
import { getAnimalInfo } from './services/geminiService';

const LocationInfoAlert: React.FC<{ message: string, variant?: 'info' | 'error' | 'success' }> = ({ message, variant = 'info' }) => {
    const variantClasses = {
        info: "bg-blue-300",
        error: "bg-red-400",
        success: "bg-green-400",
    };
    return (
        <motion.div 
            className={`max-w-xl mx-auto mb-6 p-4 text-center text-sm font-semibold brutal-border ${variantClasses[variant]}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            role="status"
        >
            {message}
        </motion.div>
    );
};


const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [animalInfo, setAnimalInfo] = useState<AnimalInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  
  type LocationStatus = 'idle' | 'pending' | 'success' | 'error';
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('idle');
  const [locationMessage, setLocationMessage] = useState<string | null>(null);


  const handleRequestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationMessage("Geolocation is not supported by this browser.");
      setLocationStatus('error');
      return;
    }
    
    setLocationStatus('pending');
    setLocationMessage(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationMessage("Location acquired! Nearby services will be shown.");
        setLocationStatus('success');
      },
      (err: GeolocationPositionError) => {
        console.error("Geolocation error:", err.message, { code: err.code });
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setLocationMessage("Location access denied. You can try again from the header button.");
            break;
          case err.POSITION_UNAVAILABLE:
            setLocationMessage("Location information is currently unavailable.");
            break;
          case err.TIMEOUT:
            setLocationMessage("Request for location timed out.");
            break;
          default:
            setLocationMessage("An unknown error occurred while getting location.");
            break;
        }
        setLocationStatus('error');
      }
    );
  }, []);

  const resetState = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setAnimalInfo(null);
    setError(null);
    setIsLoading(false);
  };
  
  const handleImageSelect = (file: File) => {
      resetState();
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
  };
  
  const clearPreview = () => {
      resetState();
  };

  const analyzeImage = useCallback(async () => {
    if (!imageFile) return;

    setIsLoading(true);
    setError(null);
    setAnimalInfo(null);

    try {
      const result = await getAnimalInfo(imageFile, userLocation);
      setAnimalInfo(result);
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unexpected error occurred.");
        }
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, userLocation]);

  useEffect(() => {
    if (imageFile) {
      analyzeImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

  const dismissError = () => setError(null);

  const renderLocationAlert = () => {
    if (!locationMessage) return null;
    
    let variant: 'info' | 'error' | 'success' = 'info';
    if (locationStatus === 'success') variant = 'success';
    if (locationStatus === 'error') variant = 'error';
    
    return <LocationInfoAlert message={locationMessage} variant={variant} />;
  };


  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 md:p-8">
      <Header 
        onRequestLocation={handleRequestLocation}
        isProcessing={locationStatus === 'pending'}
        locationStatus={locationStatus}
      />
      <main className="flex-grow container mx-auto w-full py-8">
        <motion.div 
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
          <p className="text-lg">
            Curious about an animal's breed? Upload a photo and let our AI-powered tool reveal the details.
          </p>
        </motion.div>
        
        <div className="mt-10">
            <AnimatePresence>
              {renderLocationAlert()}
            </AnimatePresence>
            <ImageUploader 
                onImageSelect={handleImageSelect} 
                isProcessing={isLoading} 
                clearPreview={clearPreview}
                previewUrl={previewUrl}
            />
        </div>

        <div className="mt-8">
          <AnimatePresence>
            {isLoading && <Spinner message="Analyzing your image... This may take a moment." />}
            {error && (
              <ErrorAlert message={error} onDismiss={dismissError} />
            )}
            {animalInfo && previewUrl && (
              <ResultDisplay result={animalInfo} imageUrl={previewUrl} />
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
