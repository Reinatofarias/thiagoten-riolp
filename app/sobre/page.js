import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BrokerTrustCard from '@/components/BrokerTrustCard';
import JsonLd from '@/components/JsonLd';
import Link from 'next/link';

export const metadata = {
  title: 'Quem é Thiago Tenório',
  description: 'Conheça a história e trajetória profissional do corretor Thiago Tenório, especialista em imóveis de alto padrão e atendimento premium em Recife e região.',
};

export default function SobrePage() {
  const realEstateAgentSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    'name': 'Thiago Tenório — Corretor de Imóveis',
    'image': 'https://www.thiagotenorioimoveis.com.br/images/thiago-profile.png',
    '@id': 'https://www.thiagotenorioimoveis.com.br/#corretor',
    'url': 'https://www.thiagotenorioimoveis.com.br/sobre',
    'telephone': '+5581994286597',
    'email': 'contato@thiagotenorio.com.br',
    'priceRange': '$$$$',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Recife',
      'addressRegion': 'PE',
      'addressCountry': 'BR'
    },
    'areaServed': {
      '@type': 'AdministrativeArea',
      'name': 'Recife e Região Metropolitana'
    },
    'license': 'CRECI 21969'
  };

  return (
    <>
      <JsonLd schema={realEstateAgentSchema} />
      <Header />
      <main className="imovel-page">
        <div className="imovel-header bg-dark">
          <div className="container">
            <nav className="breadcrumb">
              <Link href="/">Página Inicial</Link>
              <span className="separator">/</span>
              <span className="current">Quem é Thiago Tenório</span>
            </nav>
          </div>
        </div>

        <section className="section" style={{ padding: '60px 0' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <div className="section-header" style={{ marginBottom: '40px' }}>
              <span className="section-label">Sobre o Corretor</span>
              <h2 style={{ fontSize: '2.5rem' }}>Parceria e <span className="text-gold-dark">Confiança</span></h2>
              <p>Segurança jurídica, transparência e curadoria sob medida para encontrar seu novo lar em Recife e região.</p>
            </div>
            
            <BrokerTrustCard imovelTitulo="Geral (Página Sobre)" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
