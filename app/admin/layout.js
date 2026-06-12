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
    <div className="admin-wrapper">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Painel Admin</h2>
          <span>Thiago Tenório Imóveis</span>
        </div>

        <nav className="admin-nav">
          <Link 
            href="/admin" 
            className={`admin-nav-link ${pathname === '/admin' ? 'active' : ''}`}
          >
            Meus Imóveis
          </Link>
          <Link 
            href="/admin/novo" 
            className={`admin-nav-link ${pathname === '/admin/novo' ? 'active' : ''}`}
          >
            Adicionar Imóvel
          </Link>
          <Link 
            href="/" 
            target="_blank" 
            className="admin-nav-link"
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            Ver Site Público ↗
          </Link>
        </nav>

        <button 
          onClick={handleSignOut}
          className="admin-btn-logout"
        >
          Sair
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  );

}
