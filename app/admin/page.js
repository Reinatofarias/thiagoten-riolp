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
      <div className="admin-header">
        <h1>Meus Imóveis</h1>
        <Link 
          href="/admin/novo"
          className="btn btn-primary"
          style={{ padding: '10px 20px', fontSize: '0.85rem' }}
        >
          + Novo Imóvel
        </Link>
      </div>

      {loading ? (
        <p style={{ color: 'var(--text-muted)' }}>Carregando imóveis...</p>
      ) : imoveis.length === 0 ? (
        <div style={{ padding: '60px 40px', background: 'var(--bg-card)', borderRadius: 'var(--radius)', textAlign: 'center', border: '1px solid var(--border-glass)' }}>
          <p style={{ color: 'var(--text-muted)' }}>Nenhum imóvel cadastrado ainda.</p>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Imóvel</th>
                <th>Tipo</th>
                <th>Preço</th>
                <th>Destaque</th>
                <th style={{ textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {imoveis.map((imovel) => (
                <tr key={imovel.id}>
                  <td>
                    <div style={{ fontWeight: '600', color: 'var(--text-light)', fontSize: '1.05rem', marginBottom: '4px' }}>{imovel.titulo}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{imovel.bairro}</div>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{imovel.tipo}</td>
                  <td style={{ color: 'var(--text-light)', fontWeight: '500' }}>{formatPrice(imovel.preco)}</td>
                  <td>
                    <span className={`admin-badge ${imovel.destaque ? 'admin-badge-gold' : 'admin-badge-inactive'}`}>
                      {imovel.destaque ? 'Destaque' : 'Não'}
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <Link 
                        href={`/imovel/${imovel.slug}`}
                        target="_blank"
                        className="admin-btn-action admin-btn-action-view"
                      >
                        Ver
                      </Link>
                      <Link 
                        href={`/admin/editar/${imovel.id}`}
                        className="admin-btn-action admin-btn-action-edit"
                      >
                        Editar
                      </Link>
                      <button 
                        onClick={() => handleDelete(imovel.id, imovel.titulo)}
                        className="admin-btn-action admin-btn-action-delete"
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
