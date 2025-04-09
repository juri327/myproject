import '../styles/globals.css';
import '../styles/carousel.css';

export const metadata = {
  title: 'KOKYU1 - 女性健康トラッキングアプリ',
  description: '女性の健康管理をサポートするKOKYU1アプリ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
