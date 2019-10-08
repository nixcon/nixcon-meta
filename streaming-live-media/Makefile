NIX_PATH=nixpkgs=https://github.com/NixOS/nixpkgs-channels/archive/nixos-19.09.tar.gz

all: build
build:
	nix-build build.nix -A iso

clean:
	rm -f result
