# Personal Website - Version 3

This version of my website is based off [Waterpark's frontend](https://github.com/loolabs/waterpark/tree/main/client) which uses Next.js, TypeScript, and `styled-components`. It comes after I was annoyed by version 2 for relying on `react-scripts`, having a ton of insecure dependencies, and lacking TypeScript. Rather than migrating, I decided to burn it all down.

## Notes

### Dependencies

**Node.js:** Production builds run on [AWS Amplify Hosting](https://aws.amazon.com/amplify/hosting/). Amplify’s default Linux build image only wires up **Node 20 and 22** via `nvm` for app builds—not every upstream LTS—so choosing another major locally can diverge from what Amplify can run.

This repo pins **Node 22** in two places so dev and deploy match:

- **`amplify.yml`** — `nvm install 22` / `nvm use 22` before `pnpm install` and `next build`
- **`flake.nix`** — `nodejs_22` in the Nix dev shell

Before upgrading Node or Next.js, check Amplify’s current supported Node versions and [build / SSR troubleshooting docs](https://docs.aws.amazon.com/amplify/latest/userguide/troubleshooting-builds.html).

### Creating the Boilerplate

```sh
# load the Next.js example project
npx create-next-app@latest --example with-typescript-styled-components .
# update its packages to the latest
npx npm-check-updates --upgrade
# install the updated packages
npm install
```

### Link Dump

- [Modernising an existing Bootstrap website using Next.js and Tailwind CSS](https://dev.to/jameswallis/series/7970)
- [How to update each dependency in package.json to the latest version?](https://stackoverflow.com/a/22849716)
- [How to remove margin space around body...](https://stackoverflow.com/a/9547315)
- [Favicon for Next.js and TypeScript](https://dev.to/jcubic/favicon-for-next-js-and-typescript-9gk)
- [Linking to an element](https://stackoverflow.com/a/2835151)
- [Custom image for using AWS Amplify with Git LFS](https://hub.docker.com/r/slawekkolodziej/aws-amplify-lfs)
- [FontAwesome icons in Next.js](https://fontawesome.com/docs/web/use-with/react/use-with#next-js)
- [Open a Next.js Link in a new tab](https://stackoverflow.com/a/71029662)
- [List bullets with emoji](https://www.clairecodes.com/blog/2019-04-26-styling-list-bullets-with-emoji/)
- [Deploying AWS Amplify to a custom 3rd party domain](https://docs.aws.amazon.com/amplify/latest/userguide/to-add-a-custom-domain-managed-by-a-third-party-dns-provider.html)
- [Why CNAME can't be applied on justinxu.me (at least, on Hover)](https://www.freecodecamp.org/news/why-cant-a-domain-s-root-be-a-cname-8cbab38e5f5c/)
