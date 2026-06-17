import Link from 'next/link';
import { formatPreco } from '@/lib/utils';

export default function ImovelCard({ imovel }) {
  const imgSrc = imovel.imagens && imovel.imagens.length > 0
    ? imovel.imagens[0]
    : '/images/placeholder-imovel.jpg';

  return (
    <Link href={`/imovel/${imovel.slug}`} className="imovel-card animate-on-scroll">
      <div className="imovel-card-img">
        <img src={imgSrc} alt={imovel.titulo} loading="lazy" />
        <span className="imovel-card-badge">{imovel.tipo}</span>
      </div>
      <div className="imovel-card-body">
        <h3>{imovel.titulo}</h3>
        <p className="imovel-card-subtitle">{imovel.subtitulo}</p>
        <div className="imovel-card-price">Sob Consulta</div>
        <div className="imovel-card-specs">
          <span title="Quartos">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7"/><path d="M21 7H3l2-4h14l2 4z"/><path d="M12 4v3"/></svg>
            {imovel.quartos} {imovel.quartos === 1 ? 'quarto' : 'quartos'}
          </span>
          <span title="Área">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 3v18"/></svg>
            {imovel.area}
          </span>
          <span title="Vagas">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="22" height="12" rx="2"/><path d="M6 12h4"/><path d="M14 12h4"/></svg>
            {imovel.vagas} {imovel.vagas === 1 ? 'vaga' : 'vagas'}
          </span>
        </div>
      </div>
    </Link>
  );
}
