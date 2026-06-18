import { getImoveisDestaque } from '@/lib/supabase';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Processo from '@/components/Processo';
import ImoveisGrid from '@/components/ImoveisGrid';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';

export const revalidate = 0; // Disable cache so new properties show instantly

export default async function Home() {
  const imoveis = await getImoveisDestaque();

  const realEstateAgentSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    'name': 'Thiago Tenório — Corretor de Imóveis',
    'image': 'https://www.thiagotenorioimoveis.com.br/images/thiago-profile.png',
    '@id': 'https://www.thiagotenorioimoveis.com.br/#corretor',
    'url': 'https://www.thiagotenorioimoveis.com.br',
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
      <main>
        <Hero />
        <ImoveisGrid imoveis={imoveis} />
        <Processo />
      </main>
      <Footer />
    </>
  );
}


