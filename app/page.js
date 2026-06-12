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
  // Em um cenário real com Supabase configurado, descomente:
  // const imoveis = await getImoveisDestaque();
  
  // Dados mockados enquanto o Supabase não está configurado:
  const imoveis = [
    {
      id: "apartamento-boa-viagem-3quartos",
      slug: "apartamento-boa-viagem-3quartos",
      titulo: "Apartamento em Boa Viagem",
      subtitulo: "3 quartos, 1 suíte — Vista parcial mar",
      tipo: "Apartamento",
      preco: 485000,
      quartos: 3,
      vagas: 1,
      area: "85m²",
      imagens: ["/images/placeholder-imovel.jpg"]
    },
    {
      id: "casa-piedade-4quartos",
      slug: "casa-piedade-4quartos",
      titulo: "Casa Ampla em Piedade",
      subtitulo: "4 quartos, 2 suítes — Terreno de 300m²",
      tipo: "Casa",
      preco: 620000,
      quartos: 4,
      vagas: 2,
      area: "180m²",
      imagens: ["/images/placeholder-imovel.jpg"]
    }
  ];

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
