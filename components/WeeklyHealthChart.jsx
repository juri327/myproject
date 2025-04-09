'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

// Chart.jsの必要なコンポーネントを登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const WeeklyHealthChart = () => {
  // 今日の日付を取得
  const today = new Date();
  
  // 過去7日間の日付を生成
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (6 - i));
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });
  
  // 体調スコアのサンプルデータ
  const healthScores = [
    { value: 4, label: '良好' },
    { value: 3.5, label: '良好' },
    { value: 3, label: '普通' },
    { value: 2, label: '体調不良' },
    { value: 2.5, label: '普通' },
    { value: 3.5, label: '良好' }
  ];
  
  // 日付ラベル（固定値で画像に合わせる）
  const dateLabels = ['3/16', '3/17', '3/18', '3/19', '3/20', '3/21'];
  
  // 絵文字マッピング
  const emojiMap = {
    '非常に良い': '😄',
    '良好': '😊',
    '普通': '😐',
    '体調不良': '😣',
    '悪い': '😫'
  };
  
  // 絵文字のサイズ調整
  const emojiSize = "1.5rem";
  
  // グラフのデータ
  const data = {
    labels: dateLabels,
    datasets: [
      {
        label: '体調スコア',
        data: healthScores.map(score => score.value),
        borderColor: '#FF8E6E',
        backgroundColor: 'rgba(255, 142, 110, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#FFF',
        pointBorderColor: '#FF8E6E',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };
  
  // グラフのオプション
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 1,
        max: 5,
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
          borderDash: [5, 5],
        },
        ticks: {
          stepSize: 1,
          callback: function(value) {
            if (value === 5) return '良い';
            if (value === 3) return '普通';
            if (value === 1) return '悪い';
            return '';
          },
          font: {
            size: 12,
          },
          color: '#B89B76',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: '#B89B76',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function(context) {
            const score = context.raw;
            const label = healthScores[context.dataIndex].label;
            return `体調: ${label} (${score})`;
          },
        },
      },
    },
  };
  
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-black text-base font-medium">1週間の体調グラフ</h2>
        <div className="bg-[#FFF3E9] rounded-full px-3 py-1 text-xs text-[#FF8E6E] font-medium">
          体調スコア
        </div>
      </div>
      
      <div className="h-[200px] relative">
        <Line data={data} options={options} />
        
        {/* 絵文字オーバーレイ */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="flex justify-between items-center h-full px-[10%]">
            {healthScores.map((score, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center justify-center"
                style={{ 
                  position: 'absolute', 
                  left: `calc(${index} * (100% / 6) + 10%)`,
                  top: `calc(${100 - ((score.value - 1) / 4) * 100}%)`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  pointerEvents: 'none'
                }}
              >
                <div 
                  className="flex items-center justify-center bg-white rounded-full border-2 border-[#FF8E6E] w-7 h-7" 
                  style={{ position: 'relative', zIndex: 20 }}
                >
                  <span 
                    role="img" 
                    aria-label={score.label}
                    className="text-sm"
                  >
                    {emojiMap[score.label]}
                  </span>
                </div>

                {index !== 6 && score.label === '良好' && (
                  <span className="text-gray-500 text-xs mt-1">
                    良好
                  </span>
                )}
                {index !== 6 && score.label === '普通' && (
                  <span className="text-gray-500 text-xs mt-1">
                    普通
                  </span>
                )}
                {index !== 6 && score.label === '体調不良' && (
                  <span className="text-gray-500 text-xs mt-1">
                    体調不良
                  </span>
                )}

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyHealthChart;
