let
  channel = fetchTarball channel:nixos-19.09;
  dir = toString ./.;
in
{
  pkgs ? import channel {}
}:

pkgs.mkShell {
  shellHook = ''
    PATH+=:"${dir}/node_modules/.bin"

    run-app() {
      ${pkgs.electron}/bin/electron --force-device-scale-factor=1 "${dir}" "$@"
    }

    serve() {
      webpack-dev-server "$@"
    }
  '';
  buildInputs = with pkgs; [
    yarn
    nodejs-10_x
  ];
}
