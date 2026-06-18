import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Financiamento Imobiliário | Guia Completo',
  description: 'Entenda as etapas do financiamento habitacional, documentos necessários e solicite uma simulação personalizada de crédito.',
};

export default function FinanciamentoPage() {
  const etapasFinanciamento = [
    {
      num: '1',
      titulo: 'Simulação Bancária',
      texto: 'Simulamos as parcelas, taxas de juros e o valor de entrada nos principais bancos (Caixa, Itaú, Bradesco, Santander). Encontraremos a instituição com as condições mais baratas para o seu perfil.'
    },
    {
      num: '2',
      titulo: 'Aprovação de Crédito',
      texto: 'Enviamos a documentação necessária para o banco para análise cadastral. O banco define o limite máximo de crédito que irá liberar e emite a carta de aprovação, válida por até 90 dias.'
    },
    {
      num: '3',
      titulo: 'Avaliação & Vistoria',
      texto: 'Um engenheiro credenciado pelo banco visita o imóvel escolhido para atestar seu valor de mercado e condições estruturais. Simultaneamente, a assessoria jurídica do banco confere todas as certidões.'
    },
    {
      num: '4',
      titulo: 'Assinatura & Registro',
      texto: 'O contrato de financiamento é emitido e assinado pelas partes. Ele possui validade de escritura pública. Após recolher o ITBI e registrar o contrato no Cartório de Imóveis, os recursos são liberados ao vendedor.'
    }
  ];

  const documentosNecessarios = [
    'Documento de Identidade oficial com foto (RG, CNH, passaporte)',
    'Cadastro de Pessoa Física (CPF)',
    'Comprovante de Estado Civil (Certidão de Nascimento ou Casamento)',
    'Comprovante de Residência recente (de até 60 dias)',
    'Comprovantes de Renda dos últimos 3 meses (Holerites ou pró-labores)',
    'Declaração completa de Imposto de Renda (IRPF) com recibo de entrega',
    'Extrato atualizado do FGTS (caso decida usar o saldo para amortização)'
  ];

  return (
    <>
      <Header />
      <main className="imovel-page">
        <div className="imovel-header bg-dark">
          <div className="container">
            <nav className="breadcrumb">
              <Link href="/">Página Inicial</Link>
              <span className="separator">/</span>
              <span className="current">Financiamento</span>
            </nav>
          </div>
        </div>

        <section className="section" style={{ padding: '60px 0' }}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">Crédito Habitacional</span>
              <h2>Guia Prático de <span className="text-gold-dark">Financiamento</span></h2>
              <p>Desmistificamos o processo de aquisição do crédito bancário passo a passo.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px', margin: '50px 0' }}>
              {etapasFinanciamento.map((etapa, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '30px', position: 'relative', borderTop: '3px solid var(--gold-main)' }}>
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '20px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--gold-gradient)',
                    color: '#0b0d10',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontFamily: 'var(--font-heading)'
                  }}>
                    {etapa.num}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginTop: '10px', marginBottom: '12px' }}>{etapa.titulo}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>{etapa.texto}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', marginTop: '60px' }}>
              {/* Documentação */}
              <div className="glass-card" style={{ padding: '40px 30px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Documentos Exigidos</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
                  Os bancos normalmente solicitam a seguinte lista de documentos do comprador para iniciar a análise de crédito:
                </p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {documentosNecessarios.map((doc, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '10px', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--gold-main)', flexShrink: 0 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solicitar Simulação */}
              <div className="glass-card" style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '1px solid var(--gold-main)', boxShadow: 'var(--gold-glow)' }}>
                <span className="section-label" style={{ fontSize: '0.65rem', alignSelf: 'flex-start', marginBottom: '16px' }}>Simulação Sem Custo</span>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>Quer simular seu financiamento?</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '30px' }}>
                  Analisamos seu perfil e enviamos simulações reais dos principais bancos diretamente no seu WhatsApp, apresentando as melhores taxas e as parcelas exatas.
                </p>
                <Link href="/contato" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Solicitar Simulação Grátis →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
