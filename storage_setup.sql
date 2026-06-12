-- SQL para Configuração do Storage (Imagens dos Imóveis) e Admin Auth

-- 1. Criação do Bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('imoveis', 'imoveis', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Políticas de Storage
-- Permitir leitura pública (qualquer pessoa pode ver as imagens na LP)
CREATE POLICY "Leitura pública de imagens"
ON storage.objects FOR SELECT
USING ( bucket_id = 'imoveis' );

-- Permitir upload/insert apenas para usuários autenticados (Admin)
CREATE POLICY "Upload de imagens apenas para autenticados"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'imoveis' );

-- Permitir delete apenas para usuários autenticados (Admin)
CREATE POLICY "Delete de imagens apenas para autenticados"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'imoveis' );

-- 3. Atualizar Políticas de Segurança da Tabela imoveis
-- Como agora temos Auth, vamos restringir INSERTS, UPDATES e DELETES apenas para admins logados
CREATE POLICY "Inserção apenas para autenticados" ON imoveis
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Atualização apenas para autenticados" ON imoveis
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Exclusão apenas para autenticados" ON imoveis
  FOR DELETE TO authenticated USING (true);

-- Nota de Segurança: A leitura (SELECT) na tabela 'imoveis' continua pública para a LP funcionar.
