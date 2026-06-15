import Script from 'next/script';
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
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-NQ4W72KH';
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-18232289198';

  return (
    <html lang="pt-BR">
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-ads-tag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAdsId}');
            `,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
