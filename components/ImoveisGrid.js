import ImovelCard from './ImovelCard';

export default function ImoveisGrid({ imoveis }) {
  if (!imoveis || imoveis.length === 0) {
    return (
      <section className="section imoveis-section" id="imoveis">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-label">Oportunidades</span>
            <h2>Imóveis em <span className="text-gold-dark">Destaque</span></h2>
            <p>Em breve novos imóveis serão adicionados. Enquanto isso, fale conosco para encontrar o imóvel ideal para você.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section imoveis-section" id="imoveis">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-label">Oportunidades</span>
          <h2>Imóveis em <span className="text-gold-dark">Destaque</span></h2>
          <p>Selecionei os melhores imóveis para você. Clique para ver os detalhes completos.</p>
        </div>

        <div className="imoveis-grid">
          {imoveis.map((imovel) => (
            <ImovelCard key={imovel.id} imovel={imovel} />
          ))}
        </div>
      </div>
    </section>
  );
}
