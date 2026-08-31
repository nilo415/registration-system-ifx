import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface AppLayoutProps {
  children?: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      {/* Fixed sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top header bar */}
        <Header />

        {/* Scrollable page content */}
        <main
          className="flex-1 overflow-y-auto"
          style={{ background: 'var(--bg-base)' }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
