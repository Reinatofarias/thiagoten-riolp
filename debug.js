const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkDatabase() {
  const { data, error } = await supabase.from('imoveis').select('slug, titulo, ativo, destaque');
  if (error) console.error("Error:", error);
  else console.log("Imoveis no DB:", data);
}

checkDatabase();
