import './globals.css';

export const metadata = {
  metadataBase: new URL('https://www.thiagotenorioimoveis.com.br'),
  title: 'Thiago Tenório | Corretor de Imóveis',
  description: 'Compre seu imóvel com segurança e sem burocracia. Atendimento personalizado do início às chaves.',
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
