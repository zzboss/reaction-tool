import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface ZodiacSign {
  id: string;
  name: string;
  date: string;
  element: string;
  planet: string;
  traits: string[];
}

interface ZodiacCompatibilityProps {
  zodiacSigns: ZodiacSign[];
}

// Mock compatibility data (would come from API in real app)
const COMPATIBILITY_SCORES: {[key: string]: {[key: string]: number}} = {
  'aries': {
    'aries': 70, 'taurus': 40, 'gemini': 85, 'cancer': 50, 
    'leo': 90, 'virgo': 45, 'libra': 65, 'scorpio': 55,
    'sagittarius': 95, 'capricorn': 35, 'aquarius': 80, 'pisces': 50
  },
  'taurus': {
    'aries': 40, 'taurus': 75, 'gemini': 45, 'cancer': 85,
    'leo': 60, 'virgo': 90, 'libra': 75, 'scorpio': 85,
    'sagittarius': 35, 'capricorn': 95, 'aquarius': 40, 'pisces': 85
  },
  // Add more compatibility scores for other signs...
};

// Generate missing compatibility scores
Object.keys(COMPATIBILITY_SCORES).forEach(sign1 => {
  Object.keys(COMPATIBILITY_SCORES[sign1]).forEach(sign2 => {
    if (!COMPATIBILITY_SCORES[sign2]) {
      COMPATIBILITY_SCORES[sign2] = {};
    }
    COMPATIBILITY_SCORES[sign2][sign1] = COMPATIBILITY_SCORES[sign1][sign2];
  });
});

