import './globals.css';
import { Inter } from 'next/font/google';
import PropTypes from 'prop-types';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TVT Watchlist Picker',
  description: ''
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.any
};
