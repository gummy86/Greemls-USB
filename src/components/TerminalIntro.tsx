import React, { useState, useEffect, useRef } from 'react';
import { Terminal, SkipForward } from 'lucide-react';

interface TerminalIntroProps {
  onComplete: () => void;
}

export const TerminalIntro: React.FC<TerminalIntroProps> = ({ onComplete }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const terminalLines = [
    "GREEMLS v1.0.0 - The Human Immunity System",
    "Developed by César Sánchez - Antivirus Humano",
    "═══════════════════════════════════════════════════════════════",
    "",
    "INSTRUCCIONES DE USO (RESCUE):",
    "",
    "1) CONSTRUCCIÓN DE ISO:",
    "   • En otra PC: abre https://tuapp/ (esta PWA)",
    "   • Sigue: Create Bootable USB → 'Instrucciones para construir la ISO'",
    "   • En consola: cd iso && make build (requiere Docker)",
    "",
    "2) PREPARACIÓN USB:",
    "   • Usa Ventoy/Rufus y copia greemls.iso al USB",
    "   • Verifica SHA256 de la ISO antes de usar",
    "",
    "3) ARRANQUE Y ESCANEO:",
    "   • Arranca desde el USB y abre GREEMLS",
    "   • Ejecuta: greemls-scan (solo lectura, logging RAM)",
    "   • Exporta: greemls-export (reportes al USB)",
    "",
    "COMANDOS PRINCIPALES:",
    "   greemls-scan     → Escaneo forense completo (solo lectura)",
    "   greemls-clean    → Limpieza agresiva de rootkits/bootkits",
    "   greemls-status   → Estado del sistema y amenazas detectadas",
    "   greemls-export   → Exportar logs forenses a USB",
    "",
    "COMANDOS GREEMLS (DETALLADOS):",
    "   greemls-scan --quick            → Escaneo rápido de indicadores",
    "   greemls-scan --full             → Escaneo profundo con YARA",
    "   greemls-scan --yara /media/USB/YARA  → Usar reglas YARA del USB",
    "   greemls-clean --quarantine      → Mover hallazgos a cuarentena",
    "   greemls-export                  → Exporta reportes a /media/USB/greemls-reports",
    "   greemls-update-locked           → Actualiza firmas con red bloqueada (allowlist)",
    "   greemls-status                  → Resumen de motor/firmas/últimos eventos",
    "   greemls-help                    → Ayuda y ejemplos",
    "",
    "3. CONSEJOS DEL ANTIVIRUS HUMANO:",
    "   • 'No te alarmes' - Mantén la calma para pensar claro",
    "   • 'Revisa su comportamiento' - Estudia cómo actúa el malware",
    "   • 'Revisa tu teléfono celular' - El malware es multiplataforma",
    "   • 'Donde pones contraseña, nunca la pongas doble vez'",
    "",
    "MENSAJE FINAL:",
    "   Nunca juegues con la seguridad de tu sistema",
    "   porque afecta a ti y todo tu entorno y familia.",
    "   — César Sánchez \"Kashtaman\"",
    "",
    "Presiona ENTER para continuar o ESC para salir...",
    ""
  ].filter(line => line !== "");

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  useEffect(() => {
    // Auto focus to capture keyboard events immediately
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (currentLine < terminalLines.length) {
      const line = terminalLines[currentLine];
      
      if (currentChar < line.length) {
        const timer = setTimeout(() => {
          setCurrentChar(prev => prev + 1);
        }, 30);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setDisplayedText(prev => [...prev, line]);
          setCurrentLine(prev => prev + 1);
          setCurrentChar(0);
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [currentLine, currentChar, terminalLines]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      onComplete();
    }
  };

  const canSkip = true;

  return (
    <div 
      className="fixed inset-0 bg-black z-50 flex flex-col font-mono text-green-400 overflow-hidden"
      onKeyDown={handleKeyPress}
      tabIndex={0}
      style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace' }}
      ref={containerRef}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-green-400/30">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-green-400" />
          <span className="text-green-400 font-bold">GREEMLS Terminal</span>
        </div>
        {canSkip && (
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-3 py-1 bg-green-400/20 hover:bg-green-400/30 border border-green-400/50 rounded text-green-400 text-sm transition-all duration-300"
          >
            <SkipForward className="w-3 h-3" />
            Skip
          </button>
        )}
      </div>

      {/* Terminal Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl">
          {displayedText.map((line, index) => (
            <div key={index} className="mb-1">
              <span className="text-gray-500 mr-2">$</span>
              <span className={
                line.includes('GREEMLS') ? 'text-green-400 font-bold' :
                line.includes('César Sánchez') ? 'text-orange-400 font-bold' :
                line.includes('═') ? 'text-green-400' :
                line.includes('INSTRUCCIONES') || line.includes('COMANDOS') || line.includes('CONSEJOS') ? 'text-yellow-400 font-bold' :
                line.includes('greemls-') ? 'text-cyan-400 font-bold' :
                line.includes('•') ? 'text-white' :
                line.includes('PLAN ACTUAL') ? 'text-purple-400 font-bold' :
                line.includes('UPGRADE') || line.includes('FUNCIONES PREMIUM') ? 'text-orange-400 font-bold' :
                line.includes('Premium') || line.includes('$') ? 'text-yellow-400' :
                'text-gray-300'
              }>
                {line}
              </span>
            </div>
          ))}
          
          {/* Current typing line */}
          {currentLine < terminalLines.length && (
            <div className="mb-1">
              <span className="text-gray-500 mr-2">$</span>
              <span className={
                terminalLines[currentLine].includes('GREEMLS') ? 'text-green-400 font-bold' :
                terminalLines[currentLine].includes('César Sánchez') ? 'text-orange-400 font-bold' :
                terminalLines[currentLine].includes('═') ? 'text-green-400' :
                terminalLines[currentLine].includes('INSTRUCCIONES') || terminalLines[currentLine].includes('COMANDOS') || terminalLines[currentLine].includes('CONSEJOS') ? 'text-yellow-400 font-bold' :
                terminalLines[currentLine].includes('greemls-') ? 'text-cyan-400 font-bold' :
                terminalLines[currentLine].includes('•') ? 'text-white' :
                terminalLines[currentLine].includes('PLAN ACTUAL') ? 'text-purple-400 font-bold' :
                terminalLines[currentLine].includes('UPGRADE') || terminalLines[currentLine].includes('FUNCIONES PREMIUM') ? 'text-orange-400 font-bold' :
                terminalLines[currentLine].includes('Premium') || terminalLines[currentLine].includes('$') ? 'text-yellow-400' :
                'text-gray-300'
              }>
                {terminalLines[currentLine].substring(0, currentChar)}
                {showCursor && <span className="bg-green-400 text-black">█</span>}
              </span>
            </div>
          )}

          {/* Completion message */}
          {currentLine >= terminalLines.length && (
            <div className="mt-4 p-4 bg-green-400/10 border border-green-400/30 rounded">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-bold">Sistema listo para usar</span>
              </div>
              <p className="text-gray-300 text-sm mb-2">
                Presiona ENTER para acceder a la interfaz gráfica de GREEMLS
              </p>
              
            </div>
          )}
        </div>
      </div>

      {/* Terminal Footer */}
      <div className="p-2 bg-gray-900 border-t border-green-400/30 text-center">
        <span className="text-gray-500 text-xs">
          GREEMLS Terminal - Presiona ENTER para continuar | ESC para salir
        </span>
      </div>
    </div>
  );
};