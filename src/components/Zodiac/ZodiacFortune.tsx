import React, { useState } from 'react';
import { Stars, Calendar, Heart, Info, ArrowRight, Moon, Sun } from 'lucide-react';
import ZodiacCard from './ZodiacCard';
import ZodiacCompatibility from './ZodiacCompatibility';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';

// Zodiac sign data
const ZODIAC_SIGNS = [
  { id: 'aries', name: '白羊座', date: '3.21-4.19', element: 'fire', planet: 'Mars', traits: ['勇敢', '热情', '冲动'] },
  { id: 'taurus', name: '金牛座', date: '4.20-5.20', element: 'earth', planet: 'Venus', traits: ['耐心', '可靠', '固执'] },
  { id: 'gemini', name: '双子座', date: '5.21-6.21', element: 'air', planet: 'Mercury', traits: ['好奇', '适应性强', '善变'] },
  { id: 'cancer', name: '巨蟹座', date: '6.22-7.22', element: 'water', planet: 'Moon', traits: ['富有同情心', '情感丰富', '保护欲强'] },
  { id: 'leo', name: '狮子座', date: '7.23-8.22', element: 'fire', planet: 'Sun', traits: ['自信', '慷慨', '戏剧性'] },
  { id: 'virgo', name: '处女座', date: '8.23-9.22', element: 'earth', planet: 'Mercury', traits: ['分析型', '实际', '挑剔'] },
  { id: 'libra', name: '天秤座', date: '9.23-10.23', element: 'air', planet: 'Venus', traits: ['平衡', '外交', '优柔寡断'] },
  { id: 'scorpio', name: '天蝎座', date: '10.24-11.21', element: 'water', planet: 'Pluto', traits: ['热情', '坚定', '神秘'] },
  { id: 'sagittarius', name: '射手座', date: '11.22-12.21', element: 'fire', planet: 'Jupiter', traits: ['乐观', '冒险', '诚实'] },
  { id: 'capricorn', name: '摩羯座', date: '12.22-1.19', element: 'earth', planet: 'Saturn', traits: ['有纪律', '负责', '自控'] },
  { id: 'aquarius', name: '水瓶座', date: '1.20-2.18', element: 'air', planet: 'Uranus', traits: ['创新', '独立', '人道主义'] },
  { id: 'pisces', name: '双鱼座', date: '2.19-3.20', element: 'water', planet: 'Neptune', traits: ['富有同情心', '直觉', '艺术'] }
];

// Mock fortune data
const MOCK_FORTUNE = {
  daily: '今天你将有机会展示你的才能，但要注意不要过度自信。健康方面需要关注休息和饮食。财运良好，可能有意外收获。',
  weekly: '本周工作上会遇到一些挑战，但你有能力克服它们。感情方面有些波动，需要更多的沟通和理解。财务上要避免冲动消费。',
  monthly: '这个月是反思和计划的好时机。事业上可能会有新的机会，但需要你主动把握。感情上有机会遇到志同道合的人。健康方面需要注意压力管理。',
  yearly: '这一年你将经历重要的个人成长。职业上可能有重大变动，但总体向好发展。感情方面需要更多的包容和理解。财务状况将逐步改善，但要避免冒险投资。'
};

type FortuneType = 'daily' | 'weekly' | 'monthly' | 'yearly';

