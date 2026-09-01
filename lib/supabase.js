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
  try {
    const { data, error } = await supabase
      .from('imoveis')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching imoveis:', error);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Network or fetch error in getImoveis:', err?.message || err);
    return [];
  }
}

export async function getImoveisDestaque() {
  try {
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
    return data || [];
  } catch (err) {
    console.error('Network or fetch error in getImoveisDestaque:', err?.message || err);
    return [];
  }
}

export async function getImovelBySlug(slug) {
  try {
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
  } catch (err) {
    console.error('Network or fetch error in getImovelBySlug:', err?.message || err);
    return null;
  }
}

export async function getAllSlugs() {
  try {
    const { data, error } = await supabase
      .from('imoveis')
      .select('slug')
      .eq('ativo', true);

    if (error) {
      console.error('Error fetching slugs:', error);
      return [];
    }
    return (data || []).map((i) => i.slug);
  } catch (err) {
    console.error('Network or fetch error in getAllSlugs:', err?.message || err);
    return [];
  }
}

// ============================================
// IMÓVEIS (ADMIN / CRUD)
// ============================================

export async function getImovelById(id) {
  try {
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
  } catch (err) {
    console.error('Network or fetch error in getImovelById:', err?.message || err);
    return null;
  }
}

export async function createImovel(imovelData) {
  try {
    const { data, error } = await supabase
      .from('imoveis')
      .insert([imovelData])
      .select()
      .single();
    return { data, error };
  } catch (err) {
    console.error('Network or fetch error in createImovel:', err?.message || err);
    return { data: null, error: { message: err?.message || 'Erro de conexão' } };
  }
}

export async function updateImovel(id, imovelData) {
  try {
    const { data, error } = await supabase
      .from('imoveis')
      .update(imovelData)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  } catch (err) {
    console.error('Network or fetch error in updateImovel:', err?.message || err);
    return { data: null, error: { message: err?.message || 'Erro de conexão' } };
  }
}

export async function deleteImovel(id) {
  try {
    const { error } = await supabase
      .from('imoveis')
      .delete()
      .eq('id', id);
    return { error };
  } catch (err) {
    console.error('Network or fetch error in deleteImovel:', err?.message || err);
    return { error: { message: err?.message || 'Erro de conexão' } };
  }
}

// ============================================
// STORAGE
// ============================================

export async function compressImage(file, maxWidth = 1200, quality = 0.8) {
  if (typeof window === 'undefined' || !file || !file.type?.startsWith('image/')) {
    return file;
  }
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }
            const compressedFile = new File(
              [blob],
              file.name.replace(/\.[^/.]+$/, "") + ".webp",
              { type: 'image/webp', lastModified: Date.now() }
            );
            resolve(compressedFile);
          },
          'image/webp',
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
}

export async function uploadImage(file) {
  try {
    const compressedFile = await compressImage(file);
    const formData = new FormData();
    formData.append('file', compressedFile);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      return { error: { message: data.error || 'Erro no upload para R2' }, url: null };
    }

    return { error: null, url: data.url };
  } catch (err) {
    return { error: { message: err.message }, url: null };
  }
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
