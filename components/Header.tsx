import React from 'react';
import { motion } from 'framer-motion';

const PawIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10.219 1.012a9.75 9.75 0 0111.434 8.163.75.75 0 01-1.49.155 8.25 8.25 0 00-16.312 0 .75.75 0 01-1.49-.155A9.75 9.75 0 0110.22 1.012zM3.21 11.487a.75.75 0 01.99 0l.47.47a.75.75 0 01-1.06 1.06l-.47-.47a.75.75 0 01.06-.99zm16.52 0a.75.75 0 01.99.06l.47.47a.75.75 0 11-1.06 1.06l-.47-.47a.75.75 0 01.06-.99z"
      clipRule="evenodd"
    />
    <path
      d="M12.75 18.062c0-3.834 2.146-7.39 5.28-9.352.221-.141.285-.43.144-.652a.608.608 0 00-.652-.144C13.885 9.81 11.25 13.5 11.25 18.062v.038a3.75 3.75 0 01-7.5 0v-.038c0-4.562-2.635-8.25-6.28-10.214a.608.608 0 00-.652.144.607.607 0 00.144.652C.604 10.672 2.75 14.228 2.75 18.062a9.25 9.25 0 0018.5 0v-.038z"
    />
  </svg>
);

const MapPinIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 005.169-4.4c3.45-4.773 4.135-10.018 2.37-14.223a.75.75 0 00-1.342.645 15.474 15.474 0 01-2.18 13.043C15.445 19.341 12.828 21 12 21c-.828 0-3.445-1.659-5.631-4.562A15.474 15.474 0 014.188 3.82a.75.75 0 00-1.342-.645c-1.765 4.205-.968 9.45 2.37 14.223A16.975 16.975 0 0011.54 22.351z" clipRule="evenodd" /><path fillRule="evenodd" d="M12 12.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" /></svg>);

const SpinnerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);

type LocationStatus = 'idle' | 'pending' | 'success' | 'error';

interface HeaderProps {
    onRequestLocation: () => void;
    isProcessing: boolean;
    locationStatus: LocationStatus;
}


const Header: React.FC<HeaderProps> = ({ onRequestLocation, isProcessing, locationStatus }) => {
  return (
    <motion.header 
      className="pb-6 border-b-2 border-black"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4">
            <PawIcon className="w-10 h-10 text-black" />
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-black">
              Animal Identifier
            </h1>
        </div>
        <button
            onClick={onRequestLocation}
            disabled={isProcessing || locationStatus === 'success'}
            className="flex-shrink-0 px-4 py-2 bg-yellow-300 text-black font-bold brutal-btn disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
            {isProcessing ? (
                <>
                    <SpinnerIcon className="animate-spin w-5 h-5" />
                    <span>Fetching...</span>
                </>
            ) : locationStatus === 'success' ? (
                <>
                    <CheckIcon className="w-5 h-5" />
                    <span>Location Acquired</span>
                </>
            ) : (
                <>
                    <MapPinIcon className="w-5 h-5" />
                    <span>Find Local Pet Care</span>
                </>
            )}
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
