import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// AUTHENTICATION
// ============================================

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  return { data, error };
}

// ============================================
// IMÓVEIS (PÚBLICO)
// ============================================

export async function getImoveis() {
  const { data, error } = await supabase
    .from('imoveis')
    .select('*')
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
// IMÓVEIS (ADMIN / CRUD)
// ============================================

export async function getImovelById(id) {
  const { data, error } = await supabase
    .from('imoveis')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching imovel by ID:', error);
    return null;
  }
  return data;
}

export async function createImovel(imovelData) {
  const { data, error } = await supabase
    .from('imoveis')
    .insert([imovelData])
    .select()
    .single();
  return { data, error };
}

export async function updateImovel(id, imovelData) {
  const { data, error } = await supabase
    .from('imoveis')
    .update(imovelData)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
}

export async function deleteImovel(id) {
  const { error } = await supabase
    .from('imoveis')
    .delete()
    .eq('id', id);
  return { error };
}

// ============================================
// STORAGE
// ============================================

export async function uploadImage(file) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('imoveis')
    .upload(filePath, file);

  if (uploadError) {
    return { error: uploadError, url: null };
  }

  const { data } = supabase.storage
    .from('imoveis')
    .getPublicUrl(filePath);

  return { error: null, url: data.publicUrl };
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
