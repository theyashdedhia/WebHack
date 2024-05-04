import '../App.css';
import React from 'react';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to My Website!</h1>
      <p className="text-xl text-gray-700 text-center px-16">
        This is a landing page built with React and Tailwind CSS. Feel free to customize it for your needs.
      </p>
    </div>
  );
}

export default LandingPage;
