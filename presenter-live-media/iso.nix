# env NIX_PATH=nixpkgs=https://github.com/NixOS/nixpkgs-channels/archive/nixos-unstable.tar.gz nix-build '<nixpkgs/nixos>' -A config.system.build.isoImage -I nixos-config=iso.nix --no-out-link --show-trace
{ config, lib, pkgs, ... }:

{

  imports = [
    <nixpkgs/nixos/modules/installer/cd-dvd/installation-cd-graphical-kde.nix>
  ];

  boot.kernelPackages = pkgs.linuxPackages_latest;

  environment.systemPackages = with pkgs; [
    okular
    vlc
    mpv
  ];

}
