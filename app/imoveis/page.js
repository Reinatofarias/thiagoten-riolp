import { getImoveisDestaque } from '@/lib/supabase';
import Header from '@/components/Header';
import ImoveisGrid from '@/components/ImoveisGrid';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const revalidate = 0; // Disable cache so new properties show instantly

export const metadata = {
  title: 'Imóveis em Destaque | Recife e Região',
  description: 'Confira nossa seleção exclusiva de casas e apartamentos em Recife. Filtre por bairro, tipo e preço para encontrar a oportunidade perfeita.',
};

export default async function ImoveisPage() {
  const imoveis = await getImoveisDestaque();

  return (
    <>
      <Header />
      <main className="imovel-page">
        <div className="imovel-header bg-dark">
          <div className="container">
            <nav className="breadcrumb">
              <Link href="/">Página Inicial</Link>
              <span className="separator">/</span>
              <span className="current">Buscar Imóveis</span>
            </nav>
          </div>
        </div>

        <section style={{ padding: '40px 0 20px' }}>
          <div className="container">
            <div className="section-header" style={{ marginBottom: '20px' }}>
              <span className="section-label">Portfólio</span>
              <h2 style={{ fontSize: '2.5rem' }}>Curadoria <span className="text-gold-dark">Exclusiva</span></h2>
              <p>Explore as melhores opções residenciais disponíveis no momento.</p>
            </div>
          </div>
        </section>

        <ImoveisGrid imoveis={imoveis} />
      </main>
      <Footer />
    </>
  );
}
