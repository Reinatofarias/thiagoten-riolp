import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Processo from '@/components/Processo';
import JsonLd from '@/components/JsonLd';
import Link from 'next/link';

export const metadata = {
  title: 'Como Funciona o Processo de Compra',
  description: 'Saiba como funciona a curadoria, assessoria de crédito, negociação e entrega de chaves com o corretor Thiago Tenório. Sem complicação ou surpresas.',
};

export default function ComoFuncionaPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Como funciona o primeiro contato/conversa inicial?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Entendemos profundamente suas necessidades em termos de espaço, localização, segurança e orçamento em uma conversa rápida de 10 minutos para que o filtro seja cirúrgico.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Como é feita a curadoria seleta dos imóveis?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Realizamos uma busca ativa em nosso portfólio e contatos estratégicos no mercado. Selecionamos apenas de 3 a 5 opções extraordinárias que atendam no mínimo 90% das suas exigências.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Qual assessoria é fornecida na negociação e papelada?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Negociamos o melhor preço e condições, analisamos todas as certidões necessárias e elaboramos ou revisamos o contrato de compra e venda de ponta a ponta.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Como ocorre a entrega das chaves e finalização?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Te acompanhamos na assinatura da escritura ou contrato de financiamento, recolhimento de impostos (ITBI) e registro do imóvel no cartório (RGI).'
        }
      }
    ]
  };

  const detalhesEtapas = [
    {
      num: '01',
      titulo: 'Alinhamento & Perfil',
      subtitulo: 'Conversa Inicial Detalhada',
      texto: 'Entendemos profundamente suas necessidades em termos de espaço, localização, segurança e orçamento. Analisamos perfis familiares para que o filtro seja cirúrgico desde a primeira reunião de 10 minutos.',
      diferencial: 'Você não perde tempo olhando dezenas de e-mails com imóveis fora do seu perfil.'
    },
    {
      num: '02',
      titulo: 'Curadoria Seleta',
      subtitulo: 'Seleção Exclusiva de Imóveis',
      texto: 'Realizamos uma busca ativa em nosso portfólio e contatos estratégicos no mercado. Selecionamos apenas de 3 a 5 opções extraordinárias que atendam no mínimo 90% das suas exigências.',
      diferencial: 'Apenas visitas a imóveis altamente compatíveis e qualificados.'
    },
    {
      num: '03',
      titulo: 'Assessoria & Negociação',
      subtitulo: 'Segurança Contratual e Jurídica',
      texto: 'Negociamos os melhores preços e condições de pagamento diretamente com proprietários e construtoras. Analisamos todas as certidões necessárias, elaboramos ou revisamos o contrato de compra e venda de ponta a ponta.',
      diferencial: 'Prevenção de fraudes ou problemas de documentação futura.'
    },
    {
      num: '04',
      titulo: 'Assinatura & Chaves',
      subtitulo: 'Apoio no Cartório e Financiamento',
      texto: 'Te acompanhamos na assinatura da escritura pública ou contrato de financiamento, recolhimento de impostos (ITBI) e registro do imóvel em cartório. Entregamos as chaves com total tranquilidade.',
      diferencial: 'Acompanhamento pontual do primeiro contato ao pós-venda.'
    }
  ];

  return (
    <>
      <JsonLd schema={faqSchema} />
      <Header />
      <main className="imovel-page">
        <div className="imovel-header bg-dark">
          <div className="container">
            <nav className="breadcrumb">
              <Link href="/">Página Inicial</Link>
              <span className="separator">/</span>
              <span className="current">Como Funciona</span>
            </nav>
          </div>
        </div>

        {/* Processo Simplificado */}
        <Processo />

        {/* Detalhamento das Etapas */}
        <section className="section" style={{ backgroundColor: 'rgba(18, 21, 27, 0.2)', borderTop: '1px solid var(--border-glass)', padding: '80px 0' }}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">Detalhamento</span>
              <h2>Entenda Cada <span className="text-gold-dark">Fase do Processo</span></h2>
              <p>Trabalhamos de forma transparente para que você tenha visibilidade de cada etapa.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '900px', margin: '0 auto' }}>
              {detalhesEtapas.map((etapa, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '30px 40px', display: 'flex', gap: '30px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{
                    fontSize: '2.5rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: '700',
                    background: 'var(--gold-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: '1',
                    minWidth: '60px'
                  }}>
                    {etapa.num}
                  </div>
                  <div style={{ flex: '1', minWidth: '280px' }}>
                    <span style={{ color: 'var(--gold-main)', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>
                      {etapa.subtitulo}
                    </span>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>{etapa.titulo}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '16px' }}>{etapa.texto}</p>
                    
                    <div style={{ borderLeft: '2px solid var(--gold-main)', paddingLeft: '14px', fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                      <strong>Diferencial Thiago Tenório:</strong> {etapa.diferencial}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center" style={{ marginTop: '50px', textAlign: 'center' }}>
              <Link href="/contato" className="btn btn-primary btn-lg">
                Iniciar Minha Busca
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
