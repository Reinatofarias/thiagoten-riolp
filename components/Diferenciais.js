export default function Diferenciais() {
  const cards = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
      titulo: 'Atendimento 1 a 1',
      texto: 'Você não é mais um número. Eu te atendo pessoalmente, entendo o que você precisa e busco <strong>exatamente</strong> o que faz sentido pra você.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      ),
      titulo: 'Imóveis Filtrados',
      texto: 'Chega de perder tempo visitando imóveis que não servem. Eu pré-seleciono apenas as opções que batem com seu perfil e orçamento.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      titulo: 'Zero Burocracia',
      texto: 'Documentação, certidões, contratos — <strong>eu resolvo tudo</strong>. Você não precisa se preocupar com nenhum papel.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M16 8l-4 4-4-4"/>
          <path d="M12 12v6"/>
        </svg>
      ),
      titulo: 'Negociação Agressiva',
      texto: 'Eu negocio como se fosse pra mim. Meu objetivo é você pagar o <strong>menor preço possível</strong> pelo melhor imóvel.',
    },
  ];

  return (
    <section className="section diferenciais" id="diferenciais">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-label">Por que me escolher</span>
          <h2>Tudo Que Você Precisa, <span className="text-gold-dark">Nada Que Você Não Precisa</span></h2>
          <p>Sem enrolação, sem letras miúdas. Aqui é atendimento direto e personalizado para você encontrar o imóvel ideal.</p>
        </div>

        <div className="diferenciais-grid">
          {cards.map((card, i) => (
            <div className="diferencial-card animate-on-scroll" key={i}>
              <div className="diferencial-icon">{card.icon}</div>
              <h3>{card.titulo}</h3>
              <p dangerouslySetInnerHTML={{ __html: card.texto }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
