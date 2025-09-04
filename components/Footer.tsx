import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-6 mt-12 border-t-2 border-black">
      <div className="container mx-auto px-4">
        <p className="text-sm text-gray-700">
          Powered by Gemini API. Built with React & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;