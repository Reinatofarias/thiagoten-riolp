import './globals.css';

export const metadata = {
  metadataBase: new URL('https://www.thiagotenorioimoveis.com.br'),
  title: {
    default: 'Thiago Tenório | Imóveis de Alto Padrão em Recife',
    template: '%s | Thiago Tenório Corretor'
  },
  description: 'Compre seu imóvel com segurança e sem burocracia. Atendimento personalizado e curadoria exclusiva do início às chaves.',
  openGraph: {
    title: 'Thiago Tenório | Imóveis de Alto Padrão em Recife',
    description: 'Encontre o imóvel perfeito em Recife e região. Atendimento premium personalizado e sem burocracia do primeiro contato às chaves.',
    url: 'https://www.thiagotenorioimoveis.com.br',
    siteName: 'Thiago Tenório Imóveis',
    images: [
      {
        url: '/images/share-preview.png',
        width: 1200,
        height: 630,
        alt: 'Thiago Tenório | Imóveis de Alto Padrão',
      }
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thiago Tenório | Imóveis de Alto Padrão em Recife',
    description: 'Encontre o imóvel perfeito em Recife e região. Atendimento premium personalizado do início às chaves.',
    images: ['/images/share-preview.png'],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
