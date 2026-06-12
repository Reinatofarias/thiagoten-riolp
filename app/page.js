import { getImoveisDestaque } from '@/lib/supabase';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Processo from '@/components/Processo';
import ImoveisGrid from '@/components/ImoveisGrid';
import Footer from '@/components/Footer';

export const revalidate = 0; // Disable cache so new properties show instantly

export default async function Home() {
  const imoveis = await getImoveisDestaque();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Processo />
        <ImoveisGrid imoveis={imoveis} />
      </main>
      <Footer />
    </>
  );
}


