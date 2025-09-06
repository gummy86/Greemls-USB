import React, { useState } from 'react';

export const ISOHashVerifier: React.FC = () => {
  const [expectedHash, setExpectedHash] = useState('');
  const [computedHash, setComputedHash] = useState('');
  const [fileName, setFileName] = useState('');
  const [isComputing, setIsComputing] = useState(false);
  const [error, setError] = useState('');

  async function sha256Hex(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setFileName(file.name);
    setComputedHash('');
    setIsComputing(true);
    try {
      const hash = await sha256Hex(file);
      setComputedHash(hash);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'No se pudo calcular SHA256';
      setError(message);
    } finally {
      setIsComputing(false);
    }
  };

  const matches = expectedHash && computedHash && expectedHash.trim().toLowerCase() === computedHash.toLowerCase();

  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Pega SHA256 esperado (64 hex)"
        value={expectedHash}
        onChange={(e) => setExpectedHash(e.target.value)}
        className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400/50 focus:outline-none"
      />
      <label className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg cursor-pointer hover:border-green-400/50 transition-all">
        <span className="text-gray-300">Selecciona la ISO...</span>
        <input type="file" accept=".iso" className="hidden" onChange={onFileChange} />
      </label>
      {fileName && (
        <div className="text-xs text-gray-400">Archivo: {fileName}</div>
      )}
      {isComputing && <div className="text-sm text-gray-300">Calculando SHA256, esto puede tardar...</div>}
      {computedHash && (
        <div className="text-xs">
          <div className="text-gray-400">SHA256 calculado:</div>
          <code className="break-all text-green-400">{computedHash}</code>
        </div>
      )}
      {expectedHash && computedHash && (
        <div className={`text-sm ${matches ? 'text-green-400' : 'text-red-400'}`}>
          {matches ? 'Coincide ✅' : 'No coincide ❌'}
        </div>
      )}
      {error && <div className="text-sm text-red-400">{error}</div>}
    </div>
  );
};

