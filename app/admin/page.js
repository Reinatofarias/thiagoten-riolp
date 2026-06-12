"use client";

import { useEffect, useState } from 'react';
import { getImoveis, deleteImovel } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminDashboard() {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImoveis = async () => {
    setLoading(true);
    const data = await getImoveis();
    setImoveis(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchImoveis();
  }, []);

  const handleDelete = async (id, titulo) => {
    if (window.confirm(`Tem certeza que deseja excluir "${titulo}"?`)) {
      await deleteImovel(id);
      fetchImoveis();
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#E3AE45', fontSize: '2rem' }}>Meus Imóveis</h1>
        <Link 
          href="/admin/novo"
          style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #E3AE45, #9A6621)', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}
        >
          + Novo Imóvel
        </Link>
      </div>

      {loading ? (
        <p>Carregando imóveis...</p>
      ) : imoveis.length === 0 ? (
        <div style={{ padding: '40px', background: '#1a1d24', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ color: '#a1a1aa' }}>Nenhum imóvel cadastrado ainda.</p>
        </div>
      ) : (
        <div style={{ background: '#1a1d24', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'rgba(0,0,0,0.2)' }}>
              <tr>
                <th style={{ padding: '16px', color: '#E3AE45', fontWeight: '500' }}>Imóvel</th>
                <th style={{ padding: '16px', color: '#E3AE45', fontWeight: '500' }}>Tipo</th>
                <th style={{ padding: '16px', color: '#E3AE45', fontWeight: '500' }}>Preço</th>
                <th style={{ padding: '16px', color: '#E3AE45', fontWeight: '500' }}>Destaque</th>
                <th style={{ padding: '16px', color: '#E3AE45', fontWeight: '500', textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {imoveis.map((imovel) => (
                <tr key={imovel.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 'bold', color: '#f4f4f5' }}>{imovel.titulo}</div>
                    <div style={{ fontSize: '0.875rem', color: '#a1a1aa' }}>{imovel.bairro}</div>
                  </td>
                  <td style={{ padding: '16px', color: '#a1a1aa' }}>{imovel.tipo}</td>
                  <td style={{ padding: '16px', color: '#f4f4f5' }}>{formatPrice(imovel.preco)}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', background: imovel.destaque ? 'rgba(227, 174, 69, 0.2)' : 'rgba(255,255,255,0.1)', color: imovel.destaque ? '#E3AE45' : '#a1a1aa' }}>
                      {imovel.destaque ? 'Sim' : 'Não'}
                    </span>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                      <Link 
                        href={`/imovel/${imovel.slug}`}
                        target="_blank"
                        style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', color: '#f4f4f5', textDecoration: 'none', borderRadius: '4px', fontSize: '0.875rem' }}
                      >
                        Ver
                      </Link>
                      <Link 
                        href={`/admin/editar/${imovel.id}`}
                        style={{ padding: '6px 12px', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', textDecoration: 'none', borderRadius: '4px', fontSize: '0.875rem' }}
                      >
                        Editar
                      </Link>
                      <button 
                        onClick={() => handleDelete(imovel.id, imovel.titulo)}
                        style={{ padding: '6px 12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', cursor: 'pointer', borderRadius: '4px', fontSize: '0.875rem' }}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
