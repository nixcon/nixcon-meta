{ pkgs ? import <nixpkgs> {} }:
let
  configuration = { imports = [ ./configuration.nix ]; };
in {
  iso = (pkgs.nixos configuration).config.system.build.isoImage;

  # kinda broken, requires network during early boot to reach the binary cache. This feels wrong?!?
  vm = (pkgs.nixos {
    imports = [
      configuration
      (pkgs.path + "/nixos/modules/virtualisation/qemu-vm.nix")
    ];
  }).config.system.build.vm;
}
