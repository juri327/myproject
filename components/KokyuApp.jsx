'use client';

import React, { useState, useRef, useEffect } from "react";
import ChatButton from "./ChatButton";
import WeeklyHealthChart from "./WeeklyHealthChart";
import CalendarView from "./CalendarView";
import HealthRecordDialog from "./HealthRecordDialog";
import { MessageCircle, Menu, Search, User, ShoppingBag, X, ChevronRight, Plus, Minus, Calendar, ChevronLeft, Home, Heart, Bell, Sparkles, Settings, Smile, ActivitySquare } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

const KokyuApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPeriodConfirm, setShowPeriodConfirm] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [showPhaseInfo, setShowPhaseInfo] = useState(false);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [showHealthRecord, setShowHealthRecord] = useState(false);
  const [healthRecords, setHealthRecords] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  
  // カルーセル用の参照
  const carouselRef = useRef(null);
  
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1;

  // サンプル商品データ
  const products = [
    { id: 1, type: "スキンケア", name: "KOKYU ENRICH セラムクレンジングクリーム 120g", price: "6,800円", priceNumber: 6800, description: "肌に優しい成分でメイクや汚れを落としながら、保湿成分を与えるセラムクレンジングクリームです。" },
    { id: 2, type: "インナーケア", name: "大豆Healthチップス 6個セット", price: "1,810円", priceNumber: 1810, description: "女性の健康をサポートする、大豆イソフラボンを豊富に含んだヘルシーなおやつです。" },
    { id: 3, type: "カウンセリング", name: "【初回60分】女性の為のストレスケア・メンタルヘルスケア オンラインカウセリング", price: "4,500円", priceNumber: 4500, description: "女性特有のストレスやホルモンバランスの乱れによる悩みに、専門家がオンラインでカウンセリングを行います。" }
  ];

  const handlePeriodButton = () => {
    setShowPeriodConfirm(true);
  };
  
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShowProductDialog(true);
  };
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  const addToCart = () => {
    setCartCount(prev => prev + quantity);
    setShowProductDialog(false);
  };

  return (
    <div className="min-h-screen bg-[#FDF7F2]">
      <div className="max-w-sm mx-auto bg-white min-h-screen relative overflow-hidden pb-16" style={{ maxWidth: '100%', width: '400px' }}>
        {/* ヘッダー */}
        <header className="bg-white py-3 px-4 border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <button onClick={() => setIsOpen(true)} className="text-black">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold tracking-wide text-black">K O K Y U</h1>
            <div className="flex gap-3">
              <button className="text-black">
                <User className="w-6 h-6" />
              </button>
              <button className="text-black relative">
                <ShoppingBag className="w-6 h-6" />
              </button>
              <button className="text-black relative" onClick={() => setShowNotification(!showNotification)}>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF8E6E] rounded-full flex items-center justify-center text-white text-xs">1</div>
                <Bell className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        {/* ステータスバー */}
        <div className="bg-[#E7F5F8] py-3 px-4 text-sm">
          <div className="flex items-center justify-between">
            <span>今のあなたは</span>
            <button 
              className="flex items-center" 
              onClick={() => setShowPhaseInfo(true)}
            >
              もやもや期(黄体後期) <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* 日付セクション */}
        <div className="bg-[#7ECBD5] text-white flex justify-between items-center p-4">
          <div className="text-center border-r border-white/30 pr-8 pl-4">
            <div className="text-3xl font-bold">3/21</div>
            <div className="text-xs">生理予定日</div>
            <div className="mt-1 bg-white/20 rounded-full px-2 py-0.5 text-xs inline-block">あと2日</div>
          </div>
          <div className="text-center border-r border-white/30 px-8">
            <div className="text-3xl font-bold">3/5</div>
            <div className="text-xs">排卵予定日</div>
          </div>
          <div className="text-center pl-8 pr-4 flex flex-col items-center">
            <div className="text-xl mb-1">☀️</div>
            <div className="text-xs">晴れ</div>
            <div className="text-lg font-bold">24°C</div>
          </div>
        </div>

        {/* 生理ボタン */}
        <div className="p-4">
          <button 
            className="w-full bg-[#FF8E6E] text-white py-3 rounded-lg font-medium"
            onClick={handlePeriodButton}
          >
            生理がきた
          </button>
        </div>

        {/* メインコンテンツ */}
        <div className="px-4 py-3">
          {/* 1週間の体調グラフ */}
          <div className="mt-2">
            <WeeklyHealthChart />
          </div>
          
          {/* クイックアクション */}
          <div className="mt-8 border-t pt-8">
            <div className="grid grid-cols-4 gap-3">
              <button className="flex flex-col items-center gap-1" onClick={() => setShowCalendar(true)}>
                <div className="w-16 h-16 rounded-full bg-[#FFF2EC] flex items-center justify-center text-[#FF8E6E]">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-xs">カレンダー</span>
              </button>
              <button 
                className="flex flex-col items-center gap-1"
                onClick={() => setShowHealthRecord(true)}
              >
                <div className="w-16 h-16 rounded-full bg-[#FFF2EC] flex items-center justify-center text-[#FF8E6E]">
                  <Smile className="w-6 h-6" />
                </div>
                <span className="text-xs">体調記録</span>
              </button>
              <button className="flex flex-col items-center gap-1">
                <div className="w-16 h-16 rounded-full bg-[#FFF2EC] flex items-center justify-center text-[#FF8E6E]">
                  <Heart className="w-6 h-6" />
                </div>
                <span className="text-xs">アドバイス</span>
              </button>
              <button className="flex flex-col items-center gap-1">
                <div className="w-16 h-16 rounded-full bg-[#FFF2EC] flex items-center justify-center text-[#FF8E6E]">
                  <Search className="w-6 h-6" />
                </div>
                <span className="text-xs">カロリー計算</span>
              </button>
            </div>
          </div>

          {/* おすすめ商品（カルーセル形式） */}
          <div className="mt-8">
            <h2 className="text-[#B89B76] text-sm font-medium mb-3">あなたにおすすめ</h2>
            <div className="relative">
              <div className="overflow-x-auto hide-scrollbar">
                <div ref={carouselRef} className="flex space-x-3 py-2 px-1 w-max product-carousel">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-[#F9F1E7] rounded-lg p-3 shadow-sm cursor-pointer min-w-[260px] max-w-[260px] flex-shrink-0"
                      onClick={() => handleProductClick(product)}
                    >
                      <span className="text-xs text-[#B89B76]/80 bg-white px-2 py-0.5 rounded-full">{product.type}</span>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex-1 pr-3">
                          <h3 className="text-[#B89B76] text-sm font-medium line-clamp-2">{product.name}</h3>
                          <p className="text-[#B89B76] text-xs mt-1">{product.price}</p>
                        </div>
                        <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-[#B89B76] text-xs">商品画像</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md text-[#B89B76] z-10 carousel-button"
                aria-label="前の商品へ"
                onClick={() => {
                  if (carouselRef.current) {
                    carouselRef.current.scrollBy({ left: -280, behavior: 'smooth' });
                  }
                }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md text-[#B89B76] z-10 carousel-button"
                aria-label="次の商品へ"
                onClick={() => {
                  if (carouselRef.current) {
                    carouselRef.current.scrollBy({ left: 280, behavior: 'smooth' });
                  }
                }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <ChatButton />
        
        {/* 通知 */}
        {showNotification && (
          <div className="fixed bottom-20 right-4 left-4 max-w-sm mx-auto bg-white rounded-lg shadow-lg p-3 z-20 border border-[#D3BC9B]/30">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-[#F9F1E7] flex items-center justify-center mt-0.5">
                  <span className="text-[#B89B76] text-lg">!</span>
                </div>
                <div>
                  <h3 className="text-[#B89B76] text-sm font-medium">生理前のアドバイス</h3>
                  <p className="text-gray-600 text-xs mt-1">
                    生理前はホルモンバランスの変化で肌荒れが起きやすい時期です。保湿を重視したスキンケアを心がけましょう。
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-[#B89B76] p-1 -mt-1 -mr-1" onClick={() => setShowNotification(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ダイアログ */}
        <Dialog open={showPeriodConfirm} onOpenChange={setShowPeriodConfirm}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>生理の開始を記録</DialogTitle>
              <DialogDescription>
                今日から生理が始まったことを記録します。この情報はあなたの次回の生理予測に使用されます。
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-600">
                生理の開始を記録すると、次回の生理予測や排卵日の計算が更新されます。
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPeriodConfirm(false)}>
                キャンセル
              </Button>
              <Button onClick={() => setShowPeriodConfirm(false)}>
                記録する
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showPhaseInfo} onOpenChange={setShowPhaseInfo}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>もやもや期（黄体後期）</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-600 mb-3">
                黄体後期は生理前の約1週間で、プロゲステロンの減少によりイライラや不安感を感じやすい時期です。
              </p>
              <h3 className="text-[#B89B76] text-sm font-medium mb-2">この時期のアドバイス</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>・ストレスを溜めないよう、リラックスする時間を作りましょう</li>
                <li>・軽い運動で気分転換を</li>
                <li>・睡眠をしっかりとりましょう</li>
                <li>・カフェインや塩分の摂りすぎに注意</li>
              </ul>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
          <DialogContent className="sm:max-w-[425px]">
            {selectedProduct && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedProduct.name}</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <div className="w-full h-40 bg-[#F9F1E7] rounded-lg flex items-center justify-center mb-4">
                    <span className="text-[#B89B76]">商品画像</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {selectedProduct.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-[#B89B76] font-medium">{selectedProduct.price}</div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={decreaseQuantity}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span>{quantity}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={increaseQuantity}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowProductDialog(false)}>
                    キャンセル
                  </Button>
                  <Button onClick={addToCart}>
                    カートに追加
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
        
        {/* カレンダーダイアログ */}
        <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <CalendarView 
              onClose={() => setShowCalendar(false)} 
              onAddEvent={(event) => {
                setCalendarEvents(prev => {
                  // 同じ日付の同じタイプのイベントがあれば削除（トグル動作）
                  const existingEventIndex = prev.findIndex(
                    e => e.date === event.date && e.type === event.type
                  );
                  
                  if (existingEventIndex !== -1) {
                    const updatedEvents = [...prev];
                    updatedEvents.splice(existingEventIndex, 1);
                    return updatedEvents;
                  } else {
                    return [...prev, event];
                  }
                });
              }}
            />
          </DialogContent>
        </Dialog>
        
        {/* 画面下部メニューバー */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 py-2 px-4 flex justify-between items-center" style={{ maxWidth: '400px' }}>
          <button className="flex flex-col items-center justify-center w-16 py-1 text-[#FF8E6E]">
            <Home size={24} />
            <span className="text-xs mt-1">ホーム</span>
          </button>
          
          <button 
            className="flex flex-col items-center justify-center w-16 py-1 text-gray-500"
            onClick={() => setShowCalendar(true)}
          >
            <Calendar size={24} />
            <span className="text-xs mt-1">カレンダー</span>
          </button>
          
          <a 
            href="https://beauty.hotpepper.jp/CSP/kr/reserve/?storeId=H000681588" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center w-16 py-1 text-gray-500"
          >
            <Sparkles size={24} />
            <span className="text-xs mt-1">エステ予約</span>
          </a>
          
          <button className="flex flex-col items-center justify-center w-16 py-1 text-gray-500">
            <User size={24} />
            <span className="text-xs mt-1">マイページ</span>
          </button>
        </div>
        
        {/* 体調記録ダイアログ */}
        <HealthRecordDialog 
          isOpen={showHealthRecord} 
          onClose={() => setShowHealthRecord(false)}
          onSave={(record) => {
            setHealthRecords([...healthRecords, record]);
            // 体調グラフに反映されるようにするロジックを実装することも可能
            console.log('Health record saved:', record);
          }}
        />
      </div>
    </div>
  );
};

export default KokyuApp;
