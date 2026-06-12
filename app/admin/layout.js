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
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0c10', color: '#e3af45', fontFamily: 'Cinzel, serif', letterSpacing: '1px' }}>Carregando...</div>;
  }

  // Se for a página de login, renderiza sem o layout do admin (sidebar/header)
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!user) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0c10', color: '#f4f4f5' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', background: '#12151b', borderRight: '1px solid rgba(227, 174, 69, 0.12)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#e3af45', fontSize: '1.4rem', fontWeight: '700' }}>Painel Admin</h2>
          <span style={{ fontSize: '0.75rem', color: '#a1a1aa', fontFamily: 'Cinzel, serif', letterSpacing: '1px' }}>Thiago Tenório Imóveis</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          <Link href="/admin" style={{ padding: '12px 18px', background: pathname === '/admin' ? 'rgba(227, 174, 69, 0.08)' : 'transparent', color: pathname === '/admin' ? '#e3af45' : '#a1a1aa', border: pathname === '/admin' ? '1px solid rgba(227, 174, 69, 0.2)' : '1px solid transparent', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.3s ease', fontWeight: '500' }}>
            Meus Imóveis
          </Link>
          <Link href="/admin/novo" style={{ padding: '12px 18px', background: pathname === '/admin/novo' ? 'rgba(227, 174, 69, 0.08)' : 'transparent', color: pathname === '/admin/novo' ? '#e3af45' : '#a1a1aa', border: pathname === '/admin/novo' ? '1px solid rgba(227, 174, 69, 0.2)' : '1px solid transparent', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.3s ease', fontWeight: '500' }}>
            Adicionar Imóvel
          </Link>
          <Link href="/" target="_blank" style={{ padding: '12px 18px', color: '#a1a1aa', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#e3af45'} onMouseLeave={(e) => e.target.style.color = '#a1a1aa'}>
            Ver Site Público ↗
          </Link>
        </nav>

        <button 
          onClick={handleSignOut}
          style={{ padding: '12px', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Cinzel, serif', letterSpacing: '1.5px', fontSize: '0.8rem', fontWeight: '600', transition: 'all 0.3s' }}
          onMouseEnter={(e) => { e.target.style.background = '#ef4444'; e.target.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#ef4444'; }}
        >
          Sair
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto', background: '#0a0c10' }}>
        {children}
      </main>
    </div>
  );

}
