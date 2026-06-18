import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';
import { CONFIG } from '@/lib/utils';
import Link from 'next/link';

export const metadata = {
  title: 'Fale Comigo | Atendimento Personalizado',
  description: 'Entre em contato com Thiago Tenório. Agende uma reunião ou tire dúvidas sobre imóveis e financiamento em Recife.',
};

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main className="imovel-page">
        <div className="imovel-header bg-dark">
          <div className="container">
            <nav className="breadcrumb">
              <Link href="/">Página Inicial</Link>
              <span className="separator">/</span>
              <span className="current">Contato</span>
            </nav>
          </div>
        </div>

        <section className="section" style={{ padding: '60px 0' }}>
          <div className="container" style={{ maxWidth: '1000px' }}>
            <div className="section-header">
              <span className="section-label">Fale Comigo</span>
              <h2>Atendimento <span className="text-gold-dark">Exclusivo & Premium</span></h2>
              <p>Preencha os dados abaixo para iniciar sua jornada ou entre em contato diretamente.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', marginTop: '40px' }}>
              {/* Formulário de Lead */}
              <div className="glass-card animate-fade-in" style={{ padding: '40px 30px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Iniciar Contato</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
                  Preencha os campos abaixo e entrarei em contato o mais breve possível.
                </p>
                <LeadForm imovelTitulo="Página de Contato" />
              </div>

              {/* Informações de Contato Direto */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="glass-card" style={{ padding: '30px', borderLeft: '3px solid var(--gold-main)' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--gold-main)', display: 'block', marginBottom: '8px' }}>
                    WhatsApp Direto
                  </span>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>(81) 99428-6597</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '16px' }}>
                    Clique no link abaixo para conversar imediatamente com Thiago no WhatsApp.
                  </p>
                  <a 
                    href={`https://wa.me/${CONFIG.WHATSAPP_NUMBER}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary"
                    style={{ padding: '10px 20px', fontSize: '0.8rem' }}
                  >
                    Abrir Chat no WhatsApp
                  </a>
                </div>

                <div className="glass-card" style={{ padding: '30px', borderLeft: '3px solid var(--gold-main)' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--gold-main)', display: 'block', marginBottom: '8px' }}>
                    E-mail Institucional
                  </span>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>contato@thiagotenorio.com.br</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '16px' }}>
                    Se preferir enviar um e-mail formal ou propostas comerciais.
                  </p>
                  <a href="mailto:contato@thiagotenorio.com.br" className="text-gold" style={{ fontSize: '0.9rem', textDecoration: 'underline' }}>
                    Enviar E-mail
                  </a>
                </div>

                <div className="glass-card" style={{ padding: '30px', borderLeft: '3px solid var(--gold-main)' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--gold-main)', display: 'block', marginBottom: '8px' }}>
                    Localização & Atendimento
                  </span>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Recife e Região Metropolitana</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    Consultoria e intermediação imobiliária presencial e online, com agendamentos de visitas sob medida.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
