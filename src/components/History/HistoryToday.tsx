import React, { useState, useEffect } from 'react';
import { Calendar, ChevronRight, Clock, Info } from 'lucide-react';

interface HistoricalEvent {
  id: number;
  year: number;
  event: string;
  details: string;
  category: string;
}

// Mock data - in a real app, this would come from an API
const MOCK_EVENTS: HistoricalEvent[] = [
  {
    id: 1,
    year: 1969,
    event: '人类首次登月',
    details: '阿波罗11号的宇航员尼尔·阿姆斯特朗成为第一个踏上月球表面的人类，他说出了著名的"这是个人的一小步，却是人类的一大步"。',
    category: 'science'
  },
  {
    id: 2,
    year: 1944,
    event: 'normandy 登陆',
    details: '第二次世界大战期间，盟军在诺曼底海滩登陆，开始了欧洲西部战线的反攻。这次行动被称为"霸王行动"，是历史上规模最大的两栖登陆作战。',
    category: 'military'
  },
  {
    id: 3,
    year: 1989,
    event: '柏林墙倒塌',
    details: '柏林墙是冷战时期分隔东西柏林的混凝土屏障，其倒塌标志着东西德分裂时代的结束和冷战的实质性终结。',
    category: 'politics'
  },
  {
    id: 4,
    year: 1912,
    event: '泰坦尼克号沉没',
    details: '被称为"不沉之船"的豪华客轮泰坦尼克号在首航途中撞上冰山沉没，导致1500多人死亡，成为和平时期最严重的海难之一。',
    category: 'disaster'
  },
  {
    id: 5,
    year: 2001,
    event: '911恐怖袭击',
    details: '恐怖分子劫持了四架商业客机，将其中两架撞向纽约世贸中心双塔，一架撞向五角大楼，另一架在宾夕法尼亚州坠毁。这次袭击导致近3000人死亡。',
    category: 'disaster'
  }
];

const HistoryToday: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<HistoricalEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate API fetch with a delay
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch from an API based on the current month and day
        // const response = await fetch(`/api/history?month=${currentDate.getMonth() + 1}&day=${currentDate.getDate()}`);
        // const data = await response.json();
        
        // Using mock data
        setTimeout(() => {
          setEvents(MOCK_EVENTS);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching historical events:', error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [currentDate]);

  const formatDate = (date: Date): string => {
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      'science': 'bg-blue-500',
      'politics': 'bg-purple-500',
      'military': 'bg-red-500',
      'disaster': 'bg-amber-500',
      'culture': 'bg-green-500'
    };
    
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <div className="bg-gradient-to-b from-gray-900/70 to-indigo-900/40 rounded-xl border border-indigo-700/30 shadow-xl backdrop-blur-sm overflow-hidden">
        <div className="p-5 border-b border-indigo-700/30">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="text-indigo-400" size={24} />
            历史上的今天
          </h2>
          <p className="text-indigo-200 mt-1 flex items-center gap-1.5">
            <Clock size={16} />
            {formatDate(currentDate)}
          </p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Events List */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900/50 rounded-lg border border-indigo-700/20 overflow-hidden shadow-inner h-[500px] flex flex-col">
                <div className="p-3 bg-gray-800/70 border-b border-indigo-700/30">
                  <h3 className="text-sm font-medium text-indigo-200">历史事件</h3>
                </div>
                
                {isLoading ? (
                  <div className="flex-1 flex items-center justify-center p-4">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-12 w-12 rounded-full bg-indigo-700/30 mb-3"></div>
                      <div className="h-4 w-32 bg-indigo-700/30 rounded mb-2"></div>
                      <div className="h-3 w-48 bg-indigo-700/20 rounded"></div>
                    </div>
                  </div>
                ) : events.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center p-4 text-indigo-300">
                    <p>暂无历史事件</p>
                  </div>
                ) : (
                  <div className="flex-1 overflow-y-auto">
                    <ul className="divide-y divide-indigo-700/20">
                      {events.map((event) => (
                        <li 
                          key={event.id}
                          className={`p-4 hover:bg-indigo-600/10 transition-colors cursor-pointer relative ${
                            selectedEvent?.id === event.id ? 'bg-indigo-600/20' : ''
                          }`}
                          onClick={() => setSelectedEvent(event)}
                        >
                          <div className={`absolute left-0 top-0 bottom-0 w-1 ${getCategoryColor(event.category)}`}></div>
                          <div className="pl-2">
                            <span className="text-indigo-400 font-bold">{event.year}</span>
                            <h4 className="text-white font-medium mt-1">{event.event}</h4>
                          </div>
                          <ChevronRight size={18} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-400" />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Panel - Event Details */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900/50 rounded-lg border border-indigo-700/20 h-[500px] overflow-hidden shadow-inner flex flex-col">
                <div className="p-3 bg-gray-800/70 border-b border-indigo-700/30">
                  <h3 className="text-sm font-medium text-indigo-200">事件详情</h3>
                </div>
                
                {!selectedEvent ? (
                  <div className="flex-1 flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-indigo-900/30 border border-indigo-700/30 flex items-center justify-center">
                        <Info className="h-10 w-10 text-indigo-400" />
                      </div>
                      <h3 className="text-lg font-medium text-white mb-1">选择一个历史事件</h3>
                      <p className="text-indigo-300 max-w-xs mx-auto">点击左侧列表中的事件查看详细信息</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 p-6 overflow-y-auto">
                    <div className="flex items-start mb-4">
                      <div className={`w-12 h-12 rounded-full ${getCategoryColor(selectedEvent.category)} flex items-center justify-center flex-shrink-0 mr-4`}>
                        <span className="text-white font-bold text-lg">{selectedEvent.year.toString().substring(2)}</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-1">{selectedEvent.event}</h2>
                        <p className="text-indigo-300">{selectedEvent.year}年</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-indigo-900/20 p-4 rounded-lg border border-indigo-700/30">
                      <h4 className="text-lg font-medium text-indigo-200 mb-3">事件详情</h4>
                      <p className="text-white leading-relaxed">{selectedEvent.details}</p>
                    </div>
                    
                    {/* Additional content could go here like images, references, etc. */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryToday;