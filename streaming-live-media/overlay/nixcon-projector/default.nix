let
  channel = fetchTarball channel:nixos-19.09;
  dir = toString ./.;
in
{
  pkgs ? import channel {}
}:

pkgs.yarn2nix-moretea.mkYarnPackage {
  name = "nixcon-projector";
  src = ./.;
  packageJSON = ./package.json;
  yarnLock = ./yarn.lock;
  # NOTE: this is optional and generated dynamically if omitted
  yarnNix = ./yarn.nix;

  postInstall = ''
    substituteInPlace $out/bin/nixcon-projector \
      --subst-var-by project $out/libexec/nixcon2019-gfx/deps/nixcon2019-gfx/ \
      --subst-var-by electron ${pkgs.electron}/bin/electron

  '';
}
