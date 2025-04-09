'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';

const HealthRecordDialog = ({ isOpen, onClose, onSave }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  
  const moods = [
    { emoji: '😄', label: '非常に良い', value: 'excellent' },
    { emoji: '😊', label: '良好', value: 'good' },
    { emoji: '😐', label: '普通', value: 'normal' },
    { emoji: '😣', label: '体調不良', value: 'bad' },
    { emoji: '😫', label: '悪い', value: 'terrible' }
  ];
  
  const handleSave = () => {
    if (selectedMood) {
      onSave({
        mood: selectedMood,
        note,
        date: new Date()
      });
      setSelectedMood(null);
      setNote('');
      onClose();
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>今日の体調を記録</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <h3 className="text-sm font-medium mb-3">体調はいかがですか？</h3>
          
          <div className="grid grid-cols-5 gap-2 mb-6">
            {moods.map((mood) => (
              <button
                key={mood.value}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                  selectedMood?.value === mood.value 
                    ? 'bg-[#FFF2EC] border-2 border-[#FF8E6E]' 
                    : 'bg-white border border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedMood(mood)}
              >
                <span className="text-2xl mb-1">{mood.emoji}</span>
                <span className="text-xs text-center">{mood.label}</span>
              </button>
            ))}
          </div>
          
          <h3 className="text-sm font-medium mb-2">メモ（任意）</h3>
          <textarea
            className="w-full border border-gray-200 rounded-lg p-3 text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#FF8E6E]/50"
            placeholder="今日の体調についてメモを残せます..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!selectedMood}
          >
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HealthRecordDialog;
