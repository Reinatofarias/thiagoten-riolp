import { createClient } from '@supabase/supabase-js';

// Usar chaves reais se existirem, senão usar um mock que seja uma URL HTTP(s) válida e uma key falsa
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// IMÓVEIS
// ============================================

export async function getImoveis() {
  // Mock prevent error during build
  if (supabaseUrl === 'https://mock.supabase.co') return [];

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
  if (supabaseUrl === 'https://mock.supabase.co') return [];

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
  if (supabaseUrl === 'https://mock.supabase.co') return null;

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
  if (supabaseUrl === 'https://mock.supabase.co') return [];

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
  if (supabaseUrl === 'https://mock.supabase.co') return null;

  const { data, error } = await supabase
    .from('leads')
    .insert([{ nome, telefone, cidade, imovel_interesse, origem }]);

  if (error) {
    console.error('Error saving lead:', error);
    return null;
  }
  return data;
}
