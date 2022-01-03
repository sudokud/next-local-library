# Frontend for the strapi-local-library tutorial article.

## usage

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fleerob%2Fleerob.io)

- **Framework**: [Next.js](https://nextjs.org/)
- **Deployment**: [Vercel](https://vercel.com)
- **Content**: [Strapi](https://strapi.io)
- **Styling**: [Geist-ui](https://geist-ui.io/)
- **client side Data Fetching**: [SWR](https://swr.io)
- **form handling**: [RHF](https://react-hook-form.io)
- **date formating**: [Luxon](https://luxon.io)

## Overview

- `pages/catalog/*` - Static pre-rendered blog pages using [MDX](https://github.com/mdx-js/mdx).
- `pages/dashboard` - [Personal dashboard](https://leerob.io/dashboard) containing metrics like sales, views, and subscribers.
- `pages/*` - All other static pages.

## Running Locally

```bash
$ git clone https://github.com/sudokud/next-local-libray.git
$ cd next-local-library
$ yarn
$ yarn dev
```

Create a `.env` file similar to .env.example
