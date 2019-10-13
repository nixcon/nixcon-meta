let
  channel = fetchTarball channel:nixos-19.09;
in
{
  pkgs ? import channel {}
}:

pkgs.mkShell {
  shellHook = ''
    PATH+=:${toString ./.}/node_modules/.bin
  '';
  buildInputs = with pkgs; [
    yarn
    nodejs-10_x
    electron
  ];
}
