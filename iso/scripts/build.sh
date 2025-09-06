#!/usr/bin/env bash
set -euo pipefail

echo "[+] Cleaning..."
lb clean

echo "[+] Configuring live-build..."
./auto/config

echo "[+] Building ISO... this can take a while"
lb build

echo "[+] Done. Look for live-image-amd64.hybrid.iso"

