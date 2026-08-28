import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function AppLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
