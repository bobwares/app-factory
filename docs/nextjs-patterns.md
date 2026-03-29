# Next.js Pattern Resources

Checked on 2026-03-29.

Next.js is the closest of the three ecosystems to having a Serverless Land-style discovery experience. The best official combination is Vercel's Next.js templates page, the App Router guides, and the official examples folder in the Next.js repository.

## Closest Equivalent

| Resource | Best for | Notes |
| --- | --- | --- |
| [Next.js templates on Vercel](https://vercel.com/templates/next.js) | Discovering starters by use case | This is the most gallery-like official resource. The page is filterable by AI, Ecommerce, SaaS, Blog, Portfolio, CMS, Backend, Multi-Tenant Apps, Documentation, Authentication, Admin Dashboard, and more. |
| [App Router guides](https://nextjs.org/docs/app/guides) | Official architectural guidance | This is where Vercel documents recommended patterns for auth, BFF, streaming, testing, static export, multi-tenant apps, and self-hosting. |
| [Official examples repo folder](https://github.com/vercel/next.js/tree/canary/examples) | Runnable code samples | Good when you want concrete code across many integrations and deployment scenarios. |

## Best Official Starting Points by Pattern

| Pattern area | Recommended starting point | Why it is useful |
| --- | --- | --- |
| General starter discovery | [Next.js templates on Vercel](https://vercel.com/templates/next.js) | Best current official catalog view. |
| Auth | [Authentication guide](https://nextjs.org/docs/app/guides/authentication) | Official App Router guidance for auth, sessions, and authorization. |
| Backend for frontend | [Backend for Frontend guide](https://nextjs.org/docs/app/guides/backend-for-frontend) | Best official pattern doc for Route Handlers, public endpoints, and using Next.js as an app-specific API layer. |
| Streaming UI | [Streaming guide](https://nextjs.org/docs/app/guides/streaming) | Best starting point for suspense-based streaming and progressive rendering. |
| Static export / static site | [Static exports guide](https://nextjs.org/docs/app/guides/static-exports) | Official reference for deploying Next.js as static assets. |
| SPA-style client app | [Single-page applications guide](https://nextjs.org/docs/app/guides/single-page-applications) | Useful when you want a client-heavy app but still want Next.js conventions and tooling. |
| Multi-tenant apps | [Multi-tenant guide](https://nextjs.org/docs/app/guides/multi-tenant) | Official architecture recommendation for multi-tenant apps. |
| Testing | [Testing guide](https://nextjs.org/docs/app/guides/testing) | Official overview plus Jest, Playwright, Cypress, and Vitest setup links. |
| Official code samples | [vercel/next.js examples](https://github.com/vercel/next.js/tree/canary/examples) | Massive code catalog covering auth, blogs, API routes, CMS, Docker, Prisma, GraphQL, MDX, i18n, and many third-party integrations. |

## Useful Official Example Clusters

These are easiest to discover from the templates page and the examples folder:

| Cluster | Where to look | Notes |
| --- | --- | --- |
| Blog, docs, portfolio | [Templates page](https://vercel.com/templates/next.js) | Fastest path for content-driven sites. |
| SaaS, admin dashboard, auth | [Templates page](https://vercel.com/templates/next.js) | Closest thing to production-grade starters. |
| CMS integrations | [Examples folder](https://github.com/vercel/next.js/tree/canary/examples) | The official repo has many `cms-*` examples. |
| API routes and backend patterns | [Examples folder](https://github.com/vercel/next.js/tree/canary/examples) | Includes `api-routes-rest`, GraphQL, Apollo, middleware, and auth-related examples. |
| Docker and deployment targets | [Examples folder](https://github.com/vercel/next.js/tree/canary/examples) | Includes Docker-focused examples such as `with-docker` and related deployment variants. |

## Recommended Browsing Order

1. Start on [the templates page](https://vercel.com/templates/next.js) and filter by your use case.
2. Read the matching [App Router guide set](https://nextjs.org/docs/app/guides) for the architectural pattern you chose.
3. If you need concrete code, jump to the matching example inside [vercel/next.js/examples](https://github.com/vercel/next.js/tree/canary/examples).

## Practical Take

If you want the closest Next.js equivalent to Serverless Land, use this stack in order:

1. [Templates](https://vercel.com/templates/next.js)
2. [App Router guides](https://nextjs.org/docs/app/guides)
3. [Official examples repo](https://github.com/vercel/next.js/tree/canary/examples)
