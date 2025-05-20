import React from 'react';

interface ZodiacSign {
  id: string;
  name: string;
  date: string;
  element: string;
  planet: string;
  traits: string[];
}

interface ZodiacCardProps {
  sign: ZodiacSign;
}

const ZodiacCard: React.FC<ZodiacCardProps> = ({ sign }) => {
  const getElementColor = (element: string): string => {
    const colors: { [key: string]: string } = {
      'fire': 'from-red-500 to-orange-500 border-orange-500/30',
      'earth': 'from-green-600 to-emerald-500 border-emerald-500/30',
      'air': 'from-blue-500 to-cyan-500 border-cyan-500/30',
      'water': 'from-indigo-600 to-purple-500 border-purple-500/30'
    };
    
    return colors[element] || 'from-purple-600 to-pink-500 border-pink-500/30';
  };

  const getElementName = (element: string): string => {
    const names: { [key: string]: string } = {
      'fire': '火象',
      'earth': '土象',
      'air': '风象',
      'water': '水象'
    };
    
    return names[element] || element;
  };

  return (
    <div className={`bg-gray-900/50 rounded-lg overflow-hidden border ${
      sign.element === 'fire' ? 'border-orange-500/30' :
      sign.element === 'earth' ? 'border-emerald-500/30' :
      sign.element === 'air' ? 'border-cyan-500/30' :
      'border-purple-500/30'
    } shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl`}>
      <div className={`p-4 bg-gradient-to-r ${getElementColor(sign.element)}`}>
        <h3 className="text-xl font-bold text-white">{sign.name}</h3>
        <p className="text-white/80 text-sm">{sign.date}</p>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mb-4">
          <div>
            <span className="text-gray-400">守护星</span>
            <p className="text-white">{sign.planet}</p>
          </div>
          <div>
            <span className="text-gray-400">元素</span>
            <p className="text-white">{getElementName(sign.element)}</p>
          </div>
        </div>
        
        <div className="mt-3">
          <h4 className="text-purple-300 font-medium mb-2">个性特质</h4>
          <div className="flex flex-wrap gap-2">
            {sign.traits.map((trait, index) => (
              <span 
                key={index}
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  sign.element === 'fire' ? 'bg-red-900/40 text-orange-300' :
                  sign.element === 'earth' ? 'bg-green-900/40 text-emerald-300' :
                  sign.element === 'air' ? 'bg-blue-900/40 text-cyan-300' :
                  'bg-indigo-900/40 text-purple-300'
                }`}
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZodiacCard;