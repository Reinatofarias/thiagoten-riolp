import { notFound } from 'next/navigation';
import { getImovelBySlug, getAllSlugs } from '@/lib/supabase';
import Header from '@/components/Header';
import ImovelGaleria from '@/components/ImovelGaleria';
import ImovelSpecs from '@/components/ImovelSpecs';
import ImovelSidebarClient from '@/components/ImovelSidebarClient';
import BrokerTrustCard from '@/components/BrokerTrustCard';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { formatPreco } from '@/lib/utils';
import JsonLd from '@/components/JsonLd';

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const imovel = await getImovelBySlug(slug);
  if (!imovel) return { title: 'Imóvel não encontrado' };

  const title = `${imovel.titulo} — Thiago Tenório Corretor`;
  const description = `${imovel.tipo} no bairro ${imovel.bairro || 'Recife'}. ${imovel.subtitulo || ''} ${imovel.descricao ? imovel.descricao.substring(0, 150) + '...' : ''}`;
  const firstImage = imovel.imagens && imovel.imagens.length > 0 ? imovel.imagens[0] : '/images/share-preview.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.thiagotenorioimoveis.com.br/imovel/${slug}`,
      siteName: 'Thiago Tenório Imóveis',
      images: [
        {
          url: firstImage,
          width: 1200,
          height: 630,
          alt: imovel.titulo,
        }
      ],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [firstImage],
    }
  };
}

export default async function ImovelPage({ params }) {
  const { slug } = await params;
  const imovel = await getImovelBySlug(slug);

  if (!imovel) {
    notFound();
  }

  const imovelSchema = {
    '@context': 'https://schema.org',
    '@type': 'SingleFamilyResidence',
    'name': imovel.titulo,
    'description': imovel.descricao || imovel.subtitulo || '',
    'image': imovel.imagens || [],
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': imovel.endereco || '',
      'addressLocality': imovel.bairro || 'Recife',
      'addressRegion': 'PE',
      'addressCountry': 'BR'
    },
    'numberOfRooms': imovel.quartos || undefined,
    'numberOfBathroomsTotal': imovel.banheiros || undefined,
    'floorSize': imovel.area ? {
      '@type': 'QuantitativeValue',
      'value': imovel.area,
      'unitCode': 'MTK'
    } : undefined,
    'offers': {
      '@type': 'Offer',
      'price': imovel.preco,
      'priceCurrency': 'BRL',
      'availability': 'https://schema.org/InStock'
    }
  };

  return (
    <>
      <JsonLd schema={imovelSchema} />
      <Header />
      <main className="imovel-page">
        {/* Breadcrumb */}
        <div className="imovel-header bg-dark">
          <div className="container">
            <nav className="breadcrumb">
              <Link href="/">Página Inicial</Link>
              <span className="separator">/</span>
              <Link href="/#imoveis">Imóveis</Link>
              <span className="separator">/</span>
              <span className="current">{imovel.titulo}</span>
            </nav>
          </div>
        </div>

        <section className="section imovel-detalhes">
          <div className="container">
            <div className="imovel-layout">
              {/* Esquerda: Fotos e Detalhes */}
              <div className="imovel-main">
                <div className="imovel-title-group">
                  <span className="imovel-badge">{imovel.tipo}</span>
                  <h1>{imovel.titulo}</h1>
                  <p className="imovel-location">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {imovel.endereco}
                  </p>
                </div>

                <ImovelGaleria imagens={imovel.imagens} titulo={imovel.titulo} />

                <div className="imovel-info-card">
                  <h2>Características</h2>
                  <ImovelSpecs imovel={imovel} />
                </div>

                <div className="imovel-info-card">
                  <h2>Sobre o Imóvel</h2>
                  <p className="imovel-desc">{imovel.descricao}</p>
                </div>

                {imovel.caracteristicas && imovel.caracteristicas.length > 0 && (
                  <div className="imovel-info-card">
                    <h2>Diferenciais do Condomínio/Imóvel</h2>
                    <ul className="imovel-features">
                      {imovel.caracteristicas.map((feat, i) => (
                        <li key={i}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Cartão de Confiança com o Corretor */}
                <BrokerTrustCard imovelTitulo={imovel.titulo} />
              </div>

              {/* Direita: Sidebar com Preço e Acesso ao Modal */}
              <ImovelSidebarClient imovel={imovel} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
