{ stdenv, fetchurl, cmake, alsaLib, atk, cairo, cups, dbus, expat, fontconfig
, GConf, gdk-pixbuf, glib, gtk2, libX11, libxcb, libXcomposite, libXcursor
, libXdamage, libXext, libXfixes, libXi, libXrandr, libXrender, libXScrnSaver
, libXtst, nspr, nss, pango, libpulseaudio, systemd
, at-spi2-core
, at-spi2-atk
}:

let
  libPath =
    stdenv.lib.makeLibraryPath [
      alsaLib atk at-spi2-core at-spi2-atk cairo cups dbus expat fontconfig GConf gdk-pixbuf glib gtk2
      libX11 libxcb libXcomposite libXcursor libXdamage libXext libXfixes libXi
      libXrandr libXrender libXScrnSaver libXtst nspr nss pango libpulseaudio
      systemd
    ];

  # Naïve implementation, this is just enough to abstract the needs for this package.
  urlEncode = builtins.replaceStrings ["+"] ["%2B"];
in
stdenv.mkDerivation rec {
  pname = "cef-binary";
  version = "77.1.4+gf3890be+chromium-77.0.3865.90";

  # Build information can be found here.
  # http://opensource.spotify.com/cefbuilds/index.html#linux64_builds
  src = fetchurl {
    url = "http://opensource.spotify.com/cefbuilds/cef_binary_${urlEncode version}_linux64.tar.bz2";
    name = "cef_binary_${version}_linux64.tar.bz2";
    sha256 = "1ynfvgmswy7f6qlpkafdqym7df278zv03wi55qs84n82sarsdmx9";
  };
  nativeBuildInputs = [ cmake ];
  makeFlags = "libcef_dll_wrapper";
  dontStrip = true;
  dontPatchELF = true;
  installPhase = ''
    mkdir -p $out/lib/ $out/share/cef/
    cp libcef_dll_wrapper/libcef_dll_wrapper.a $out/lib/
    cp ../Release/libcef.so $out/lib/
    patchelf --set-rpath "${libPath}" $out/lib/libcef.so
    cp ../Release/*.bin $out/share/cef/
    cp -r ../Resources/* $out/share/cef/
    cp -r ../include $out/
  '';

  meta = with stdenv.lib; {
    description = "Simple framework for embedding Chromium-based browsers in other applications";
    homepage = http://opensource.spotify.com/cefbuilds/index.html;
    maintainers = with maintainers; [ puffnfresh ];
    license = licenses.bsd3;
    platforms = with platforms; linux;
  };

  NIX_CFLAGS_COMPILE = [
	"-Wno-error=attributes"
	"-Wno-error=unused-result"
  ];
}
