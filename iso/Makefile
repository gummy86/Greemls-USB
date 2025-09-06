IMAGE=greemls-iso-build
NAME=greemls
OUT=out

.PHONY: help build docker-build docker-shell clean

help:
	@echo "Targets:"
	@echo "  docker-build   Build Docker image for live-build"
	@echo "  build          Build ISO using Docker"
	@echo "  docker-shell   Interactive shell inside builder"
	@echo "  clean          Clean build artifacts"

docker-build:
	docker build -t $(IMAGE) .

build: docker-build
	mkdir -p $(OUT)
	docker run --rm -it \
	  -v $$PWD:/build \
	  -v $$PWD/$(OUT):/build/$(OUT) \
	  $(IMAGE) bash -lc 'lb clean && lb config && lb build && cp -v *greemls*.iso $(OUT) || cp -v live-image-amd64.hybrid.iso $(OUT)/$(NAME).iso'

docker-shell: docker-build
	docker run --rm -it -v $$PWD:/build $(IMAGE) bash

clean:
	rm -rf $(OUT)/*

