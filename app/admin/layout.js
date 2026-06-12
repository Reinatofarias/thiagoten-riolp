"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getSession, signOut } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await getSession();
      if (data?.session) {
        setUser(data.session.user);
      } else if (pathname !== '/admin/login') {
        router.push('/admin/login');
      }
      setLoading(false);
    };

    checkSession();
  }, [pathname, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/admin/login');
  };

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f1115', color: '#E3AE45' }}>Carregando...</div>;
  }

  // Se for a página de login, renderiza sem o layout do admin (sidebar/header)
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!user) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f1115', color: '#f4f4f5' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', background: '#1a1d24', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#E3AE45', fontSize: '1.25rem' }}>Painel Admin</h2>
          <span style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>Thiago Tenório Imóveis</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          <Link href="/admin" style={{ padding: '10px 15px', background: pathname === '/admin' ? 'rgba(227, 174, 69, 0.1)' : 'transparent', color: pathname === '/admin' ? '#E3AE45' : '#a1a1aa', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.3s' }}>
            Meus Imóveis
          </Link>
          <Link href="/admin/novo" style={{ padding: '10px 15px', background: pathname === '/admin/novo' ? 'rgba(227, 174, 69, 0.1)' : 'transparent', color: pathname === '/admin/novo' ? '#E3AE45' : '#a1a1aa', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.3s' }}>
            Adicionar Imóvel
          </Link>
          <Link href="/" target="_blank" style={{ padding: '10px 15px', color: '#a1a1aa', textDecoration: 'none' }}>
            Ver Site Público ↗
          </Link>
        </nav>

        <button 
          onClick={handleSignOut}
          style={{ padding: '10px', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '8px', cursor: 'pointer' }}
        >
          Sair
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