const ZodiacFortune: React.FC = () => {
  const [selectedSign, setSelectedSign] = useState(ZODIAC_SIGNS[0]);
  const [fortuneType, setFortuneType] = useState<FortuneType>('daily');
  const [activeTab, setActiveTab] = useState<string>('fortune');

  const getElementColor = (element: string): string => {
    const colors: { [key: string]: string } = {
      'fire': 'from-red-500 to-orange-500',
      'earth': 'from-green-600 to-emerald-500',
      'air': 'from-blue-500 to-cyan-500',
      'water': 'from-indigo-600 to-purple-500'
    };
    
    return colors[element] || 'from-purple-600 to-pink-500';
  };

  const getFortuneIcon = (type: FortuneType) => {
    switch (type) {
      case 'daily':
        return <Sun size={18} />;
      case 'weekly':
        return <Calendar size={18} />;
      case 'monthly':
        return <Moon size={18} />;
      case 'yearly':
        return <Stars size={18} />;
      default:
        return <Sun size={18} />;
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <div className="bg-gradient-to-b from-gray-900/70 to-purple-900/40 rounded-xl border border-purple-700/30 shadow-xl backdrop-blur-sm overflow-hidden">
        <div className="p-5 border-b border-purple-700/30">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Stars className="text-purple-400" size={24} />
            星座运势
          </h2>
          <p className="text-purple-200 mt-1">
            探索十二星座的命运和特质
          </p>
        </div>
        
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full md:w-auto bg-gray-900/70 border border-purple-700/30 mb-6">
              <TabsTrigger 
                value="fortune" 
                className="data-[state=active]:bg-purple-700/40 data-[state=active]:text-white text-purple-200 flex items-center gap-1.5"
              >
                <Moon size={16} />
                星座运势
              </TabsTrigger>
              <TabsTrigger 
                value="compatibility" 
                className="data-[state=active]:bg-purple-700/40 data-[state=active]:text-white text-purple-200 flex items-center gap-1.5"
              >
                <Heart size={16} />
                星座配对
              </TabsTrigger>
              <TabsTrigger 
                value="info" 
                className="data-[state=active]:bg-purple-700/40 data-[state=active]:text-white text-purple-200 flex items-center gap-1.5"
              >
                <Info size={16} />
                星座资料
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="fortune" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Panel - Zodiac Signs */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-900/50 rounded-lg border border-purple-700/20 p-4 shadow-inner h-[500px] overflow-y-auto">
                    <h3 className="text-md font-medium text-white mb-4">选择星座</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
                      {ZODIAC_SIGNS.map((sign) => (
                        <div
                          key={sign.id}
                          className={`rounded-lg p-3 cursor-pointer transition-all ${
                            selectedSign.id === sign.id 
                              ? `bg-gradient-to-br ${getElementColor(sign.element)} text-white shadow-lg` 
                              : 'bg-gray-800/50 border border-purple-700/20 hover:bg-gray-800 text-white'
                          }`}
                          onClick={() => setSelectedSign(sign)}
                        >
                          <div className="flex flex-col items-center text-center">
                            <span className="text-lg font-medium">{sign.name}</span>
                            <span className="text-xs opacity-80 mt-1">{sign.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right Panel - Fortune Details */}
                <div className="lg:col-span-2">
                  <div className="bg-gray-900/50 rounded-lg border border-purple-700/20 shadow-inner h-[500px] overflow-hidden flex flex-col">
                    <div className={`p-4 bg-gradient-to-r ${getElementColor(selectedSign.element)} flex items-center`}>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white">{selectedSign.name}</h2>
                        <p className="text-white/80 text-sm">{selectedSign.date}</p>
                      </div>
                      <div className="bg-white/20 px-3 py-1.5 rounded-full text-xs text-white font-medium">
                        {selectedSign.element === 'fire' && '火象星座'}
                        {selectedSign.element === 'earth' && '土象星座'}
                        {selectedSign.element === 'air' && '风象星座'}
                        {selectedSign.element === 'water' && '水象星座'}
                      </div>
                    </div>
                    
                    <div className="p-4 border-b border-purple-700/30 bg-gray-800/30">
                      <div className="flex space-x-2">
                        {(['daily', 'weekly', 'monthly', 'yearly'] as FortuneType[]).map((type) => (
                          <button
                            key={type}
                            onClick={() => setFortuneType(type)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 ${
                              fortuneType === type
                                ? `bg-gradient-to-r ${getElementColor(selectedSign.element)} text-white`
                                : 'bg-gray-800 text-white/70 hover:bg-gray-700'
                            }`}
                          >
                            {getFortuneIcon(type)}
                            {type === 'daily' && '今日'}
                            {type === 'weekly' && '本周'}
                            {type === 'monthly' && '本月'}
                            {type === 'yearly' && '今年'}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-5">
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-700/30 mb-4">
                        <h4 className="text-lg font-medium text-purple-200 mb-2">
                          {fortuneType === 'daily' && '今日运势'}
                          {fortuneType === 'weekly' && '本周运势'}
                          {fortuneType === 'monthly' && '本月运势'}
                          {fortuneType === 'yearly' && '今年运势'}
                        </h4>
                        <p className="text-white leading-relaxed">
                          {MOCK_FORTUNE[fortuneType]}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-700/30">
                          <h5 className="font-medium text-purple-200 mb-1.5 flex items-center gap-1.5">
                            <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
                            爱情运势
                          </h5>
                          <div className="flex items-center gap-1 text-white">
                            <span className="text-xs">低</span>
                            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-pink-500 to-red-500" style={{ width: '65%' }}></div>
                            </div>
                            <span className="text-xs">高</span>
                          </div>
                        </div>
                        
                        <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-700/30">
                          <h5 className="font-medium text-purple-200 mb-1.5 flex items-center gap-1.5">
                            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                            财运
                          </h5>
                          <div className="flex items-center gap-1 text-white">
                            <span className="text-xs">低</span>
                            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-yellow-500 to-amber-500" style={{ width: '80%' }}></div>
                            </div>
                            <span className="text-xs">高</span>
                          </div>
                        </div>
                        
                        <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-700/30">
                          <h5 className="font-medium text-purple-200 mb-1.5 flex items-center gap-1.5">
                            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                            事业运
                          </h5>
                          <div className="flex items-center gap-1 text-white">
                            <span className="text-xs">低</span>
                            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: '70%' }}></div>
                            </div>
                            <span className="text-xs">高</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="compatibility" className="mt-0">
              <ZodiacCompatibility zodiacSigns={ZODIAC_SIGNS} />
            </TabsContent>
            
            <TabsContent value="info" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ZODIAC_SIGNS.map((sign) => (
                  <ZodiacCard key={sign.id} sign={sign} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ZodiacFortune;