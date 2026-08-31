import AppLayout from '../components/layout/AppLayout';

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-main)' }}>
          Dashboard
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
          Bem-vindo ao painel de controle.
        </p>
      </div>
    </AppLayout>
  );
}
