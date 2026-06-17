'use client';

import { useState } from 'react';
import { validateField, sendToWebhook, getWhatsAppUrl, CONFIG } from '@/lib/utils';

export default function LeadForm({ imovelTitulo = '' }) {
  const [formData, setFormData] = useState({ nome: '', telefone: '' });
  const [errors, setErrors] = useState({ nome: '', telefone: '' });
  const [touched, setTouched] = useState({ nome: false, telefone: false });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Honeypot
  const [website, setWebsite] = useState('');

  const handleMask = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 11);

    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }

    setFormData({ ...formData, telefone: value });
    if (touched.telefone) {
      setErrors({ ...errors, telefone: validateField('telefone', value) });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (touched[name]) {
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const isFormValid = () => {
    const nomeError = validateField('nome', formData.nome);
    const telefoneError = validateField('telefone', formData.telefone);
    return !nomeError && !telefoneError && formData.nome && formData.telefone;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check
    if (website) return;

    // Validate all
    const newErrors = {
      nome: validateField('nome', formData.nome),
      telefone: validateField('telefone', formData.telefone),
    };
    setErrors(newErrors);
    setTouched({ nome: true, telefone: true });

    if (newErrors.nome || newErrors.telefone) return;

    setLoading(true);

    const payload = {
      ...formData,
      imovel: imovelTitulo,
    };

    // 1. Send to Webhook (fire-and-forget)
    sendToWebhook(payload);

    // 2. Visual delay
    await new Promise((resolve) => setTimeout(resolve, CONFIG.REDIRECT_DELAY));

    // 3. Success state
    setSuccess(true);
    setLoading(false);

    const whatsappUrl = getWhatsAppUrl(payload);

    // Push event to GTM dataLayer
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'whatsapp_redirect',
        whatsapp_url: whatsappUrl,
        lead_nome: payload.nome,
        lead_cidade: '',
        lead_imovel: payload.imovel || 'Geral'
      });
    }

    // 4. Redirect WhatsApp using a temporary anchor element (so GTM Link Click trigger captures it)
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = whatsappUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 800);
  };

  if (success) {
    return (
      <div className="form-success show">
        <div className="form-success-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <h3>Dados Enviados!</h3>
        <p>Estou te redirecionando para o WhatsApp...</p>
      </div>
    );
  }

  return (
    <form id="lead-form" onSubmit={handleSubmit} noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        className="hp-field"
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />

      {/* Nome */}
      <div className={`form-group floating-group ${touched.nome ? (errors.nome ? 'invalid-group' : 'valid-group') : ''}`}>
        <input
          type="text"
          id="input-nome"
          name="nome"
          placeholder=" "
          value={formData.nome}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          autoComplete="name"
          className={touched.nome ? (errors.nome ? 'invalid' : 'valid') : ''}
        />
        <label htmlFor="input-nome">Seu Nome</label>
        <span className="error-msg" role="alert" aria-live="polite">{errors.nome}</span>
      </div>

      {/* Telefone */}
      <div className={`form-group floating-group ${touched.telefone ? (errors.telefone ? 'invalid-group' : 'valid-group') : ''}`}>
        <input
          type="tel"
          id="input-telefone"
          name="telefone"
          placeholder=" "
          value={formData.telefone}
          onChange={handleMask}
          onBlur={handleBlur}
          required
          autoComplete="tel"
          className={touched.telefone ? (errors.telefone ? 'invalid' : 'valid') : ''}
        />
        <label htmlFor="input-telefone">Seu Telefone</label>
        <span className="error-msg" role="alert" aria-live="polite">{errors.telefone}</span>
      </div>

      {/* Submit */}
      <button 
        type="submit" 
        id="btn-submit" 
        className={`btn btn-primary btn-submit ${loading ? 'loading' : ''}`} 
        disabled={!isFormValid() || loading}
        data-href={getWhatsAppUrl({ ...formData, imovel: imovelTitulo })}
      >
        <span className="btn-text">Falar com o Corretor no WhatsApp →</span>
        {loading && <span className="btn-loader" aria-hidden="true"></span>}
      </button>

      <div className="form-guarantee">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <span>Seus dados estão seguros. Sem spam. Sem compartilhamento.</span>
      </div>

    </form>
  );
}
