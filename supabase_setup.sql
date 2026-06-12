-- 1. Tabela de Imóveis
CREATE TABLE imoveis (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  titulo text NOT NULL,
  subtitulo text,
  tipo text,
  preco integer,
  endereco text,
  bairro text,
  quartos integer,
  suites integer,
  banheiros integer,
  vagas integer,
  area text,
  descricao text,
  caracteristicas text[],
  imagens text[],
  destaque boolean DEFAULT false,
  ativo boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- 2. Tabela de Leads
CREATE TABLE leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome text NOT NULL,
  telefone text NOT NULL,
  cidade text,
  imovel_interesse text,
  origem text,
  created_at timestamptz DEFAULT now()
);

-- 3. Políticas de Segurança (RLS)
-- Habilita RLS
ALTER TABLE imoveis ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Política: Qualquer um pode ler os imóveis
CREATE POLICY "Leitura pública de imóveis" ON imoveis
  FOR SELECT USING (true);

-- Política: Qualquer um pode inserir leads (mas não ler)
CREATE POLICY "Inserção pública de leads" ON leads
  FOR INSERT WITH CHECK (true);

-- 4. Inserir imóveis de exemplo
INSERT INTO imoveis (slug, titulo, subtitulo, tipo, preco, endereco, bairro, quartos, suites, banheiros, vagas, area, descricao, caracteristicas, imagens, destaque) VALUES
(
  'apartamento-boa-viagem-3quartos',
  'Apartamento em Boa Viagem',
  '3 quartos, 1 suíte — Vista parcial mar',
  'Apartamento',
  485000,
  'Rua dos Navegantes, Boa Viagem — Recife, PE',
  'Boa Viagem',
  3, 1, 2, 1, '85m²',
  'Apartamento completamente reformado com acabamentos de alto padrão. Sala ampla com varanda e vista parcial para o mar. Cozinha planejada com bancada em granito. Piso em porcelanato em todos os ambientes. Condomínio com infraestrutura completa.',
  ARRAY['Piscina', 'Academia', 'Salão de festas', 'Portaria 24h', 'Próximo à praia', 'Elevador'],
  ARRAY['https://placehold.co/800x600/1a1d24/E3AE45?text=Foto+1', 'https://placehold.co/800x600/1a1d24/E3AE45?text=Foto+2'],
  true
),
(
  'casa-piedade-4quartos',
  'Casa Ampla em Piedade',
  '4 quartos, 2 suítes — Terreno de 300m²',
  'Casa',
  620000,
  'Rua Professor José Brandão, Piedade — Jaboatão, PE',
  'Piedade',
  4, 2, 3, 2, '180m²',
  'Casa espaçosa com 4 quartos, sendo 2 suítes. Quintal amplo com churrasqueira e espaço gourmet. Garagem para 2 carros. Localização privilegiada a 5 minutos da praia de Piedade e próximo a escolas, supermercados e farmácias.',
  ARRAY['Churrasqueira', 'Quintal', 'Espaço gourmet', 'Garagem coberta', 'Próximo à praia', 'Rua tranquila'],
  ARRAY['https://placehold.co/800x600/1a1d24/E3AE45?text=Foto+1'],
  true
),
(
  'cobertura-pina-2suites',
  'Cobertura Duplex no Pina',
  '2 suítes — Terraço panorâmico com piscina',
  'Cobertura',
  890000,
  'Av. Herculano Bandeira, Pina — Recife, PE',
  'Pina',
  2, 2, 3, 2, '140m²',
  'Cobertura duplex com acabamento premium. Andar inferior com sala integrada, cozinha americana e lavabo. Andar superior com 2 suítes e terraço panorâmico com piscina privativa e vista para o Rio Capibaribe. Lazer completo no condomínio.',
  ARRAY['Piscina privativa', 'Terraço panorâmico', 'Vista para o rio', 'Cozinha americana', 'Lazer completo', '2 vagas cobertas'],
  ARRAY['https://placehold.co/800x600/1a1d24/E3AE45?text=Foto+1'],
  true
);
