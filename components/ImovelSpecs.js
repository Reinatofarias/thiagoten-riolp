export default function ImovelSpecs({ imovel }) {
  const specs = [
    { label: 'Quartos', value: imovel.quartos, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7"/><path d="M21 7H3l2-4h14l2 4z"/><path d="M12 4v3"/></svg> },
    { label: 'Suítes', value: imovel.suites, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg> },
    { label: 'Banheiros', value: imovel.banheiros, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z"/><path d="M6 12V5a2 2 0 0 1 2-2h3v2.25"/><circle cx="12" cy="7" r="1"/></svg> },
    { label: 'Vagas', value: imovel.vagas, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="22" height="12" rx="2"/><path d="M6 12h4"/><path d="M14 12h4"/></svg> },
    { label: 'Área', value: imovel.area, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 3v18"/></svg> },
  ];

  return (
    <div className="imovel-specs">
      {specs.map((spec, i) => (
        spec.value ? (
          <div className="imovel-spec" key={i}>
            <div className="imovel-spec-icon">{spec.icon}</div>
            <div className="imovel-spec-info">
              <span className="imovel-spec-value">{spec.value}</span>
              <span className="imovel-spec-label">{spec.label}</span>
            </div>
          </div>
        ) : null
      ))}
    </div>
  );
}
