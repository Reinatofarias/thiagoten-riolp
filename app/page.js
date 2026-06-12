import { getImoveisDestaque } from '@/lib/supabase';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Diferenciais from '@/components/Diferenciais';
import Processo from '@/components/Processo';
import ImoveisGrid from '@/components/ImoveisGrid';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  const imoveis = await getImoveisDestaque();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Diferenciais />
        <Processo />
        <ImoveisGrid imoveis={imoveis} />
        
        <section className="section formulario" id="formulario">
          <div className="container">
            <div className="formulario-wrapper">
              <div className="form-box">
                <div className="form-header">
                  <span className="section-label">Atendimento imediato</span>
                  <h2>Fale Com Um Especialista <span className="text-gold-dark">Agora</span></h2>
                  <p>Preencha abaixo e em <strong>menos de 2 minutos</strong> eu te atendo no WhatsApp. Sem compromisso.</p>
                </div>
                <LeadForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
