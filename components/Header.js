'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`} id="header">
      <div className="container header-inner">
        <Link href="/" className="logo" aria-label="Thiago Tenório — Corretor de Imóveis">
          <div className="logo-icon">
            <img src="/images/Logo.PNG" alt="Thiago Tenório Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div className="logo-text">
            <span className="logo-name">Thiago Tenório</span>
            <span className="logo-subtitle">Corretor de Imóveis</span>
          </div>
        </Link>
        <a href="#formulario" className="btn btn-primary header-cta">Fale Comigo</a>
      </div>
    </header>
  );
}
