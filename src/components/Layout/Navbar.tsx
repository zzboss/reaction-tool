import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '../ui/Tabs';
import { Image, History, Stars } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="w-full bg-gradient-to-r from-purple-900/90 to-indigo-900/90 backdrop-blur-md border-b border-purple-700/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-white mb-2 md:mb-0 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">Cosmic</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-400">Tools</span>
          </h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="w-full md:w-auto bg-purple-950/50 border border-purple-700/30">
              <TabsTrigger 
                value="image" 
                className="data-[state=active]:bg-purple-700/40 data-[state=active]:text-white text-purple-200 flex items-center gap-1.5"
              >
                <Image size={16} />
                <span className="hidden sm:inline">图片处理</span>
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="data-[state=active]:bg-purple-700/40 data-[state=active]:text-white text-purple-200 flex items-center gap-1.5"
              >
                <History size={16} />
                <span className="hidden sm:inline">历史上的今天</span>
              </TabsTrigger>
              <TabsTrigger 
                value="zodiac" 
                className="data-[state=active]:bg-purple-700/40 data-[state=active]:text-white text-purple-200 flex items-center gap-1.5"
              >
                <Stars size={16} />
                <span className="hidden sm:inline">星座运势</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </header>
  );
};

export default Navbar;