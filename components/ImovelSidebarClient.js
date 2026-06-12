'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { formatPreco } from '@/lib/utils';
import LeadForm from './LeadForm';

export default function ImovelSidebarClient({ imovel }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
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
    <aside className="imovel-sidebar">
      <div className="imovel-sidebar-inner">
        <div className="imovel-price-box">
          <span className="price-label">Valor de venda</span>
          <div className="price-value text-gold">{formatPreco(imovel.preco)}</div>
          <p className="price-sub">Negociação direta com o corretor</p>
          
          <button 
            onClick={toggleModal} 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '24px' }}
          >
            Consultar Disponibilidade →
          </button>
        </div>
      </div>

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
                Tenho Interesse
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Preencha para consultar a disponibilidade do imóvel <br /><strong>{imovel.titulo}</strong>
              </p>
            </div>
            <LeadForm imovelTitulo={`${imovel.titulo} — ${formatPreco(imovel.preco)}`} />
          </div>
        </div>,
        document.body
      )}
    </aside>
  );
}
