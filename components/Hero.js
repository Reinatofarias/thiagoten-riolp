export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        {/* 
          📸 INSERIR SUA FOTO AQUI
          Coloque a imagem em: public/images/hero-bg.jpg
          Tamanho ideal: 1920x1080px (JPG ou WebP)
        */}
        <img
          src="/images/hero-bg.jpg"
          alt="Imóvel de luxo — Thiago Tenório Corretor"
          loading="eager"
        />
      </div>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1>
          Seu Imóvel Próprio<br />
          <em>Sem Burocracia, Sem Dor de Cabeça</em>
        </h1>

        <p className="hero-subtitle">
          Eu encontro o imóvel perfeito para você, negocio o melhor preço
          e cuido de <strong>toda a papelada</strong>. Você só escolhe e assina.
          <br /><strong>Em até 90 dias, as chaves estão na sua mão.</strong>
        </p>

        <div className="hero-cta-group">

          <a href="#imoveis" className="btn btn-primary btn-lg">
            Quero Meu Imóvel Agora
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>

          <div className="hero-proof">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span>+200 famílias realizaram o sonho do imóvel próprio</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator" aria-hidden="true">
        <span>Saiba mais</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
