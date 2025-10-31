import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 animate-ping rounded-full bg-blue-200"></div>
        <div className="absolute inset-2 animate-spin rounded-full border-4 border-blue-400 border-t-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center text-blue-600">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
            <path d="M4 4h16v13H6.5A2.5 2.5 0 004 19.5V4z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-500">Loading your classroom...</p>
    </div>
  );
};

export default Loader;


