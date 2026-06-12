const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function testFetch() {
  const { data, error } = await supabase
    .from('imoveis')
    .select('*')
    .eq('slug', 'triplex-maria-farinha')
    .single();

  if (error) {
    console.error("Error fetching:", error);
  } else {
    console.log("Fetched successfully:", data.titulo);
  }
}

testFetch();
