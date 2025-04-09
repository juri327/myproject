'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from './ui/button';

const CalendarView = ({ onClose, onAddEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventType, setEventType] = useState('period-start');
  const [events, setEvents] = useState([
    // サンプルデータ
    { date: '2025-04-01', type: 'period-start' },
    { date: '2025-04-05', type: 'period-end' },
    { date: '2025-04-15', type: 'este' },
  ]);

  // 月の名前
  const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
  
  // 曜日の名前
  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];

  // 前の月へ
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // 次の月へ
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // カレンダーのグリッドを生成
  const generateCalendarGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // 月の最初の日
    const firstDay = new Date(year, month, 1);
    // 月の最後の日
    const lastDay = new Date(year, month + 1, 0);
    
    // 月の最初の日の曜日（0: 日曜日, 1: 月曜日, ..., 6: 土曜日）
    const firstDayOfWeek = firstDay.getDay();
    
    // カレンダーグリッドの日数（前月の日 + 当月の日 + 次月の日）
    const daysInGrid = [];
    
    // 前月の日を追加
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, -firstDayOfWeek + i + 1);
      daysInGrid.push({
        date: prevMonthDay,
        isCurrentMonth: false,
        isToday: isSameDay(prevMonthDay, new Date()),
      });
    }
    
    // 当月の日を追加
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentMonthDay = new Date(year, month, i);
      daysInGrid.push({
        date: currentMonthDay,
        isCurrentMonth: true,
        isToday: isSameDay(currentMonthDay, new Date()),
      });
    }
    
    // 次月の日を追加（6行×7列 = 42マスになるまで）
    const remainingDays = 42 - daysInGrid.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonthDay = new Date(year, month + 1, i);
      daysInGrid.push({
        date: nextMonthDay,
        isCurrentMonth: false,
        isToday: isSameDay(nextMonthDay, new Date()),
      });
    }
    
    return daysInGrid;
  };

  // 同じ日かどうかをチェック
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // 日付をフォーマット（YYYY-MM-DD）
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 日付のイベントを取得
  const getEventsForDate = (date) => {
    const dateStr = formatDate(date);
    return events.filter(event => event.date === dateStr);
  };

  // 日付をクリックしたときの処理
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowEventModal(true);
  };

  // イベントを追加
  const addEvent = () => {
    if (!selectedDate) return;
    
    const newEvent = {
      date: formatDate(selectedDate),
      type: eventType
    };
    
    // 同じ日の同じタイプのイベントがあれば削除（トグル動作）
    const existingEventIndex = events.findIndex(
      event => event.date === newEvent.date && event.type === newEvent.type
    );
    
    if (existingEventIndex !== -1) {
      const updatedEvents = [...events];
      updatedEvents.splice(existingEventIndex, 1);
      setEvents(updatedEvents);
    } else {
      setEvents([...events, newEvent]);
    }
    
    setShowEventModal(false);
    
    // 親コンポーネントにイベント追加を通知
    if (onAddEvent) {
      onAddEvent(newEvent);
    }
  };

  // イベントのスタイルを取得
  const getEventStyle = (type) => {
    switch (type) {
      case 'period-start':
        return 'bg-[#FF8E6E] text-white text-xs px-1 rounded-sm';
      case 'period-end':
        return 'bg-[#FF8E6E]/70 text-white text-xs px-1 rounded-sm';
      case 'este':
        return 'bg-[#7ECBD5] text-white text-xs px-1 rounded-sm';
      default:
        return '';
    }
  };

  // イベントのラベルを取得
  const getEventLabel = (type) => {
    switch (type) {
      case 'period-start':
        return '生理開始';
      case 'period-end':
        return '生理終了';
      case 'este':
        return 'エステ';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">カレンダー</h2>
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
      
      {/* カレンダーヘッダー */}
      <div className="flex justify-between items-center mb-4">
        <button 
          className="p-1 rounded-full hover:bg-gray-100"
          onClick={prevMonth}
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-lg font-medium">
          {currentDate.getFullYear()}年{monthNames[currentDate.getMonth()]}
        </h3>
        <button 
          className="p-1 rounded-full hover:bg-gray-100"
          onClick={nextMonth}
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      {/* 曜日ヘッダー */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day, index) => (
          <div 
            key={index} 
            className={`text-center text-sm font-medium py-1 ${index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : ''}`}
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* カレンダーグリッド */}
      <div className="grid grid-cols-7 gap-1">
        {generateCalendarGrid().map((dayInfo, index) => {
          const dateEvents = getEventsForDate(dayInfo.date);
          return (
            <div 
              key={index} 
              className={`
                min-h-[60px] p-1 border rounded-md relative
                ${dayInfo.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'}
                ${dayInfo.isToday ? 'border-[#FF8E6E]' : 'border-gray-100'}
                hover:bg-gray-50 cursor-pointer
              `}
              onClick={() => handleDateClick(dayInfo.date)}
            >
              <div className={`text-right text-sm ${dayInfo.isToday ? 'font-bold text-[#FF8E6E]' : ''}`}>
                {dayInfo.date.getDate()}
              </div>
              <div className="mt-1 space-y-1">
                {dateEvents.map((event, eventIndex) => (
                  <div 
                    key={eventIndex} 
                    className={getEventStyle(event.type)}
                  >
                    {getEventLabel(event.type)}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* イベント追加モーダル */}
      {showEventModal && selectedDate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-80 max-w-full">
            <h3 className="text-lg font-medium mb-4">
              {selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月{selectedDate.getDate()}日
            </h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="period-start" 
                  name="event-type" 
                  value="period-start"
                  checked={eventType === 'period-start'}
                  onChange={() => setEventType('period-start')}
                  className="mr-2"
                />
                <label htmlFor="period-start" className="text-sm">生理開始</label>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="period-end" 
                  name="event-type" 
                  value="period-end"
                  checked={eventType === 'period-end'}
                  onChange={() => setEventType('period-end')}
                  className="mr-2"
                />
                <label htmlFor="period-end" className="text-sm">生理終了</label>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="este" 
                  name="event-type" 
                  value="este"
                  checked={eventType === 'este'}
                  onChange={() => setEventType('este')}
                  className="mr-2"
                />
                <label htmlFor="este" className="text-sm">エステ予約</label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline"
                onClick={() => setShowEventModal(false)}
              >
                キャンセル
              </Button>
              <Button 
                onClick={addEvent}
              >
                保存
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
