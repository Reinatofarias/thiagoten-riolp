'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ImovelGaleria({ imagens = [], titulo = '' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock document scroll when lightbox is visible
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  // Bind keyboard navigation arrows and escape key
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToLightbox(lightboxIndex - 1);
      if (e.key === 'ArrowRight') goToLightbox(lightboxIndex + 1);
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, lightboxIndex]);

  if (!imagens || imagens.length === 0) {
    return (
      <div className="galeria">
        <div className="galeria-main">
          <div className="galeria-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <p>Fotos em breve</p>
          </div>
        </div>
      </div>
    );
  }

  const goTo = (index) => {
    if (index < 0) index = imagens.length - 1;
    if (index >= imagens.length) index = 0;
    setActiveIndex(index);
  };

  const openLightbox = () => {
    setLightboxIndex(activeIndex);
    setIsLightboxOpen(true);
  };

  const goToLightbox = (index) => {
    if (index < 0) index = imagens.length - 1;
    if (index >= imagens.length) index = 0;
    setLightboxIndex(index);
  };

  return (
    <div className="galeria">
      <div 
        className="galeria-main" 
        onClick={openLightbox} 
        style={{ cursor: 'pointer' }}
        title="Clique para ampliar a foto"
      >
        <img
          key={imagens[activeIndex]}
          src={imagens[activeIndex]}
          alt={`${titulo} — Foto ${activeIndex + 1}`}
          loading="eager"
          className="fade-in-image"
        />

        {imagens.length > 1 && (
          <>
            <button 
              className="galeria-nav galeria-prev" 
              onClick={(e) => { e.stopPropagation(); goTo(activeIndex - 1); }} 
              aria-label="Foto anterior"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button 
              className="galeria-nav galeria-next" 
              onClick={(e) => { e.stopPropagation(); goTo(activeIndex + 1); }} 
              aria-label="Próxima foto"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
            <div className="galeria-counter">{activeIndex + 1} / {imagens.length}</div>
          </>
        )}
      </div>

      {imagens.length > 1 && (
        <div className="galeria-thumbs">
          {imagens.map((img, i) => (
            <button
              key={i}
              className={`galeria-thumb ${i === activeIndex ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Ver foto ${i + 1}`}
            >
              <img src={img} alt={`Miniatura ${i + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {isLightboxOpen && mounted && createPortal(
        <div 
          className="lightbox-backdrop" 
          onClick={(e) => { if (e.target.classList.contains('lightbox-backdrop')) setIsLightboxOpen(false); }}
        >
          <button 
            className="lightbox-close" 
            onClick={() => setIsLightboxOpen(false)} 
            aria-label="Fechar galeria"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <button 
            className="lightbox-nav-btn lightbox-prev-btn" 
            onClick={() => goToLightbox(lightboxIndex - 1)} 
            aria-label="Foto anterior"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>

          <div className="lightbox-content animate-fade-in">
            <img 
              src={imagens[lightboxIndex]} 
              alt={`${titulo} — Visualização ampliada ${lightboxIndex + 1}`} 
              className="lightbox-image"
            />
            <div className="lightbox-counter">{lightboxIndex + 1} / {imagens.length}</div>
          </div>

          <button 
            className="lightbox-nav-btn lightbox-next-btn" 
            onClick={() => goToLightbox(lightboxIndex + 1)} 
            aria-label="Próxima foto"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>,
        document.body
      )}
    </div>
  );
}