const ZodiacCompatibility: React.FC<ZodiacCompatibilityProps> = ({ zodiacSigns }) => {
  const [sign1, setSign1] = useState<string>(zodiacSigns[0].id);
  const [sign2, setSign2] = useState<string>(zodiacSigns[7].id);
  
  const compatibilityScore = COMPATIBILITY_SCORES[sign1]?.[sign2] || 50;
  
  const getScoreColor = (score: number): string => {
    if (score >= 85) return 'text-pink-500';
    if (score >= 70) return 'text-purple-400';
    if (score >= 50) return 'text-blue-400';
    return 'text-gray-400';
  };
  
  const getScoreText = (score: number): string => {
    if (score >= 85) return '非常契合';
    if (score >= 70) return '较为契合';
    if (score >= 50) return '一般契合';
    if (score >= 35) return '不太契合';
    return '矛盾较多';
  };

  const getElementColor = (element: string): string => {
    const colors: { [key: string]: string } = {
      'fire': 'from-red-500 to-orange-500',
      'earth': 'from-green-600 to-emerald-500',
      'air': 'from-blue-500 to-cyan-500',
      'water': 'from-indigo-600 to-purple-500'
    };
    
    return colors[element] || 'from-purple-600 to-pink-500';
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Panel - Sign Selection */}
      <div className="lg:col-span-1">
        <div className="bg-gray-900/50 rounded-lg border border-purple-700/20 p-4 shadow-inner">
          <h3 className="text-lg font-medium text-white mb-4">选择两个星座</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">第一个星座</label>
              <select
                value={sign1}
                onChange={(e) => setSign1(e.target.value)}
                className="w-full bg-gray-800 border border-purple-700/30 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {zodiacSigns.map((sign) => (
                  <option key={sign.id} value={sign.id}>{sign.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">第二个星座</label>
              <select
                value={sign2}
                onChange={(e) => setSign2(e.target.value)}
                className="w-full bg-gray-800 border border-purple-700/30 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {zodiacSigns.map((sign) => (
                  <option key={sign.id} value={sign.id}>{sign.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-center py-4">
              <div className="relative w-16 h-16">
                <Heart 
                  size={64} 
                  className={`absolute inset-0 ${getScoreColor(compatibilityScore)} animate-pulse`} 
                  fill="currentColor" 
                />
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
                  {compatibilityScore}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Panel - Compatibility Details */}
      <div className="lg:col-span-2">
        <div className="bg-gray-900/50 rounded-lg border border-purple-700/20 shadow-inner overflow-hidden">
          <div className="flex items-stretch h-[200px]">
            {/* First Sign */}
            <div className="flex-1">
              {zodiacSigns.filter(s => s.id === sign1).map(sign => (
                <div key={sign.id} className="h-full flex flex-col">
                  <div className={`p-4 bg-gradient-to-b ${getElementColor(sign.element)}`}>
                    <h3 className="text-xl font-bold text-white">{sign.name}</h3>
                    <p className="text-white/80 text-sm">{sign.date}</p>
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-center items-center">
                    <div className="text-center">
                      <div className="text-sm text-gray-400 mb-1">元素属性</div>
                      <div className="text-white font-medium">
                        {sign.element === 'fire' && '火象星座'}
                        {sign.element === 'earth' && '土象星座'}
                        {sign.element === 'air' && '风象星座'}
                        {sign.element === 'water' && '水象星座'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Compatibility Indicator */}
            <div className="w-20 flex flex-col items-center justify-center bg-gray-900/70">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" className="text-purple-400" />
                <polyline points="12 5 19 12 12 19" className="text-purple-400" />
              </svg>
            </div>
            
            {/* Second Sign */}
            <div className="flex-1">
              {zodiacSigns.filter(s => s.id === sign2).map(sign => (
                <div key={sign.id} className="h-full flex flex-col">
                  <div className={`p-4 bg-gradient-to-b ${getElementColor(sign.element)}`}>
                    <h3 className="text-xl font-bold text-white">{sign.name}</h3>
                    <p className="text-white/80 text-sm">{sign.date}</p>
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-center items-center">
                    <div className="text-center">
                      <div className="text-sm text-gray-400 mb-1">元素属性</div>
                      <div className="text-white font-medium">
                        {sign.element === 'fire' && '火象星座'}
                        {sign.element === 'earth' && '土象星座'}
                        {sign.element === 'air' && '风象星座'}
                        {sign.element === 'water' && '水象星座'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-5 border-t border-purple-700/30">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">契合度</h3>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(compatibilityScore)}`}>
                {getScoreText(compatibilityScore)}
              </div>
            </div>
            
            <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden mb-6">
              <div 
                className={`h-full ${
                  compatibilityScore >= 85 ? 'bg-gradient-to-r from-pink-500 to-rose-500' :
                  compatibilityScore >= 70 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                  compatibilityScore >= 50 ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                  'bg-gradient-to-r from-gray-500 to-blue-500'
                }`} 
                style={{ width: `${compatibilityScore}%` }}
              ></div>
            </div>
            
            <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-700/30">
              <h4 className="text-purple-300 font-medium mb-2">匹配分析</h4>
              <p className="text-white">
                {compatibilityScore >= 85 ? 
                  `${zodiacSigns.find(s => s.id === sign1)?.name}和${zodiacSigns.find(s => s.id === sign2)?.name}有着极高的契合度。你们拥有相似的价值观和生活方式，能够很好地理解彼此的需求和愿望。这种组合往往能够建立稳固、和谐的关系。` :
                compatibilityScore >= 70 ?
                  `${zodiacSigns.find(s => s.id === sign1)?.name}和${zodiacSigns.find(s => s.id === sign2)?.name}有不错的契合度。虽然会有一些小分歧，但总体来说你们能够相互理解，建立良好的关系。通过良好的沟通，你们的关系可以更加和谐。` :
                compatibilityScore >= 50 ?
                  `${zodiacSigns.find(s => s.id === sign1)?.name}和${zodiacSigns.find(s => s.id === sign2)?.name}的契合度中等。你们在某些方面存在差异，可能需要更多的沟通和理解。通过努力，你们可以克服这些差异，建立稳定的关系。` :
                  `${zodiacSigns.find(s => s.id === sign1)?.name}和${zodiacSigns.find(s => s.id === sign2)?.name}的契合度较低。你们在性格和价值观上存在较大差异，可能需要付出更多努力来维持关系。建议在重要决策上多沟通，尊重彼此的差异。`
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZodiacCompatibility;