"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createImovel, updateImovel, uploadImage } from '@/lib/supabase';

// Helper to format raw number to currency display (e.g. 450000 -> R$ 450.000)
const formatCurrency = (val) => {
  if (val === undefined || val === null || val === '') return '';
  const cleanValue = val.toString().replace(/\D/g, '');
  if (!cleanValue) return '';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Number(cleanValue));
};

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

  const [priceDisplay, setPriceDisplay] = useState(
    initialData?.preco ? formatCurrency(initialData.preco) : ''
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Auto-generate slug from title if creating new property
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

  const handlePriceChange = (e) => {
    const rawValue = e.target.value;
    const formatted = formatCurrency(rawValue);
    const numericValue = Number(rawValue.replace(/\D/g, '')) || '';
    
    setPriceDisplay(formatted);
    setFormData(prev => ({ ...prev, preco: numericValue }));
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
    <form onSubmit={handleSubmit} className="admin-form">
      {error && (
        <div className="admin-error-box">
          {error}
        </div>
      )}

      <div className="admin-form-row">
        {/* Coluna 1: Informações Principais e Localização */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 className="admin-form-section-title">Informações Gerais</h3>
          
          <div className="admin-form-group">
            <label className="admin-form-label">Título do Imóvel *</label>
            <input 
              type="text" 
              name="titulo" 
              value={formData.titulo} 
              onChange={handleChange} 
              required 
              className="admin-form-input" 
              placeholder="Ex: Apartamento em Boa Viagem" 
            />
          </div>
          
          <div className="admin-form-group">
            <label className="admin-form-label">URL Amigável (Slug) *</label>
            <input 
              type="text" 
              name="slug" 
              value={formData.slug} 
              onChange={handleChange} 
              required 
              className="admin-form-input" 
              placeholder="ex: apartamento-boa-viagem" 
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Subtítulo / Destaque Rápido</label>
            <input 
              type="text" 
              name="subtitulo" 
              value={formData.subtitulo} 
              onChange={handleChange} 
              className="admin-form-input" 
              placeholder="Ex: 3 quartos, vista mar" 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Tipo *</label>
              <select 
                name="tipo" 
                value={formData.tipo} 
                onChange={handleChange} 
                className="admin-form-select"
              >
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Cobertura">Cobertura</option>
                <option value="Flat">Flat</option>
                <option value="Terreno">Terreno</option>
                <option value="Comercial">Comercial</option>
              </select>
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Preço *</label>
              <input 
                type="text" 
                value={priceDisplay} 
                onChange={handlePriceChange} 
                required 
                className="admin-form-input" 
                placeholder="Ex: R$ 450.000" 
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Endereço Completo</label>
            <input 
              type="text" 
              name="endereco" 
              value={formData.endereco} 
              onChange={handleChange} 
              className="admin-form-input" 
              placeholder="Ex: Rua Amaro Branco, 123" 
            />
          </div>
          
          <div className="admin-form-group">
            <label className="admin-form-label">Bairro</label>
            <input 
              type="text" 
              name="bairro" 
              value={formData.bairro} 
              onChange={handleChange} 
              className="admin-form-input" 
              placeholder="Ex: Olinda" 
            />
          </div>
        </div>

        {/* Coluna 2: Características e Atributos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 className="admin-form-section-title">Detalhes Técnicos</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Quartos</label>
              <input 
                type="number" 
                name="quartos" 
                value={formData.quartos} 
                onChange={handleChange} 
                className="admin-form-input" 
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Suítes</label>
              <input 
                type="number" 
                name="suites" 
                value={formData.suites} 
                onChange={handleChange} 
                className="admin-form-input" 
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Banheiros</label>
              <input 
                type="number" 
                name="banheiros" 
                value={formData.banheiros} 
                onChange={handleChange} 
                className="admin-form-input" 
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Vagas Garagem</label>
              <input 
                type="number" 
                name="vagas" 
                value={formData.vagas} 
                onChange={handleChange} 
                className="admin-form-input" 
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Área Útil (ex: 85m²)</label>
            <input 
              type="text" 
              name="area" 
              value={formData.area} 
              onChange={handleChange} 
              className="admin-form-input" 
              placeholder="Ex: 85m²"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Diferenciais do Imóvel (separados por vírgula)</label>
            <input 
              type="text" 
              name="caracteristicas" 
              value={formData.caracteristicas} 
              onChange={handleChange} 
              className="admin-form-input" 
              placeholder="Piscina, Academia, Segurança 24h..." 
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Descrição do Imóvel</label>
            <textarea 
              name="descricao" 
              value={formData.descricao} 
              onChange={handleChange} 
              className="admin-form-textarea"
              placeholder="Escreva detalhes adicionais, infraestrutura..."
            />
          </div>
          
          <div className="admin-form-checkbox-group">
            <label className="admin-form-checkbox-label">
              <input 
                type="checkbox" 
                name="destaque" 
                checked={formData.destaque} 
                onChange={handleChange} 
              />
              Destaque na Página Inicial
            </label>
            
            <label className="admin-form-checkbox-label">
              <input 
                type="checkbox" 
                name="ativo" 
                checked={formData.ativo} 
                onChange={handleChange} 
              />
              Imóvel Ativo (Visível)
            </label>
          </div>
        </div>
      </div>

      {/* Seção de Fotos do Imóvel */}
      <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border-glass)' }}>
        <h3 className="admin-form-section-title">Fotos do Imóvel</h3>
        
        <div className="admin-upload-grid">
          {formData.imagens.map((url, index) => (
            <div key={index} className="admin-image-preview">
              <img src={url} alt={`Foto ${index + 1}`} />
              <button 
                type="button" 
                onClick={() => removeImage(index)}
                className="admin-image-delete-btn"
                aria-label="Excluir imagem"
              >
                ✕
              </button>
            </div>
          ))}
          
          <label className="admin-upload-trigger">
            {uploadingImage ? (
              <span className="text">Enviando...</span>
            ) : (
              <>
                <span className="icon">+</span>
                <span className="text">Adicionar</span>
              </>
            )}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              style={{ display: 'none' }} 
              disabled={uploadingImage} 
            />
          </label>
        </div>
      </div>

      {/* Botões de Ação do Formulário */}
      <div className="admin-form-actions">
        <button 
          type="button" 
          onClick={() => router.push('/admin')} 
          className="btn" 
          style={{ background: 'transparent', color: 'var(--text-light)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          disabled={loading} 
          className="btn btn-primary"
        >
          {loading ? 'Salvando...' : 'Salvar Imóvel'}
        </button>
      </div>
    </form>
  );
}
