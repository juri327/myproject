'use client';

import { MessageCircle } from 'lucide-react';

export default function ChatButton() {
  // 指定のURLに遷移する関数
  const openChatUrl = () => {
    // 新しいウィンドウでDifyのチャットボットURLを開く
    window.open('https://udify.app/chatbot/lX4fg5mPtQWsoFK1', '_blank');
  };

  return (
    <div 
      className="fixed bottom-20 right-4 z-50 bg-[#B89B76] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#A58B66] transition-colors duration-200"
      onClick={openChatUrl}
      aria-label="チャットを開く"
    >
      <MessageCircle className="w-6 h-6" />
    </div>
  );
}
