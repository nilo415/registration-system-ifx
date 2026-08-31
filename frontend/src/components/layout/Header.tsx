import { useState, useEffect } from 'react';

/* ── Moon icon ── */
function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/* ── Sun icon ── */
function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

/* ── Bell icon ── */
function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

/* ── Help icon ── */
function HelpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

/* ── Main Header Component ── */
export default function Header() {
  const [hasNotification] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <header
      className="flex items-center justify-end gap-1 px-5 h-14 shrink-0 transition-colors duration-300"
      style={{
        background: 'var(--bg-header)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-200 cursor-pointer hover:opacity-80"
        style={{ color: 'var(--text-muted)' }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--border-color)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        title={isDarkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      >
        {isDarkMode ? <SunIcon /> : <MoonIcon />}
      </button>

      {/* Notification bell */}
      <div className="relative">
        <button
          id="header-notifications-btn"
          className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-200 cursor-pointer hover:opacity-80"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--border-color)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          title="Notificações"
        >
          <BellIcon />
        </button>
        {hasNotification && (
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2"
            style={{
              background: '#EF4444',
              borderColor: 'var(--bg-header)',
            }}
          />
        )}
      </div>

      {/* Help */}
      <button
        id="header-help-btn"
        className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-200 cursor-pointer hover:opacity-80"
        style={{ color: 'var(--text-muted)' }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--border-color)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        title="Ajuda"
      >
        <HelpIcon />
      </button>

      {/* Divider */}
      <div className="w-px h-6 mx-1 transition-colors duration-300" style={{ background: 'var(--border-color)' }} />

      {/* User avatar */}
      <button
        id="header-user-menu-btn"
        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity duration-200"
        style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}
        title="Perfil"
      >
        AU
      </button>
    </header>
  );
}
