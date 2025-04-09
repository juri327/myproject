'use client';

import { useEffect } from 'react';

// グローバルに公開する関数
let toggleDifyChat = () => {
  console.log('Difyチャットボットがまだ初期化されていません');
};

export function openDifyChat() {
  toggleDifyChat();
}

export default function DifyChat() {
  useEffect(() => {
    // スクリプトを動的に追加
    const configScript = document.createElement('script');
    configScript.innerHTML = `
      window.difyChatbotConfig = {
        token: 'lX4fg5mPtQWsoFK1',
        // ボタンを非表示にする（カスタムボタンを使用するため）
        hideButton: true
      }
    `;
    document.body.appendChild(configScript);

    const embedScript = document.createElement('script');
    embedScript.src = 'https://udify.app/embed.min.js';
    embedScript.id = 'lX4fg5mPtQWsoFK1';
    embedScript.defer = true;
    
    // スクリプト読み込み完了時の処理
    embedScript.onload = () => {
      console.log('Difyチャットボットが読み込まれました');
      // グローバル関数を更新
      if (window.DifyChat && typeof window.DifyChat.toggle === 'function') {
        toggleDifyChat = () => {
          console.log('Difyチャットを開きます');
          window.DifyChat.toggle();
        };
      }
    };
    
    document.body.appendChild(embedScript);

    // スタイルを動的に追加
    const style = document.createElement('style');
    style.innerHTML = `
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 40rem !important;
        position: fixed !important;
        bottom: 90px !important;
        right: 20px !important;
        z-index: 9998 !important;
        border-radius: 10px !important;
        overflow: hidden !important;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15) !important;
      }
    `;
    document.head.appendChild(style);

    // クリーンアップ関数
    return () => {
      document.body.removeChild(configScript);
      document.body.removeChild(embedScript);
      document.head.removeChild(style);
    };
  }, []);

  return null; // このコンポーネントは何も表示しない
}
