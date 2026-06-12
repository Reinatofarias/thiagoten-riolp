"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getImovelById } from '@/lib/supabase';
import ImovelForm from '@/components/admin/ImovelForm';

export default function EditarImovelPage() {
  const { id } = useParams();
  const [imovel, setImovel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getImovelById(id);
      setImovel(data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) {
    return <p style={{ color: '#E3AE45' }}>Carregando dados do imóvel...</p>;
  }

  if (!imovel) {
    return <p style={{ color: '#ef4444' }}>Imóvel não encontrado.</p>;
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#E3AE45', fontSize: '2rem', marginBottom: '30px' }}>Editar Imóvel: {imovel.titulo}</h1>
      <ImovelForm initialData={imovel} />
    </div>
  );
}
