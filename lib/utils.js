// ============================================
// ⚙️ CONFIGURAÇÕES — EDITE AQUI
// ============================================
export const CONFIG = {
  // Webhook Make
  WEBHOOK_URL: 'https://hook.us1.make.com/qz86k45xlehyj3muore1vqikv8muy22n',

  // WhatsApp
  WHATSAPP_NUMBER: '5581994286597',

  // Mensagem do WhatsApp (com ou sem imóvel)
  WHATSAPP_MESSAGE: (data) => {
    if (data.imovel) {
      return `Olá Thiago! Meu nome é ${data.nome} e tenho interesse no imóvel: *${data.imovel}*.`;
    }
    return `Olá Thiago! Meu nome é ${data.nome} e tenho interesse em comprar um imóvel.`;
  },

  // Delay antes do redirect (ms)
  REDIRECT_DELAY: 1000,
};

// ============================================
// 🧹 LIMPEZA DE PREFIXO 55 (DDI BRASIL)
// ============================================
export function cleanPhoneDigits(value) {
  let digits = value.replace(/\D/g, '');

  if (digits.startsWith('55')) {
    if (digits.length > 11) {
      // Ex: 5581985647622 (13 dígitos) -> 81985647622
      digits = digits.slice(2);
    } else if (digits.length === 11) {
      if (digits[2] === '9') {
        // Ex: 55988720635 (11 dígitos começando com 559...)
        // DDI 55 + Celular sem DDD. Assumimos DDD 81 (Pernambuco)
        digits = '81' + digits.slice(2);
      } else {
        // Ex: 55819856476 (11 dígitos, incompleto) -> remove o 55
        digits = digits.slice(2);
      }
    }
  }

  return digits;
}

// ============================================
// 📱 MÁSCARA DE TELEFONE
// ============================================
export function applyPhoneMask(value) {
  let digits = cleanPhoneDigits(value);
  digits = digits.substring(0, 11);

  if (digits.length > 10) {
    // 11 dígitos (celular): (XX) XXXXX-XXXX
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  } else if (digits.length > 6) {
    // 10 dígitos (fixo): (XX) XXXX-XXXX
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  } else if (digits.length > 2) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  } else if (digits.length > 0) {
    return `(${digits}`;
  }
  return '';
}

// ============================================
// ✅ VALIDAÇÃO
// ============================================
export const validators = {
  nome: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return 'Informe seu nome completo';
    if (trimmed.length < 3) return 'Nome deve ter pelo menos 3 caracteres';
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(trimmed)) return 'Nome deve conter apenas letras';
    return '';
  },
  telefone: (value) => {
    const digits = cleanPhoneDigits(value);
    if (!digits) return 'Informe seu telefone';
    if (digits.length < 10) return 'Telefone deve ter 10 ou 11 dígitos';
    return '';
  },
  cidade: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return 'Informe sua cidade';
    if (trimmed.length < 2) return 'Cidade deve ter pelo menos 2 caracteres';
    return '';
  },
};

export function validateField(name, value) {
  const validator = validators[name];
  if (!validator) return '';
  return validator(value);
}

// ============================================
// 🔗 WEBHOOK
// ============================================
export async function sendToWebhook(data) {
  const payload = {
    nome: data.nome,
    telefone: data.telefone,
    cidade: data.cidade || '',
    imovel_interesse: data.imovel || '',
    data_envio: new Date().toISOString(),
    origem: typeof window !== 'undefined' ? window.location.href : '',
  };

  try {
    await fetch(CONFIG.WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('Webhook error:', err);
  }

}

// ============================================
// 💬 WHATSAPP
// ============================================
export function getWhatsAppUrl(data) {
  const message = encodeURIComponent(CONFIG.WHATSAPP_MESSAGE(data));
  return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${message}`;
}

// ============================================
// 💰 FORMATAR PREÇO
// ============================================
export function formatPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 });
}
