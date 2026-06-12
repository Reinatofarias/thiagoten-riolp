'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { CONFIG } from '@/lib/utils';
import LeadForm from './LeadForm';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`} id="header">
        <div className="container header-inner">
          <Link href="/" className="logo" aria-label="Thiago Tenório — Corretor de Imóveis">
            <div className="logo-icon">
              <img src="/images/Logo.PNG" alt="Thiago Tenório Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div className="logo-signature-wrapper">
              <img src="/images/assinatura.png" alt="Assinatura Thiago Tenório" className="logo-signature" />
            </div>
          </Link>

          <button 
            onClick={toggleModal} 
            className="btn btn-primary header-cta"
          >
            Fale Comigo
          </button>
        </div>
      </header>

      {isModalOpen && mounted && createPortal(
        <div className="modal-backdrop" onClick={handleBackdropClick}>
          <div className="modal-content glass-card animate-fade-in">
            <button className="modal-close" onClick={toggleModal} aria-label="Fechar modal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="form-header" style={{ marginBottom: '24px', textAlign: 'center' }}>
              <span className="section-label" style={{ fontSize: '0.7rem' }}>Atendimento Premium</span>
              <h2 style={{ fontSize: '1.6rem', marginTop: '12px', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
                Fale Comigo
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Preencha seus dados abaixo e entrarei em contato com você o mais rápido possível.
              </p>
            </div>
            <LeadForm imovelTitulo="Fale Comigo" />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

