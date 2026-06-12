import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// IMÓVEIS
// ============================================

export async function getImoveis() {
  const { data, error } = await supabase
    .from('imoveis')
    .select('*')
    .eq('ativo', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching imoveis:', error);
    return [];
  }
  return data;
}

export async function getImoveisDestaque() {
  const { data, error } = await supabase
    .from('imoveis')
    .select('*')
    .eq('ativo', true)
    .eq('destaque', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching destaques:', error);
    return [];
  }
  return data;
}

export async function getImovelBySlug(slug) {
  const { data, error } = await supabase
    .from('imoveis')
    .select('*')
    .eq('slug', slug)
    .eq('ativo', true)
    .single();

  if (error) {
    console.error('Error fetching imovel:', error);
    return null;
  }
  return data;
}

export async function getAllSlugs() {
  const { data, error } = await supabase
    .from('imoveis')
    .select('slug')
    .eq('ativo', true);

  if (error) {
    console.error('Error fetching slugs:', error);
    return [];
  }
  return data.map((i) => i.slug);
}

// ============================================
// LEADS
// ============================================

export async function saveLead({ nome, telefone, cidade, imovel_interesse, origem }) {
  const { data, error } = await supabase
    .from('leads')
    .insert([{ nome, telefone, cidade, imovel_interesse, origem }]);

  if (error) {
    console.error('Error saving lead:', error);
    return null;
  }
  return data;
}
