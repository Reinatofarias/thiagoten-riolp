'use client';

import { useState, useMemo } from 'react';
import ImovelCard from './ImovelCard';

export default function ImoveisGrid({ imoveis = [] }) {
  const [selectedType, setSelectedType] = useState('Todos');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Todos');
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(0);

  const priceRanges = useMemo(() => [
    { label: 'Qualquer Preço', min: 0, max: Infinity },
    { label: 'Até R$ 500.000', min: 0, max: 500000 },
    { label: 'R$ 500.000 a R$ 1.000.000', min: 500000, max: 1000000 },
    { label: 'R$ 1.000.000 a R$ 2.000.000', min: 1000000, max: 2000000 },
    { label: 'Acima de R$ 2.000.000', min: 2000000, max: Infinity }
  ], []);

  // Generate filter option lists dynamically from properties data
  const uniqueTypes = useMemo(() => {
    if (!imoveis) return ['Todos'];
    const types = imoveis.map(item => item.tipo).filter(Boolean);
    return ['Todos', ...new Set(types)];
  }, [imoveis]);

  const uniqueNeighborhoods = useMemo(() => {
    if (!imoveis) return ['Todos'];
    const neighborhoods = imoveis.map(item => item.bairro).filter(Boolean);
    return ['Todos', ...new Set(neighborhoods)];
  }, [imoveis]);

  // Handle active filter criteria
  const filteredImoveis = useMemo(() => {
    if (!imoveis) return [];
    return imoveis.filter(imovel => {
      const typeMatch = selectedType === 'Todos' || imovel.tipo === selectedType;
      const neighborhoodMatch = selectedNeighborhood === 'Todos' || imovel.bairro === selectedNeighborhood;
      
      const range = priceRanges[selectedPriceIndex];
      const priceMatch = imovel.preco >= range.min && imovel.preco <= range.max;
      
      return typeMatch && neighborhoodMatch && priceMatch;
    });
  }, [imoveis, selectedType, selectedNeighborhood, selectedPriceIndex, priceRanges]);

  const resetFilters = () => {
    setSelectedType('Todos');
    setSelectedNeighborhood('Todos');
    setSelectedPriceIndex(0);
  };

  const showFilterBar = imoveis && imoveis.length > 0;

  return (
    <section className="section imoveis-section" id="imoveis">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-label">Oportunidades</span>
          <h2>Imóveis em <span className="text-gold-dark">Destaque</span></h2>
          <p>Selecionei os melhores imóveis para você. Clique para ver os detalhes completos.</p>
        </div>

        {showFilterBar && (
          <div className="filter-bar glass-card animate-fade-in">
            <div className="filter-group">
              <label htmlFor="filter-type">Tipo</label>
              <select 
                id="filter-type" 
                value={selectedType} 
                onChange={(e) => setSelectedType(e.target.value)}
                className="filter-select"
              >
                {uniqueTypes.map((type, i) => (
                  <option key={i} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="filter-neighborhood">Localização</label>
              <select 
                id="filter-neighborhood" 
                value={selectedNeighborhood} 
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                className="filter-select"
              >
                {uniqueNeighborhoods.map((bairro, i) => (
                  <option key={i} value={bairro}>{bairro}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="filter-price">Preço máximo</label>
              <select 
                id="filter-price" 
                value={selectedPriceIndex} 
                onChange={(e) => setSelectedPriceIndex(Number(e.target.value))}
                className="filter-select"
              >
                {priceRanges.map((range, i) => (
                  <option key={i} value={i}>{range.label}</option>
                ))}
              </select>
            </div>

            {(selectedType !== 'Todos' || selectedNeighborhood !== 'Todos' || selectedPriceIndex !== 0) && (
              <button onClick={resetFilters} className="filter-btn-reset">
                Limpar Filtros
              </button>
            )}
          </div>
        )}

        {!imoveis || imoveis.length === 0 ? (
          <p className="no-imoveis-msg">Em breve novos imóveis serão adicionados. Enquanto isso, fale conosco para encontrar o imóvel ideal.</p>
        ) : filteredImoveis.length === 0 ? (
          <div className="no-results glass-card">
            <h3>Nenhum imóvel encontrado</h3>
            <p>Não encontramos nenhum imóvel correspondente aos filtros atuais. Tente ajustar os parâmetros ou limpe os filtros abaixo.</p>
            <button onClick={resetFilters} className="btn btn-primary" style={{ marginTop: '16px' }}>
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="imoveis-grid">
            {filteredImoveis.map((imovel) => (
              <ImovelCard key={imovel.id} imovel={imovel} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
