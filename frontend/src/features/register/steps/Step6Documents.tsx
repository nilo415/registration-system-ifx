import { useRef, useState } from 'react';

interface DocumentFile {
  name: string;
  size: number;
  file: File;
}

interface DocumentCard {
  id: string;
  title: string;
  description: string;
  optional?: boolean;
  icon: React.ReactNode;
}

function FilesIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function ContractIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M9 15l2 2 4-4" />
    </svg>
  );
}

function CreditIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function TaxIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

const DOCUMENTS: DocumentCard[] = [
  {
    id: 'ficha-cadastral',
    title: 'Ficha Cadastral Assinada',
    description: 'Documento original com assinatura reconhecida.',
    icon: <FilesIcon />,
  },
  {
    id: 'carta-ipi',
    title: 'Carta de Suspensão de IPI',
    description: 'Necessário apenas para indústrias beneficiadas.',
    optional: true,
    icon: <TaxIcon />,
  },
  {
    id: 'contrato-social',
    title: 'Cópia do Contrato Social',
    description: 'Última alteração contratual consolidada registrada.',
    icon: <ContractIcon />,
  },
  {
    id: 'ficha-credito',
    title: 'Ficha de Análise de Crédito',
    description: 'Formulário padrão da instituição financeira devidamente preenchido.',
    icon: <CreditIcon />,
  },
];

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function UploadCard({ doc, file, onFileSelect, onRemove }: {
  doc: DocumentCard;
  file?: DocumentFile;
  onFileSelect: (id: string, file: File) => void;
  onRemove: (id: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) onFileSelect(doc.id, dropped);
  };

  return (
    <div
      style={{
        background: 'var(--bg-page)',
        border: `1.5px solid ${dragging ? 'var(--primary)' : 'var(--border-color)'}`,
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        transition: 'border-color 0.2s',
      }}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      {/* Card Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{
          width: 40, height: 40, borderRadius: '10px', flexShrink: 0,
          background: file ? 'rgba(34,197,94,0.12)' : 'var(--border-color)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: file ? '#22c55e' : 'var(--text-muted)',
          transition: 'all 0.2s',
        }}>
          {file ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : doc.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '13px' }}>
              {doc.title}
            </span>
            {doc.optional && (
              <span style={{
                background: 'rgba(99,102,241,0.15)',
                color: '#818cf8',
                fontSize: '10px',
                fontWeight: 700,
                padding: '2px 7px',
                borderRadius: '20px',
                letterSpacing: '0.04em',
              }}>
                OPCIONAL
              </span>
            )}
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: '3px 0 0 0', lineHeight: 1.5 }}>
            {doc.description}
          </p>
        </div>
      </div>

      {/* File Preview or Upload Area */}
      {file ? (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: 'rgba(34,197,94,0.06)',
          border: '1px solid rgba(34,197,94,0.2)',
          borderRadius: '8px', padding: '10px 14px',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span style={{ color: 'var(--text-main)', fontSize: '12px', fontWeight: 600, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {file.name}
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '11px', flexShrink: 0 }}>
            {formatSize(file.size)}
          </span>
          <button
            onClick={() => onRemove(doc.id)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px', flexShrink: 0 }}
            title="Remover arquivo"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'transparent',
            border: '1px dashed var(--border-color)',
            borderRadius: '8px',
            padding: '9px 14px',
            cursor: 'pointer',
            color: 'var(--primary)',
            fontSize: '12px',
            fontWeight: 600,
            transition: 'all 0.15s',
            width: '100%',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = 'var(--primary)';
            e.currentTarget.style.background = 'rgba(99,102,241,0.05)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Procurar arquivo
          <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: '2px' }}>
            ou arraste aqui
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        style={{ display: 'none' }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFileSelect(doc.id, f);
          e.target.value = '';
        }}
      />
    </div>
  );
}

export default function Step6Documents() {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, DocumentFile>>({});

  const handleFileSelect = (id: string, file: File) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [id]: { name: file.name, size: file.size, file },
    }));
  };

  const handleRemove = (id: string) => {
    setUploadedFiles((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const required = DOCUMENTS.filter((d) => !d.optional);
  const uploadedRequired = required.filter((d) => uploadedFiles[d.id]);
  const totalUploaded = Object.keys(uploadedFiles).length;

  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      {/* ── Left: Document Grid ── */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {DOCUMENTS.map((doc) => (
            <UploadCard
              key={doc.id}
              doc={doc}
              file={uploadedFiles[doc.id]}
              onFileSelect={handleFileSelect}
              onRemove={handleRemove}
            />
          ))}
        </div>
      </div>

      {/* ── Right: Info Card ── */}
      <div style={{ width: '200px', flexShrink: 0 }}>
        <div style={{
          borderRadius: '16px',
          padding: '20px',
          background: 'linear-gradient(160deg, var(--primary) 0%, var(--secondary) 100%)',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>

          <div>
            <h4 style={{ fontWeight: 700, fontSize: '14px', margin: '0 0 6px 0' }}>Documentos</h4>
            <p style={{ fontSize: '11px', opacity: 0.85, lineHeight: 1.5, margin: 0 }}>
              Aceite arquivos PDF, JPG ou PNG. Tamanho máximo de 10MB por arquivo.
            </p>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.15)', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Obrigatórios */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontSize: '11px', opacity: 0.85 }}>Obrigatórios</span>
                <span style={{ fontSize: '11px', fontWeight: 700 }}>
                  {uploadedRequired.length}/{required.length}
                </span>
              </div>
              <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.2)' }}>
                <div style={{
                  height: '100%', borderRadius: '2px', background: '#fff',
                  width: `${required.length > 0 ? (uploadedRequired.length / required.length) * 100 : 0}%`,
                  transition: 'width 0.3s ease',
                }} />
              </div>
            </div>

            {/* Total */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontSize: '11px', opacity: 0.85 }}>Total enviados</span>
                <span style={{ fontSize: '11px', fontWeight: 700 }}>
                  {totalUploaded}/{DOCUMENTS.length}
                </span>
              </div>
              <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.2)' }}>
                <div style={{
                  height: '100%', borderRadius: '2px', background: '#fff',
                  width: `${(totalUploaded / DOCUMENTS.length) * 100}%`,
                  transition: 'width 0.3s ease',
                }} />
              </div>
            </div>
          </div>

          {uploadedRequired.length === required.length && (
            <div style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)', borderRadius: '8px', padding: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ fontSize: '11px', color: '#4ade80', fontWeight: 600 }}>
                Docs obrigatórios enviados!
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
