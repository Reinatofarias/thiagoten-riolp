const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function fixAtivo() {
  const { data, error } = await supabase.from('imoveis').update({ ativo: true }).eq('slug', 'triplex-maria-farinha');
  if (error) console.error("Error:", error);
  else console.log("Atualizado para ativo: true!");
}

fixAtivo();
