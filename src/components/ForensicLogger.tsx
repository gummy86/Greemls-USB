import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  AlertTriangle, 
  Shield, 
  Clock, 
  MapPin,
  Hash,
  Eye,
  Archive
} from 'lucide-react';

interface ForensicLog {
  id: string;
  timestamp: string;
  type: 'threat' | 'scan' | 'protection' | 'access' | 'modification';
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  description: string;
  details: {
    hash?: string;
    location?: string;
    process?: string;
    user?: string;
    action?: string;
  };
  evidence: string[];
}

interface ForensicLoggerProps {
  isVisible: boolean;
  onClose: () => void;
}

export const ForensicLogger: React.FC<ForensicLoggerProps> = ({ isVisible, onClose }) => {
  const [logs, setLogs] = useState<ForensicLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<ForensicLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  // Simulated forensic logs
  useEffect(() => {
    const sampleLogs: ForensicLog[] = [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        type: 'threat',
        severity: 'critical',
        source: 'USB Device (E:)',
        description: 'Rootkit signature detected in boot sector',
        details: {
          hash: 'SHA256: a1b2c3d4e5f6...',
          location: 'E:\\boot\\bootmgr',
          process: 'Unknown',
          action: 'Blocked and quarantined'
        },
        evidence: ['boot_sector_dump.bin', 'memory_snapshot.dmp', 'registry_changes.reg']
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        type: 'protection',
        severity: 'high',
        source: 'Greemls Protection Engine',
        description: 'Write protection activated - Unauthorized modification attempt',
        details: {
          location: 'E:\\System32\\drivers\\',
          process: 'malicious.exe',
          user: 'SYSTEM',
          action: 'Write blocked'
        },
        evidence: ['process_dump.exe', 'network_traffic.pcap']
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        type: 'scan',
        severity: 'medium',
        source: 'Deep Scanner',
        description: 'Suspicious file behavior detected',
        details: {
          hash: 'MD5: 5d41402abc4b2a76b9719d911017c592',
          location: 'E:\\temp\\suspicious.dll',
          process: 'explorer.exe',
          action: 'Flagged for review'
        },
        evidence: ['file_analysis.json', 'behavioral_log.txt']
      }
    ];
    setLogs(sampleLogs);
    setFilteredLogs(sampleLogs);
  }, []);

  // Filter logs based on search and filters
  useEffect(() => {
    let filtered = logs;

    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.source.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(log => log.type === filterType);
    }

    if (filterSeverity !== 'all') {
      filtered = filtered.filter(log => log.severity === filterSeverity);
    }

    setFilteredLogs(filtered);
  }, [logs, searchTerm, filterType, filterSeverity]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-900/20 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-900/20 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-900/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'threat': return <AlertTriangle className="w-4 h-4" />;
      case 'protection': return <Shield className="w-4 h-4" />;
      case 'scan': return <Search className="w-4 h-4" />;
      case 'access': return <Eye className="w-4 h-4" />;
      case 'modification': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const exportForensicReport = () => {
    const report = {
      generated: new Date().toISOString(),
      total_events: filteredLogs.length,
      critical_threats: filteredLogs.filter(l => l.severity === 'critical').length,
      high_severity: filteredLogs.filter(l => l.severity === 'high').length,
      logs: filteredLogs,
      system_info: {
        greemls_version: '1.0.0',
        scan_engine: 'Advanced Heuristic v2.1',
        protection_level: 'Paranoid'
      }
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `greemls_forensic_report_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900/95 to-black/95 border border-green-400/30 rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col"
           style={{ boxShadow: '0 20px 60px rgba(0, 255, 65, 0.2)' }}>
        
        {/* Header */}
        <div className="p-6 border-b border-green-400/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Archive className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-green-400">Registro Forense</h2>
              <span className="px-3 py-1 bg-green-400/20 border border-green-400/50 rounded-full text-green-400 text-sm">
                {filteredLogs.length} eventos
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={exportForensicReport}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-400 hover:to-cyan-400 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                Exportar Reporte
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300"
              >
                Cerrar
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar en logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400/50 focus:outline-none"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400/50 focus:outline-none"
            >
              <option value="all">Todos los tipos</option>
              <option value="threat">Amenazas</option>
              <option value="protection">Protección</option>
              <option value="scan">Escaneos</option>
              <option value="access">Accesos</option>
              <option value="modification">Modificaciones</option>
            </select>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400/50 focus:outline-none"
            >
              <option value="all">Todas las severidades</option>
              <option value="critical">Crítico</option>
              <option value="high">Alto</option>
              <option value="medium">Medio</option>
              <option value="low">Bajo</option>
            </select>
          </div>
        </div>

        {/* Logs List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className={`p-4 rounded-lg border ${getSeverityColor(log.severity)} transition-all duration-300 hover:scale-[1.02]`}
              style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getTypeIcon(log.type)}
                  <div>
                    <h3 className="font-semibold text-white">{log.description}</h3>
                    <p className="text-sm text-gray-400">{log.source}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                    <Clock className="w-3 h-3" />
                    {new Date(log.timestamp).toLocaleString()}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(log.severity)}`}>
                    {log.severity.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-700/50">
                <div className="space-y-2">
                  {log.details.hash && (
                    <div className="flex items-center gap-2 text-sm">
                      <Hash className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-400">Hash:</span>
                      <code className="text-green-400 font-mono text-xs">{log.details.hash}</code>
                    </div>
                  )}
                  {log.details.location && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-400">Ubicación:</span>
                      <code className="text-orange-400 font-mono text-xs">{log.details.location}</code>
                    </div>
                  )}
                  {log.details.process && (
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-400">Proceso:</span>
                      <code className="text-blue-400 font-mono text-xs">{log.details.process}</code>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  {log.details.action && (
                    <div className="text-sm">
                      <span className="text-gray-400">Acción:</span>
                      <span className="text-white ml-2">{log.details.action}</span>
                    </div>
                  )}
                  {log.evidence.length > 0 && (
                    <div className="text-sm">
                      <span className="text-gray-400">Evidencia:</span>
                      <div className="mt-1 space-y-1">
                        {log.evidence.map((evidence, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <FileText className="w-3 h-3 text-cyan-400" />
                            <code className="text-cyan-400 font-mono text-xs">{evidence}</code>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No se encontraron logs que coincidan con los filtros</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};