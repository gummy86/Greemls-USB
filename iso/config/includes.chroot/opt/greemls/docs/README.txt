GREEMLS Rescue - Guía Rápida

Comandos clave:
  greemls-scan --quick         Escaneo rápido
  greemls-scan --full          Escaneo profundo con YARA
  greemls-clean --quarantine   Cuarentena de hallazgos
  greemls-export               Exporta reportes a USB
  greemls-update-locked        Actualiza firmas con firewall allowlist

Rutas útiles:
  Reportes JSON: /var/log/greemls/
  Reglas YARA base: /opt/greemls/yara
  Reglas YARA personalizadas (USB): /media/*/YARA

Seguridad:
  - Monta objetivos en read-only
  - Evita ejecutar binarios desconocidos
  - Usa update-locked para minimizar exposición

Atte: César Sánchez "Kashtaman"
