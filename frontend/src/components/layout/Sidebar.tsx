import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import inflexLogo from '../../assets/images/inflex-logo.png';
import certFssc from '../../assets/images/certificado-fssc22000.png';
import certAmbiental from '../../assets/images/certificado-ambiental.png';
import certIso from '../../assets/images/certificado-iso.png';
import certHalal from '../../assets/images/certificado-halal.png';

const CERTIFICATIONS = [
  { src: certFssc, alt: 'DNV – FSSC 22000 Empresa Certificada' },
  { src: certAmbiental, alt: 'PSE-MS SENAI – Programa de Ecoeficiência' },
  { src: certIso, alt: 'DNV – ISO 9001 Empresa Certificada' },
  { src: certHalal, alt: 'Cdial Halal – Empresa Certificada' },
];

/* ── Nav items ─────────────────────────────── */
const navItems = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    to: '/register',
    label: 'Forms',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="13" y2="17" />
      </svg>
    ),
  },
];

/* ── Main Sidebar Component ─────────────────── */
export default function Sidebar() {
  const [isDark, setIsDark] = useState(false);

  /* Sync with the dark class on <html> so we can apply the right filter */
  useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.classList.contains('dark'));

    update();

    /* Watch for class changes triggered by the Header toggle */
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  /*
   * Dark-mode filter strategy:
   *  - invert(1)           → white ↔ black swap
   *  - hue-rotate(180deg)  → compensates hue so brand colors stay correct
   *  Net result: dark background + legible graphics, brand colors preserved.
   */
  const certFilter = isDark ? 'invert(1) hue-rotate(180deg)' : 'none';

  return (
    <aside
      className="flex flex-col h-full w-[240px] shrink-0"
      style={{
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-sidebar)',
      }}
    >
      {/* ── Logo ── */}
      <div className="flex items-center justify-center py-6 px-4">
        <div
          className="p-2 rounded flex items-center justify-center w-full max-w-[144px]"
          style={{
            background: isDark ? 'var(--bg-sidebar)' : '#ffffff',
          }}
        >
          <img
            src={inflexLogo}
            alt="Inflex – Indústria de Embalagens Flexíveis"
            className="w-full object-contain transition-all duration-300"
            style={{
              filter: certFilter,
              mixBlendMode: isDark ? 'screen' : 'normal',
            }}
            draggable={false}
          />
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex flex-col gap-2 px-4 py-4">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard'}
            className="flex flex-row items-center gap-3 px-4 py-3 rounded-lg text-[13px] font-semibold transition-all duration-200 select-none outline-none"
            style={({ isActive }) => ({
              background: isActive ? 'var(--primary)' : 'transparent',
              color: isActive ? 'var(--text-sidebar-active)' : 'var(--text-sidebar)',
            })}
          >
            {icon}
            <span className="tracking-wide">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* ── Certification Badges (vertical stack, fills remaining space) ── */}
      <div
        className="flex flex-col flex-1 items-center justify-around px-4 pb-5 pt-4"
        style={{ borderTop: '1px solid var(--border-sidebar)' }}
      >
        {CERTIFICATIONS.map(({ src, alt }) => (
          <div
            key={alt}
            className="rounded-xl overflow-hidden flex items-center justify-center"
            style={{
              width: '110px',
              height: '110px',
              background: isDark ? 'var(--bg-sidebar)' : 'transparent',
            }}
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-contain transition-all duration-300"
              style={{
                filter: certFilter,
                mixBlendMode: isDark ? 'screen' : 'normal',
              }}
              draggable={false}
              title={alt}
            />
          </div>
        ))}
      </div>
    </aside>
  );
}
