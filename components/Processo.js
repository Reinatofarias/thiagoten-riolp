export default function Processo() {
  const steps = [
    { num: '1', titulo: 'Conversa Inicial', texto: 'Me conta o que você busca: tipo de imóvel, região, orçamento. Em 10 minutos eu já sei exatamente o que você precisa.' },
    { num: '2', titulo: 'Seleção Exclusiva', texto: 'Eu filtro dezenas de opções e te apresento apenas as 3-5 melhores. Sem perda de tempo visitando imóveis ruins.' },
    { num: '3', titulo: 'Negociação + Papelada', texto: 'Negocio o melhor preço, cuido de toda documentação, certidões e contratos. Você não precisa se estressar com nada.' },
    { num: '4', titulo: 'Chaves Na Mão', texto: 'Pronto. O imóvel é seu. As chaves estão na sua mão. E eu continuo disponível pra qualquer coisa que precisar.' },
  ];

  return (
    <section className="section processo" id="processo">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-label">Simples assim</span>
          <h2>Do Primeiro Contato <span className="text-gold-dark">Às Chaves Na Sua Mão</span></h2>
          <p>4 passos. Sem complicação. Sem surpresas. Sem dor de cabeça.</p>
        </div>

        <div className="processo-grid">
          {steps.map((step, i) => (
            <div className="processo-step animate-on-scroll" key={i}>
              <div className="step-number">{step.num}</div>
              <h3>{step.titulo}</h3>
              <p>{step.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
