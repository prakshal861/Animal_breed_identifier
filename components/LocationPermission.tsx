import React from 'react';

const MapPinIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 005.169-4.4c3.45-4.773 4.135-10.018 2.37-14.223a.75.75 0 00-1.342.645 15.474 15.474 0 01-2.18 13.043C15.445 19.341 12.828 21 12 21c-.828 0-3.445-1.659-5.631-4.562A15.474 15.474 0 014.188 3.82a.75.75 0 00-1.342-.645c-1.765 4.205-.968 9.45 2.37 14.223A16.975 16.975 0 0011.54 22.351z" clipRule="evenodd" /><path fillRule="evenodd" d="M12 12.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" /></svg>);

const SpinnerIcon: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


interface LocationPermissionProps {
  onRequest: () => void;
  isProcessing: boolean;
}

const LocationPermission: React.FC<LocationPermissionProps> = ({ onRequest, isProcessing }) => {
  return (
    <div className="max-w-xl mx-auto mb-6 p-4 text-center flex flex-col sm:flex-row items-center gap-4 bg-white brutal-border">
      <div className="flex-shrink-0">
        <MapPinIcon className="w-8 h-8 text-black" />
      </div>
      <div className="flex-grow text-center sm:text-left">
        <h3 className="font-bold">Find Local Pet Care</h3>
        <p className="text-sm text-gray-700 mt-1">Grant location access for AI-powered suggestions of nearby pet stores and vets.</p>
      </div>
      <button
        onClick={onRequest}
        disabled={isProcessing}
        className="w-full sm:w-auto flex-shrink-0 px-4 py-2 bg-yellow-300 text-black font-bold brutal-btn disabled:bg-gray-400 disabled:cursor-wait flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <SpinnerIcon />
            <span>Fetching...</span>
          </>
        ) : (
          <span>Grant Access</span>
        )}
      </button>
    </div>
  );
};

export default LocationPermission;