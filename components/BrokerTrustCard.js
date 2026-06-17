'use client';

import { getWhatsAppUrl } from '@/lib/utils';

export default function BrokerTrustCard({ imovelTitulo = '' }) {
  const whatsappUrl = getWhatsAppUrl({
    nome: 'um visitante do site',
    telefone: '',
    imovel: imovelTitulo
  });

  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'whatsapp_redirect',
        whatsapp_url: whatsappUrl,
        lead_nome: 'Clique Direto (Cartão do Corretor)',
        lead_cidade: '',
        lead_imovel: imovelTitulo || 'Geral'
      });
    }
  };

  return (
    <div className="imovel-info-card broker-trust-card glass-card">
      <div className="broker-profile-grid">
        <div className="broker-image-wrapper">
          <img 
            src="/images/thiago-profile.png" 
            alt="Thiago Tenório Corretor" 
            className="broker-image" 
          />
          <span className="broker-badge-active" aria-label="Status do Corretor">Online</span>
        </div>
        
        <div className="broker-info-content">
          <span className="section-label" style={{ fontSize: '0.65rem', padding: '4px 12px', marginBottom: '8px' }}>
            Atendimento Direto
          </span>
          <h3>Thiago Tenório</h3>
          <p className="broker-role">Corretor de Imóveis | CRECI 21969</p>
          <p className="broker-bio" style={{ marginBottom: '12px' }}>
            Com mais de 15 anos de experiência no mercado imobiliário, Thiago Tenório, CRECI 21969, atua em toda a Região Metropolitana, oferecendo uma curadoria especializada de imóveis para diferentes perfis de clientes, desde opções mais acessíveis até imóveis de alto padrão.
          </p>
          <p className="broker-bio">
            Seu trabalho é pautado pela transparência, segurança e acompanhamento completo em cada etapa da negociação. Da escolha do imóvel ideal à orientação sobre documentação e processos burocráticos, conduz seus clientes com responsabilidade e atenção aos detalhes, tornando a compra ou venda de um imóvel uma experiência mais segura, tranquila e eficiente.
          </p>
          
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="btn btn-primary broker-whatsapp-btn"
            style={{ padding: '10px 20px', fontSize: '0.8rem', marginTop: '16px' }}
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              style={{ marginRight: '6px', verticalAlign: 'middle' }}
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Tirar Dúvidas por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
