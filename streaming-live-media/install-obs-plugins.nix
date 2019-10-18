let
  nixpkgs_path = builtins.fetchTarball {
    url = "https://github.com/NixOS/nixpkgs-channels/archive/nixos-19.09.tar.gz";
  };

  pkgs = import nixpkgs_path {
    overlays = [(import ./overlay/overlay.nix)];
  };

  system_eval = import (nixpkgs_path + "/nixos/lib/eval-config.nix") {
    modules = [
      ./configuration.nix
    ];
  };

  inherit (pkgs.lib.lists) last foldl';
  inherit (pkgs.lib.trivial) mergeAttrs;

  mergeAttrsetsFromList = foldl' (a: b: mergeAttrs a b) {};
  activationScriptDefs = mergeAttrsetsFromList system_eval.options.system.activationScripts.definitions;
  genericizeScript = builtins.replaceStrings ["/home/nixos" "chown"] ["$HOME" "#chown DISABLED"];
  script = genericizeScript activationScriptDefs.obsPlugins;
in
  pkgs.writeShellScript "install-obs-plugins" (''
    set -e
    set -u
    PS4=" $ "
    set -x
  '' + script)
