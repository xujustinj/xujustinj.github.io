{
  description = "xujustinj.github.io - reproducible dev environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            git
            nodejs_24
            pnpm_10
          ];

          shellHook = ''
            echo "xujustinj.github.io dev shell (Nix) activated for ${system}"
          '';
        };
      });
}
