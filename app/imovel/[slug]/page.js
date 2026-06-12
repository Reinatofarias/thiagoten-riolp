import { notFound } from 'next/navigation';
import { getImovelBySlug, getAllSlugs } from '@/lib/supabase';
import Header from '@/components/Header';
import ImovelGaleria from '@/components/ImovelGaleria';
import ImovelSpecs from '@/components/ImovelSpecs';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';
import Link from 'next/link';
import { formatPreco } from '@/lib/utils';

// Isso gera as rotas estáticas para os imóveis no build time
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const imovel = await getImovelBySlug(params.slug);
  if (!imovel) return { title: 'Imóvel não encontrado' };

  return {
    title: `${imovel.titulo} | Thiago Tenório Corretor`,
    description: `Detalhes sobre ${imovel.titulo}. Agende uma visita.`,
  };
}

export default async function ImovelPage({ params }) {
  const imovel = await getImovelBySlug(params.slug);

  if (!imovel) {
    notFound();
  }

  return (
    <>
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
              </div>

              {/* Direita: Sidebar com Formulário */}
              <aside className="imovel-sidebar">
                <div className="imovel-sidebar-inner">
                  <div className="imovel-price-box">
                    <span className="price-label">Valor de venda</span>
                    <div className="price-value text-gold">{formatPreco(imovel.preco)}</div>
                    <p className="price-sub">Negociação direta com o proprietário</p>
                  </div>

                  <div className="form-box">
                    <div className="form-header">
                      <h3>Tenho Interesse</h3>
                      <p>Preencha para receber mais detalhes ou agendar uma visita.</p>
                    </div>
                    <LeadForm imovelTitulo={`${imovel.titulo} — ${formatPreco(imovel.preco)}`} />
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
