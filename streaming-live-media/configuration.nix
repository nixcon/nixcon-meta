# env NIX_PATH=nixpkgs=https://github.com/NixOS/nixpkgs-channels/archive/nixos-unstable.tar.gz nix-build '<nixpkgs/nixos>' -A config.system.build.isoImage -I nixos-config=iso.nix --no-out-link --show-trace
{ config, lib, pkgs, ... }:

{
  imports = [
    <nixpkgs/nixos/modules/installer/cd-dvd/installation-cd-graphical-kde.nix>
    ./overlay
  ];

  boot.kernelPackages = pkgs.linuxPackages_latest;

  environment.systemPackages = with pkgs; [
    okular
    vlc
    mpv
    obs-studio
    firefox
    chromium
    tmux
    nixcon-projector
  ];

  fonts.fonts = with pkgs; [
    go-font
  ];

  services.xserver.autorun = lib.mkOverride 10 true;

  system.activationScripts = let
      homeDir = "/home/nixos/";
      desktopDir = homeDir + "Desktop/";
      xdgConfig = homeDir + ".config/";
      obsPluginsDir = xdgConfig + "obs-studio/plugins";
      obsPlugins = [ pkgs.obs-linuxbrowser ];
      projectorDesktopItem = pkgs.makeDesktopItem {
        name = "nixcon-projector";
        exec = "${pkgs.nixcon-projector}/bin/nixcon-projector";
        icon = "emblem-videos-symbolic";
        desktopName = "Projector";
      };
    in {
    obsPlugins = ''
      mkdir -p ${obsPluginsDir}
      chown nixos ${homeDir}
      chown -R nixos ${xdgConfig}
      ${lib.concatMapStringsSep "\n" (plugin: ''
        ln -fs "${plugin}/share/obs/obs-plugins"/* ${obsPluginsDir}/
      '') obsPlugins}
    '';
    # Add a link to OBS to the desktop
    obsDesktop = ''
      mkdir -p ${desktopDir}
      chown nixos ${homeDir} ${desktopDir}

      ln -sfT ${pkgs.obs-studio}/share/applications/com.obsproject.Studio.desktop ${desktopDir + "obs.desktop"}
      ln -sfT ${projectorDesktopItem}/share/applications/nixcon-projector.desktop ${desktopDir + "nixcon-projector.desktop"}
    '';
  };

  systemd.user.services = {
    projector-webpack = {
      description = "NixCon projector webpack server";
      script = "${pkgs.nixcon-projector}/bin/nixcon-projector-webpack";
      wantedBy = [ "default.target" ];
    };
  };
}
