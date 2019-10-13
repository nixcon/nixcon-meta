self: super: {
  libcef = self.callPackage ./libcef {
    stdenv = self.gcc7Stdenv;
    inherit (self.gnome2) GConf;
  };
  obs-linuxbrowser = self.callPackage ./obs-studio/linuxbrowser.nix {};
}
