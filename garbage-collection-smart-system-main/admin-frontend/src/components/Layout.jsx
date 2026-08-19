'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import { useTheme } from '../contexts/ThemeContext';
import SubscriptionExpiredOverlay from './SubscriptionExpiredOverlay';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: isDark ? '#020617' : '#f0f4f8' }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <TopHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-3 md:p-5 lg:p-6 pb-20 md:pb-6 relative z-10 transition-colors duration-200">
          <div className="max-w-[1600px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>

      <SubscriptionExpiredOverlay />
    </div>
  );
}
