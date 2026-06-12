'use client';

import { useState } from 'react';

export default function ImovelGaleria({ imagens, titulo }) {
  const [activeIndex, setActiveIndex] = useState(0);

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

  return (
    <div className="galeria">
      <div className="galeria-main">
        <img
          src={imagens[activeIndex]}
          alt={`${titulo} — Foto ${activeIndex + 1}`}
          loading="eager"
        />
        {imagens.length > 1 && (
          <>
            <button className="galeria-nav galeria-prev" onClick={() => goTo(activeIndex - 1)} aria-label="Foto anterior">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button className="galeria-nav galeria-next" onClick={() => goTo(activeIndex + 1)} aria-label="Próxima foto">
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
    </div>
  );
}
