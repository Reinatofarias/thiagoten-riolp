import ImovelForm from '@/components/admin/ImovelForm';

export const metadata = {
  title: 'Adicionar Imóvel | Admin',
};

export default function NovoImovelPage() {
  return (
    <div>
      <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#E3AE45', fontSize: '2rem', marginBottom: '30px' }}>Adicionar Novo Imóvel</h1>
      <ImovelForm />
    </div>
  );
}
