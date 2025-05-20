import React, { useState } from 'react';
import Navbar from './components/Layout/Navbar';
import ImageProcessor from './components/ImageProcessing/ImageProcessor';
import HistoryToday from './components/History/HistoryToday';
import ZodiacFortune from './components/Zodiac/ZodiacFortune';

function App() {
  const [activeTab, setActiveTab] = useState('image');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 text-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto py-6">
        {activeTab === 'image' && <ImageProcessor />}
        {activeTab === 'history' && <HistoryToday />}
        {activeTab === 'zodiac' && <ZodiacFortune />}
      </main>
      
      <footer className="py-4 text-center text-purple-300 text-sm">
        <p>Cosmic Tools &copy; {new Date().getFullYear()} | 为您提供图片处理、历史回顾和星座运势</p>
      </footer>
    </div>
  );
}

export default App;