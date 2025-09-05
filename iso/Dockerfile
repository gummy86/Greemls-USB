FROM debian:bookworm

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    live-build debootstrap xorriso syslinux \
    squashfs-tools ca-certificates curl wget gnupg git make \
    apt-transport-https \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /build

# Copy live-build config
COPY config /build/config
COPY auto /build/auto
COPY Makefile /build/Makefile
COPY scripts /build/scripts

# Default command prints help. Build is run via Makefile targets.
CMD ["make", "help"]

