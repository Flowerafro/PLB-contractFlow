# RedwoodSDK Minimal Starter

This is the starter project for RedwoodSDK. It's a template designed to get you up and running as quickly as possible.

Create your new project:

# RedwoodSDK Minimal Starter

This is the starter project for RedwoodSDK. It's a template designed to get you up and running quickly.

## Quickstart (first time)

Clone the repository and install dependencies (use the `contractflow` folder):

```bash
git clone <repo-url>
cd contractflow
# Use `npm ci` to install exact versions from package-lock.json
npm ci
```

## Running the dev server

```bash
npm run dev
```

Open the URL printed in the terminal (for example `http://localhost:5173/`).

## Tailwind CSS

Tailwind CSS is already configured in this project (Tailwind v4 + PostCSS). You do not need to install Tailwind manually — `npm ci` installs the required packages.

This project includes both options:

- PostCSS adapter: `@tailwindcss/postcss` is configured in `postcss.config.cjs`.
- Vite plugin: `@tailwindcss/vite` is available in devDependencies and can be enabled in `vite.config.mts`.

If you prefer the Vite plugin workflow (recommended for the worker/SSR environment), we use a static styles import via `src/app/styles.css` and link it from `src/app/Document.tsx` with `?url`.

## Troubleshooting

- If port 5173 is already in use, free it:

```bash
lsof -i :5173 -n -P
kill <PID>
# or
npx kill-port 5173
```

- If you see PostCSS/Tailwind plugin errors referencing `tailwindcss`, ensure dependencies are installed (`npm ci`) and that `postcss.config.cjs` and `tailwind.config.cjs` are present.

## Further reading

- [RedwoodSDK Documentation](https://docs.rwsdk.com/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers)
