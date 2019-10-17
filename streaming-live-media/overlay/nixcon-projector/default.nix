{ yarn2nix-moretea, electron, makeDesktopItem, ruby }:

yarn2nix-moretea.mkYarnPackage {
  name = "nixcon-projector";
  src = ./.;
  packageJSON = ./package.json;
  yarnLock = ./yarn.lock;
  yarnNix = ./yarn.nix;

  postInstall = ''
    substituteInPlace $out/bin/nixcon-projector \
      --subst-var-by project $out/libexec/nixcon2019-gfx/deps/nixcon2019-gfx/ \
      --subst-var-by electron ${electron}/bin/electron

    ln -s $out/libexec/nixcon2019-gfx/deps/nixcon2019-gfx/get_talks.rb $out/bin/nixcon-get-talks
    sed -i '1 i\#!${ruby}/bin/ruby' $out/bin/nixcon-get-talks
  '';
}
