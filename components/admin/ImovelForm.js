"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createImovel, updateImovel, uploadImage } from '@/lib/supabase';

export default function ImovelForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    titulo: initialData?.titulo || '',
    slug: initialData?.slug || '',
    subtitulo: initialData?.subtitulo || '',
    tipo: initialData?.tipo || 'Apartamento',
    preco: initialData?.preco || '',
    endereco: initialData?.endereco || '',
    bairro: initialData?.bairro || '',
    quartos: initialData?.quartos || '',
    suites: initialData?.suites || '',
    banheiros: initialData?.banheiros || '',
    vagas: initialData?.vagas || '',
    area: initialData?.area || '',
    descricao: initialData?.descricao || '',
    caracteristicas: initialData?.caracteristicas?.join(', ') || '',
    imagens: initialData?.imagens || [],
    destaque: initialData?.destaque || false,
    ativo: initialData?.ativo ?? true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Auto-generate slug from title if empty
    if (name === 'titulo' && !initialData) {
      const autoSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, [name]: value, slug: autoSlug }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        [name]: type === 'checkbox' ? checked : value 
      }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    setError(null);

    const { url, error } = await uploadImage(file);
    
    if (error) {
      setError('Erro ao enviar imagem: ' + error.message);
    } else if (url) {
      setFormData(prev => ({ ...prev, imagens: [...prev.imagens, url] }));
    }
    
    setUploadingImage(false);
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      imagens: prev.imagens.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Format data before saving
    const dataToSave = {
      ...formData,
      preco: Number(formData.preco),
      quartos: Number(formData.quartos) || null,
      suites: Number(formData.suites) || null,
      banheiros: Number(formData.banheiros) || null,
      vagas: Number(formData.vagas) || null,
      caracteristicas: formData.caracteristicas.split(',').map(c => c.trim()).filter(c => c)
    };

    let result;
    if (initialData?.id) {
      result = await updateImovel(initialData.id, dataToSave);
    } else {
      result = await createImovel(dataToSave);
    }

    if (result.error) {
      setError('Erro ao salvar imóvel: ' + result.error.message);
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#1a1d24', padding: '30px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '15px', borderRadius: '4px' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Coluna 1 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', color: '#a1a1aa', marginBottom: '8px' }}>Título do Imóvel *</label>
            <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required style={inputStyle} placeholder="Ex: Apartamento em Boa Viagem" />
          </div>
          
          <div>
            <label style={{ display: 'block', color: '#a1a1aa', marginBottom: '8px' }}>URL Amigável (Slug) *</label>
            <input type="text" name="slug" value={formData.slug} onChange={handleChange} required style={inputStyle} placeholder="ex: apartamento-boa-viagem" />
          </div>

          <div>
            <label style={{ display: 'block', color: '#a1a1aa', marginBottom: '8px' }}>Subtítulo</label>
            <input type="text" name="subtitulo" value={formData.subtitulo} onChange={handleChange} style={inputStyle} placeholder="Ex: 3 quartos, vista mar" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', color: '#a1a1aa', marginBottom: '8px' }}>Tipo *</label>
              <select name="tipo" value={formData.tipo} onChange={handleChange} style={inputStyle}>
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Cobertura">Cobertura</option>
                <option value="Flat">Flat</option>
                <option value="Terreno">Terreno</option>
                <option value="Comercial">Comercial</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#a1a1aa', marginBottom: '8px' }}>Preço (R$) *</label>
              <input type="number" name="preco" value={formData.preco} onChange={handleChange} required style={inputStyle} placeholder="Ex: 450000" />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', color: '#a1a1aa', marginBottom: '8px' }}>Endereço Completo</label>
            <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} style={inputStyle} placeholder="Rua, Número - Cidade, Estado" />
          </div>
          
          <div>
            <label style={{ display: 'block', color: '#a1a1aa', marginBottom: '8px' }}>Bairro</label>
            <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} style={inputStyle} placeholder="Ex: Boa Viagem" />
          </div>
        </div>

        {/* Coluna 2 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', color: '#a1a1aa', marginBottom: '8px' }}>Quartos</label>
              <input type="number" name="quartos" value={formData.quartos} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#a1a1aa', marginBottom: '8px' }}>Suítes</label>
              <input type="number" name="suites" value={formData.suites} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#a1a1aa', marginBottom: '8px' }}>Banheiros</label>
              <input type="number" name="banheiros" value={formData.banheiros} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#a1a1aa', marginBottom: '8px' }}>Vagas</label>
              <input type="number" name="vagas" value={formData.vagas} onChange={handleChange} style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', color: '#a1a1aa', marginBottom: '8px' }}>Área (ex: 85m²)</label>
            <input type="text" name="area" value={formData.area} onChange={handleChange} style={inputStyle} />
          </div>

          <div>
            <label style={{ display: 'block', color: '#a1a1aa', marginBottom: '8px' }}>Características (separadas por vírgula)</label>
            <input type="text" name="caracteristicas" value={formData.caracteristicas} onChange={handleChange} style={inputStyle} placeholder="Piscina, Academia, Varanda..." />
          </div>

          <div>
            <label style={{ display: 'block', color: '#a1a1aa', marginBottom: '8px' }}>Descrição Completa</label>
            <textarea name="descricao" value={formData.descricao} onChange={handleChange} style={{...inputStyle, minHeight: '120px', resize: 'vertical'}}></textarea>
          </div>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f4f4f5', cursor: 'pointer' }}>
              <input type="checkbox" name="destaque" checked={formData.destaque} onChange={handleChange} />
              Destaque na Página Inicial
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f4f4f5', cursor: 'pointer' }}>
              <input type="checkbox" name="ativo" checked={formData.ativo} onChange={handleChange} />
              Imóvel Ativo (Visível)
            </label>
          </div>
        </div>
      </div>

      {/* Seção de Imagens */}
      <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#E3AE45', marginBottom: '15px' }}>Fotos do Imóvel</h3>
        
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '15px' }}>
          {formData.imagens.map((url, index) => (
            <div key={index} style={{ position: 'relative', width: '120px', height: '90px', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(227,174,69,0.3)' }}>
              <img src={url} alt={`Foto ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button 
                type="button" 
                onClick={() => removeImage(index)}
                style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(239, 68, 68, 0.9)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}
              >
                ✕
              </button>
            </div>
          ))}
          
          <label style={{ width: '120px', height: '90px', borderRadius: '4px', border: '1px dashed rgba(255,255,255,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#a1a1aa', background: 'rgba(0,0,0,0.2)' }}>
            {uploadingImage ? 'Enviando...' : (
              <>
                <span style={{ fontSize: '24px' }}>+</span>
                <span style={{ fontSize: '12px' }}>Adicionar</span>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} disabled={uploadingImage} />
          </label>
        </div>
      </div>

      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
        <button type="button" onClick={() => router.push('/admin')} style={{ padding: '12px 24px', background: 'transparent', color: '#f4f4f5', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', cursor: 'pointer' }}>
          Cancelar
        </button>
        <button type="submit" disabled={loading} style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #E3AE45, #9A6621)', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Salvando...' : 'Salvar Imóvel'}
        </button>
      </div>

    </form>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  background: 'rgba(0,0,0,0.2)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '4px',
  color: '#f4f4f5',
  fontFamily: 'inherit'
};
