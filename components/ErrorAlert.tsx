import React from 'react';
import { motion } from 'framer-motion';

interface ErrorAlertProps {
  message: string;
  onDismiss: () => void;
}

const ErrorIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.007H12v-.007z" />
    </svg>
);


const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onDismiss }) => {
  return (
    <motion.div 
      className="max-w-xl mx-auto bg-red-500 text-black p-4 brutal-border relative flex items-start gap-4"
      role="alert"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
        <ErrorIcon className="w-6 h-6 flex-shrink-0 mt-0.5" />
        <div className="flex-grow">
            <strong className="font-bold">Oops! An error occurred.</strong>
            <p className="text-sm mt-1">{message}</p>
        </div>
        <button 
            onClick={onDismiss} 
            className="absolute top-2 right-2 p-1 border-2 border-black bg-white hover:bg-gray-200"
            aria-label="Dismiss"
        >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </motion.div>
  );
};

export default ErrorAlert;