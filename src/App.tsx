import React, { useState, useEffect } from 'react';
import { TerminalIntro } from './components/TerminalIntro';
import { ForensicLogger } from './components/ForensicLogger';
import { 
  Usb, 
  Shield, 
  CheckCircle, 
  Settings, 
  Download, 
  Upload,
  HardDrive,
  Lock,
  Unlock,
  AlertTriangle,
  Zap,
  FileCheck,
  Image,
  Trash2,
  RotateCcw,
  Wrench,
  Database,
  Eye,
  RefreshCw,
  Archive,
  Video
} from 'lucide-react';

interface USBDevice {
  id: string;
  name: string;
  capacity: string;
  status: 'connected' | 'encrypted' | 'bootable' | 'error';
  health: number;
  fileSystem: string;
  bootImage?: string;
}

function App() {
  const [showTerminalIntro, setShowTerminalIntro] = useState(true);
  const [showForensicLogger, setShowForensicLogger] = useState(false);
  const [activeTab, setActiveTab] = useState('devices');
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentOperation, setCurrentOperation] = useState('');
  const [userPlan] = useState<'free' | 'premium' | 'premium-plus'>('free');

  const [devices] = useState<USBDevice[]>([
    { id: '1', name: 'Kingston DataTraveler', capacity: '32 GB', status: 'connected', health: 98, fileSystem: 'FAT32' },
    { id: '2', name: 'SanDisk Ultra', capacity: '64 GB', status: 'encrypted', health: 95, fileSystem: 'NTFS' },
    { id: '3', name: 'USB 3.0 Device', capacity: '128 GB', status: 'bootable', health: 88, fileSystem: 'exFAT', bootImage: 'Windows 11' }
  ]);

  useEffect(() => {
    if (isProcessing) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsProcessing(false);
            setCurrentOperation('');
            return 0;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [isProcessing]);

  const handleProcess = (action: string) => {
    setIsProcessing(true);
    setProgress(0);
    setCurrentOperation(action);
  };

  const handleTerminalIntroComplete = () => {
    setShowTerminalIntro(false);
  };

  // Handle manifest shortcuts (query params)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    const open = params.get('open');
    if (tab) setActiveTab(tab);
    if (open === 'logs') setShowForensicLogger(true);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400';
      case 'encrypted': return 'text-orange-400';
      case 'bootable': return 'text-blue-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <Usb className="w-4 h-4" />;
      case 'encrypted': return <Lock className="w-4 h-4" />;
      case 'bootable': return <HardDrive className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      default: return <Usb className="w-4 h-4" />;
    }
  };

  return (
    <>
      {showTerminalIntro && <TerminalIntro onComplete={handleTerminalIntroComplete} userPlan={userPlan} />}
      <ForensicLogger isVisible={showForensicLogger} onClose={() => setShowForensicLogger(false)} />
      
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <div className="relative border-b border-green-400/20 bg-black/80 backdrop-blur-sm"
           style={{ 
             boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 255, 65, 0.15)',
             backdropFilter: 'blur(10px)'
           }}>
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-orange-400/10"></div>
        <div className="relative px-8 py-8">
          <h1 className="text-6xl font-bold text-center bg-gradient-to-r from-green-400 via-green-300 to-orange-400 bg-clip-text text-transparent tracking-wider mb-2" 
              style={{ 
                fontFamily: 'serif', 
                textShadow: '0 0 30px #00ff41',
                filter: 'drop-shadow(0 4px 8px rgba(255, 255, 255, 0.2))'
              }}>
            ⚡ GREEMLS ⚡
          </h1>
          <p className="text-center text-green-300 text-lg tracking-wide font-semibold mb-1"
             style={{ filter: 'drop-shadow(0 2px 4px rgba(255, 255, 255, 0.1))' }}>
            The Human Immunity
          </p>
          <p className="text-center text-orange-400 text-sm tracking-wide"
             style={{ filter: 'drop-shadow(0 2px 4px rgba(255, 255, 255, 0.1))' }}>
            By César Sánchez - Antivirus Humano
          </p>
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => setShowForensicLogger(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 rounded-lg text-cyan-400 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300 transform hover:scale-105"
              style={{ 
                boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1), 0 8px 25px rgba(6, 182, 212, 0.2)',
                backdropFilter: 'blur(5px)'
              }}
            >
              <Archive className="w-4 h-4" />
              Registro Forense
            </button>
            <button
              onClick={() => setShowTerminalIntro(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500/20 to-orange-500/20 border border-green-400/50 rounded-lg text-green-400 hover:from-green-500/30 hover:to-orange-500/30 transition-all duration-300 transform hover:scale-105"
              style={{ 
                boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1), 0 8px 25px rgba(0, 255, 65, 0.2)',
                backdropFilter: 'blur(5px)'
              }}
            >
              <Eye className="w-4 h-4" />
              Ver Terminal
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Sidebar */}
        <div className="w-80 bg-black/40 border-r border-green-400/20 p-6 space-y-4">
          <div className="space-y-3">
            {[
              { id: 'devices', icon: Usb, label: 'USB Devices' },
              { id: 'bootable', icon: HardDrive, label: 'Create Bootable' },
              { id: 'cover', icon: Image, label: 'Boot Cover' },
              { id: 'tools', icon: Wrench, label: 'USB Tools' },
              { id: 'encrypt', icon: Shield, label: 'Encryption' },
              { id: 'integrity', icon: FileCheck, label: 'Integrity Check' },
              { id: 'about', icon: Eye, label: 'About Greemls' },
              { id: 'settings', icon: Settings, label: 'Settings' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-green-400/20 to-orange-400/20 border border-green-400/50'
                    : 'bg-gray-800/40 hover:bg-gray-700/40 border border-gray-700/50'
                }`}
                style={{ 
                  boxShadow: activeTab === item.id ? 
                    '0 4px 15px rgba(255, 255, 255, 0.1), 0 8px 25px rgba(0, 255, 65, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)' : 
                    '0 4px 15px rgba(255, 255, 255, 0.05), 0 8px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(5px)'
                }}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-green-400' : 'text-gray-400'}`} />
                <span className={`font-medium ${activeTab === item.id ? 'text-white' : 'text-gray-300'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Device List */}
          <div className="mt-8">
            <h3 className="text-green-400 font-semibold mb-4 text-sm uppercase tracking-wide">Connected Devices</h3>
            <div className="space-y-3">
              {devices.map(device => (
                <div
                  key={device.id}
                  onClick={() => setSelectedDevice(device.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-300 border ${
                    selectedDevice === device.id
                      ? 'bg-green-400/10 border-green-400/50 shadow-lg shadow-green-400/20'
                      : 'bg-gray-800/20 border-gray-700/30 hover:border-gray-600/50'
                  }`}
                  style={{
                    boxShadow: selectedDevice === device.id ?
                      '0 0 15px rgba(0, 255, 65, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)' :
                      '0 2px 10px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{device.name}</span>
                    <div className={`flex items-center gap-1 ${getStatusColor(device.status)}`}>
                      {getStatusIcon(device.status)}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{device.capacity}</span>
                    <span>Health: {device.health}%</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{device.fileSystem}</span>
                    {device.bootImage && <span>{device.bootImage}</span>}
                  </div>
                  <div className="mt-2 bg-gray-700/50 rounded-full h-1">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-orange-400 h-1 rounded-full transition-all duration-500"
                      style={{ width: `${device.health}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'devices' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6 border border-green-400/20"
                   style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}>
                <h2 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-2">
                  <Zap className="w-6 h-6" />
                  Device Management
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-black/30 p-4 rounded-lg border border-gray-700/50">
                    <h3 className="text-orange-400 font-semibold mb-2">Total Devices</h3>
                    <p className="text-3xl font-bold text-white">{devices.length}</p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg border border-gray-700/50">
                    <h3 className="text-green-400 font-semibold mb-2">Healthy</h3>
                    <p className="text-3xl font-bold text-white">{devices.filter(d => d.health > 90).length}</p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg border border-gray-700/50">
                    <h3 className="text-blue-400 font-semibold mb-2">Encrypted</h3>
                    <p className="text-3xl font-bold text-white">{devices.filter(d => d.status === 'encrypted').length}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bootable' && (
            <div className="space-y-6">
              {/* GREEMLS Rescue ISO & Ventoy Guide */}
              <div className="bg-gradient-to-br from-black/40 to-gray-900/40 rounded-2xl p-6 border border-green-400/20"
                   style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}>
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  GREEMLS Rescue ISO
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-3">
                    <p className="text-gray-300 text-sm">
                      Descarga la imagen de rescate para escanear y limpiar rootkits/bootkits fuera del sistema.
                      Usa Ventoy o Rufus para preparar el USB de arranque.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a href="/greemls-rescue.iso" download
                         className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-black font-semibold rounded-lg hover:from-green-400 hover:to-emerald-400 transition-all">
                        Descargar ISO
                      </a>
                      <button
                        onClick={() => navigator.clipboard.writeText('SHA256: PENDIENTE')}
                        className="px-4 py-2 bg-gray-800/60 border border-gray-600/50 rounded-lg text-gray-200 hover:border-green-400/50 transition-all">
                        Copiar SHA256
                      </button>
                      <button
                        onClick={() => navigator.clipboard.writeText('gpg --verify greemls-rescue.iso.sig greemls-rescue.iso')}
                        className="px-4 py-2 bg-gray-800/60 border border-gray-600/50 rounded-lg text-gray-200 hover:border-green-400/50 transition-all">
                        Verificación GPG
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <h4 className="text-orange-400 font-semibold">Guía rápida Ventoy</h4>
                    <ol className="list-decimal list-inside text-gray-300 space-y-1">
                      <li>Instala Ventoy en tu USB</li>
                      <li>Copia <code className="text-green-400">greemls-rescue.iso</code> al USB</li>
                      <li>Arranca y elige GREEMLS</li>
                    </ol>
                    <p className="text-xs text-gray-500 mt-2">Alternativa: Rufus (UEFI/Secure Boot).</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6 border border-green-400/20"
                   style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}>
                <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-2">
                  <HardDrive className="w-6 h-6" />
                  Create Bootable USB
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Select ISO File</label>
                      <div className="relative">
                        <input type="file" className="hidden" id="iso-file" />
                        <label 
                          htmlFor="iso-file"
                          className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg cursor-pointer hover:border-green-400/50 transition-all duration-300"
                          style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                        >
                          <Upload className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300">Choose ISO file...</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Boot Mode</label>
                      <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400/50 focus:outline-none"
                              style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}>
                        <option>UEFI + Legacy</option>
                        <option>UEFI Only</option>
                        <option>Legacy Only</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Partition Scheme</label>
                      <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400/50 focus:outline-none"
                              style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}>
                        <option>GPT (Recommended)</option>
                        <option>MBR</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="verify" className="w-4 h-4 text-green-400 bg-gray-800 border-gray-600 rounded focus:ring-green-400" />
                      <label htmlFor="verify" className="text-sm text-gray-300">Verify after creation</label>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button 
                    onClick={() => handleProcess('bootable')}
                    disabled={isProcessing}
                    className="px-8 py-3 bg-gradient-to-r from-green-400 to-orange-400 text-black font-bold rounded-lg hover:from-green-300 hover:to-orange-300 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    style={{ 
                      boxShadow: '0 8px 25px rgba(0, 255, 65, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2)',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {isProcessing ? 'Creating...' : 'Create Bootable USB'}
                  </button>
                  <a
                    href="/iso/README.md"
                    className="ml-4 inline-flex items-center text-sm text-gray-300 underline hover:text-green-400"
                    target="_blank" rel="noreferrer"
                  >
                    Instrucciones para construir la ISO GREEMLS
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cover' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6 border border-green-400/20"
                   style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}>
                <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-2">
                  <Image className="w-6 h-6" />
                  Boot Cover Customization
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-orange-400 font-semibold text-lg">Cover Image</h3>
                    <div className="bg-black/30 p-4 rounded-lg border border-gray-700/50 min-h-48 flex items-center justify-center">
                      <div className="text-center">
                        <Image className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-400">Current Boot Cover</p>
                        <p className="text-sm text-gray-500">1920x1080 recommended</p>
                      </div>
                    </div>
                    <div className="relative">
                      <input type="file" className="hidden" id="cover-file" accept="image/*" />
                      <label 
                        htmlFor="cover-file"
                        className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg cursor-pointer hover:border-green-400/50 transition-all duration-300 w-full justify-center"
                        style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                      >
                        <Upload className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">Upload Cover Image</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-blue-400 font-semibold text-lg">Cover Settings</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Boot Title</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400/50 focus:outline-none"
                        style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                        placeholder="Enter boot menu title..."
                        defaultValue="GREEMLS Boot Menu"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Theme Color</label>
                      <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400/50 focus:outline-none"
                              style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}>
                        <option>Green Neon</option>
                        <option>Orange Neon</option>
                        <option>Blue Cyber</option>
                        <option>Purple Matrix</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 text-green-400 bg-gray-800 border-gray-600 rounded focus:ring-green-400" defaultChecked />
                        <span className="text-gray-300">Show device info</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 text-green-400 bg-gray-800 border-gray-600 rounded focus:ring-green-400" />
                        <span className="text-gray-300">Animated background</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 text-green-400 bg-gray-800 border-gray-600 rounded focus:ring-green-400" defaultChecked />
                        <span className="text-gray-300">Show boot timer</span>
                      </label>
                    </div>
                    <button 
                      onClick={() => handleProcess('cover')}
                      className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-400 hover:to-pink-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                      style={{ 
                        boxShadow: '0 8px 25px rgba(168, 85, 247, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2)',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      <Image className="w-4 h-4" />
                      Apply Cover Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6 border border-green-400/20"
                   style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}>
                <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-2">
                  <Wrench className="w-6 h-6" />
                  USB Management Tools
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-black/30 p-6 rounded-lg border border-gray-700/50">
                      <h3 className="text-orange-400 font-semibold text-lg mb-4 flex items-center gap-2">
                        <Database className="w-5 h-5" />
                        Format Options
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">File System</label>
                          <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400/50 focus:outline-none"
                                  style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}>
                            <option>FAT32 (Compatible)</option>
                            <option>NTFS (Windows)</option>
                            <option>exFAT (Large files)</option>
                            <option>ext4 (Linux)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Volume Label</label>
                          <input 
                            type="text" 
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400/50 focus:outline-none"
                            style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                            placeholder="USB Drive"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4 text-green-400 bg-gray-800 border-gray-600 rounded focus:ring-green-400" />
                            <span className="text-gray-300">Quick format</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4 text-green-400 bg-gray-800 border-gray-600 rounded focus:ring-green-400" />
                            <span className="text-gray-300">Bad sector check</span>
                          </label>
                        </div>
                        <button 
                          onClick={() => handleProcess('format')}
                          className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-lg hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                          style={{ 
                            boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2)',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          <Database className="w-4 h-4" />
                          Format USB
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-black/30 p-6 rounded-lg border border-gray-700/50">
                      <h3 className="text-red-400 font-semibold text-lg mb-4 flex items-center gap-2">
                        <Trash2 className="w-5 h-5" />
                        Secure Erase
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Erase Method</label>
                          <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400/50 focus:outline-none"
                                  style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}>
                            <option>Single Pass (Fast)</option>
                            <option>3-Pass DoD 5220.22-M</option>
                            <option>7-Pass Secure</option>
                            <option>35-Pass Gutmann</option>
                          </select>
                        </div>
                        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                            <span className="text-red-400 font-semibold text-sm">Warning</span>
                          </div>
                          <p className="text-red-300 text-xs">This will permanently delete all data on the USB device. This action cannot be undone.</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" id="confirm-erase" className="w-4 h-4 text-red-400 bg-gray-800 border-gray-600 rounded focus:ring-red-400" />
                          <label htmlFor="confirm-erase" className="text-sm text-gray-300">I understand this will erase all data</label>
                        </div>
                        <button 
                          onClick={() => handleProcess('erase')}
                          className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-lg hover:from-red-500 hover:to-red-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                          style={{ 
                            boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2)',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                          Secure Erase
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'encrypt' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6 border border-green-400/20"
                   style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}>
                <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  USB Encryption
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-orange-400 font-semibold text-lg">Encrypt Device</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Encryption Algorithm</label>
                      <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400/50 focus:outline-none"
                              style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}>
                        <option>AES-256-XTS (Recommended)</option>
                        <option>AES-256-CBC</option>
                        <option>AES-128-XTS</option>
                        <option>ChaCha20-Poly1305</option>
                        <option>Serpent-256</option>
                        <option>Twofish-256</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Key Derivation</label>
                      <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400/50 focus:outline-none"
                              style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}>
                        <option>PBKDF2 (Standard)</option>
                        <option>Argon2id (Secure)</option>
                        <option>scrypt (Memory-hard)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                      <input 
                        type="password" 
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400/50 focus:outline-none"
                        style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                        placeholder="Enter strong password..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                      <input 
                        type="password" 
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400/50 focus:outline-none"
                        style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                        placeholder="Confirm password..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 text-green-400 bg-gray-800 border-gray-600 rounded focus:ring-green-400" />
                        <span className="text-gray-300">Create recovery key</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 text-green-400 bg-gray-800 border-gray-600 rounded focus:ring-green-400" defaultChecked />
                        <span className="text-gray-300">Secure wipe free space</span>
                      </label>
                    </div>
                    <button 
                      onClick={() => handleProcess('encrypt')}
                      className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg hover:from-orange-400 hover:to-red-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                      style={{ 
                        boxShadow: '0 8px 25px rgba(255, 102, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2)',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      <Lock className="w-4 h-4" />
                      Encrypt USB
                    </button>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-blue-400 font-semibold text-lg">Decrypt Device</h3>
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 font-semibold text-sm">Device Status</span>
                      </div>
                      <p className="text-blue-300 text-xs">Encrypted device detected. Enter password to unlock.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                      <input 
                        type="password" 
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400/50 focus:outline-none"
                        style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                        placeholder="Enter decryption password..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Recovery Key (Optional)</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:border-green-400/50 focus:outline-none"
                        style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}
                        placeholder="Enter recovery key if password is forgotten..."
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="mount-readonly" className="w-4 h-4 text-blue-400 bg-gray-800 border-gray-600 rounded focus:ring-blue-400" />
                      <label htmlFor="mount-readonly" className="text-sm text-gray-300">Mount as read-only</label>
                    </div>
                    <button 
                      onClick={() => handleProcess('decrypt')}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:from-blue-400 hover:to-cyan-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                      style={{ 
                        boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2)',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      <Unlock className="w-4 h-4" />
                      Decrypt USB
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrity' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl p-6 border border-green-400/20"
                   style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)' }}>
                <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-2">
                  <FileCheck className="w-6 h-6" />
                  Integrity Check & Repair
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-black/30 p-4 rounded-lg border border-gray-700/50">
                    <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Health Status
                    </h3>
                    <p className="text-2xl font-bold text-white">98%</p>
                    <p className="text-xs text-gray-400">Overall device health</p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg border border-gray-700/50">
                    <h3 className="text-orange-400 font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Bad Sectors
                    </h3>
                    <p className="text-2xl font-bold text-white">0</p>
                    <p className="text-xs text-gray-400">Detected bad sectors</p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg border border-gray-700/50">
                    <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                      <RefreshCw className="w-4 h-4" />
                      Last Check
                    </h3>
                    <p className="text-sm font-bold text-white">Never</p>
                    <p className="text-xs text-gray-400">Last integrity check</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-orange-400 font-semibold text-lg">Diagnostic Options</h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="w-4 h-4 text-green-400 bg-gray-800 border-gray-600 rounded focus:ring-green-400" defaultChecked />
                          <span className="text-gray-300">Bad sectors scan</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="w-4 h-4 text-green-400 bg-gray-800 border-gray-600 rounded focus:ring-green-400" defaultChecked />
                          <span className="text-gray-300">File system check</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="w-4 h-4 text-green-400 bg-gray-800 border-gray-600 rounded focus:ring-green-400" defaultChecked />
                          <span className="text-gray-300">Surface scan (slow)</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="w-4 h-4 text-green-400 bg-gray-800 border-gray-600 rounded focus:ring-green-400" />
                          <span className="text-gray-300">SMART data analysis</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="w-4 h-4 text-green-400 bg-gray-800 border-gray-600 rounded focus:ring-green-400" />
                          <span className="text-gray-300">Checksum verification</span>
                        </label>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-blue-400 font-semibold text-lg">Repair & Recovery</h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="w-4 h-4 text-green-400 bg-gray-800 border-gray-600 rounded focus:ring-green-400" defaultChecked />
                          <span className="text-gray-300">Auto-fix errors</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="w-4 h-4 text-green-400 bg-gray-800 border-gray-600 rounded focus:ring-green-400" defaultChecked />
                          <span className="text-gray-300">Backup before repair</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="w-4 h-4 text-green-400 bg-gray-800 border-gray-600 rounded focus:ring-green-400" defaultChecked />
                          <span className="text-gray-300">Generate report</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="w-4 h-4 text-green-400 bg-gray-800 border-gray-600 rounded focus:ring-green-400" />
                          <span className="text-gray-300">Recover deleted files</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="w-4 h-4 text-green-400 bg-gray-800 border-gray-600 rounded focus:ring-green-400" />
                          <span className="text-gray-300">Defragment after repair</span>
                        </label>
                      </div>
                    </div>
                  </div>
                <div className="flex gap-4 mt-6">
                  <button 
                    onClick={() => handleProcess('integrity')}
                    disabled={isProcessing}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-black font-bold rounded-lg hover:from-green-300 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
                    style={{ 
                      boxShadow: '0 8px 25px rgba(0, 255, 65, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2)',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    <FileCheck className="w-4 h-4" />
                    {isProcessing ? 'Checking...' : 'Start Full Check'}
                  </button>
                  <button 
                    onClick={() => handleProcess('quick-check')}
                    disabled={isProcessing}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
                    style={{ 
                      boxShadow: '0 8px 25px rgba(6, 182, 212, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2)',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    <Zap className="w-4 h-4" />
                    Quick Check
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Progress Bar (shown when processing) */}
          {isProcessing && (
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-96 bg-black/80 backdrop-blur-sm border border-green-400/50 rounded-lg p-4"
                 style={{ boxShadow: '0 8px 32px rgba(0, 255, 65, 0.2)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-400 font-medium">
                  {currentOperation === 'format' && 'Formatting USB...'}
                  {currentOperation === 'erase' && 'Secure Erasing...'}
                  {currentOperation === 'encrypt' && 'Encrypting Device...'}
                  {currentOperation === 'decrypt' && 'Decrypting Device...'}
                  {currentOperation === 'integrity' && 'Checking Integrity...'}
                  {currentOperation === 'quick-check' && 'Quick Check...'}
                  {currentOperation === 'cover' && 'Applying Cover...'}
                  {currentOperation === 'bootable' && 'Creating Bootable...'}
                  {!currentOperation && 'Processing...'}
                </span>
                <span className="text-white font-bold">{progress}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-orange-400 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${progress}%`,
                    boxShadow: '0 0 10px rgba(0, 255, 65, 0.5)'
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default App;