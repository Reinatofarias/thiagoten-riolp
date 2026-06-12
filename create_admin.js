const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Faltam as variáveis de ambiente no .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function signUpUser() {
  console.log("Tentando criar usuário...");
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@thiagoimoveis.com.br',
    password: 'admin@2026',
  });

  if (error) {
    console.error("Erro ao criar usuário:", error.message);
  } else {
    console.log("Usuário criado com sucesso!");
    console.log("Email:", data?.user?.email);
    console.log("Agora vá no SQL Editor do Supabase e rode o comando UPDATE para confirmar o email.");
  }
}

signUpUser();
