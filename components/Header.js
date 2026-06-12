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
            <svg viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M30 4L52 36H8L30 4Z" stroke="#E3AE45" strokeWidth="2" fill="none"/>
              <path d="M38 14L54 38H22L38 14Z" stroke="#9A6621" strokeWidth="2" fill="none"/>
            </svg>
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
