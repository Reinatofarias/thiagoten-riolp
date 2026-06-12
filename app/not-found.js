import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="container text-center">
        <h1>404</h1>
        <h2>Imóvel não encontrado</h2>
        <p>Desculpe, o imóvel que você está procurando não existe ou foi removido.</p>
        <Link href="/" className="btn btn-primary">
          Ver Outros Imóveis
        </Link>
      </div>
    </div>
  );
}
