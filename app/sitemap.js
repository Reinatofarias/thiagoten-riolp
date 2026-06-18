import { getAllSlugs } from '@/lib/supabase';

export default async function sitemap() {
  const baseUrl = 'https://www.thiagotenorioimoveis.com.br';

  // Páginas estáticas / institucionais
  const staticRoutes = [
    '',
    '/sobre',
    '/como-funciona',
    '/imoveis',
    '/contato',
    '/financiamento'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Buscar os slugs dos imóveis ativos de forma assíncrona
  let slugs = [];
  try {
    slugs = await getAllSlugs();
  } catch (error) {
    console.error('Erro ao buscar slugs para sitemap:', error);
  }

  // Mapear os imóveis para URLs no sitemap
  const dynamicRoutes = slugs.map((slug) => ({
    url: `${baseUrl}/imovel/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
