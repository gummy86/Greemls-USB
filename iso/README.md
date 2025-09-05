# GREEMLS Rescue ISO (Debian Bookworm)

Este directorio contiene el scaffolding para construir una ISO live con Debian y herramientas forenses/AV integradas.

## Requisitos
- Docker
- ~10-15 GB de espacio libre

## Construcción rápida (Docker)
```
cd iso
make build
# ISO resultante en iso/out/greemls.iso
```

## Componentes principales
- live-build (Debian) con `iso-hybrid` amd64
- Paquetes: clamav, freshclam, rkhunter, chkrootkit, yara, sleuthkit, testdisk, ddrescue, ntfs-3g, exfatprogs, lvm2, smartmontools, etc.
- Scripts:
  - `greemls-scan`: ejecuta chequeos y genera reporte JSON en `/var/log/greemls/`
  - `greemls-clean`: ejemplo de cuarentena
  - `greemls-export`: exporta reportes al USB montado en `/media/...`

## Reglas YARA personalizadas
- Reglas base se incluyen en `/opt/greemls/yara/` dentro de la ISO.
- Puedes añadir reglas propias copiándolas a un USB en `YARA/` y, al arrancar, montarlas en `/mnt/usb` y ejecutar:
  ```bash
  sudo mkdir -p /opt/greemls/yara-custom && sudo cp -v /mnt/usb/YARA/*.yar /opt/greemls/yara-custom/
  sudo yara -r /opt/greemls/yara-custom / -p 4 -f
  ```
  También puedes editar `greemls-scan` para que busque automáticamente en `/media/*/YARA`.

## Uso
1. Construye la ISO
2. Copia la ISO a un USB con Ventoy o Rufus
3. Arranca desde el USB y ejecuta `greemls-scan`
4. Exporta reportes con `greemls-export` y analízalos en la PWA

## Notas de seguridad
- Montajes en modo lectura (recomendado) para preservar evidencias
- Actualización de firmas de ClamAV si hay red (offline-first)
- Considerar firmar shim/grub para Secure Boot (no incluido)