# Zealthy Onboarding
### Take-home assignment for Zealthy.

# Documentation

### Introduction
Due to the need for administration configurations, I planned the structure to use server-side requests to supabase for the config data to be present to the client-side components. All routes that need config data use SSR with the exception of `/data` which is purly client side.

The Postgres DB has two tables: `config` and `users`. The `config` table has a single JSON data column which holds the configuration map. Each property represents a 'page' and it's value is an array of strings. These strings are the `displayNames` of each component to be rendered dynamically in the Wizzard Component. When the administrator changes the configuration on the /admin page, a new one is inserted as a new row providing the ability to rollback in the future (not implemented). The `users` table has email, password, and data columns. The data column is used for extra profile fields such as birthday, address, etc.

### Stack
 • Next.js

 • Supabase + Postgres + Prisma

 • Vercel + Serverless Functions


### Src Structure
`app/actions/` - Server-side Serverless functions

`app/ app/admin/ app/data/` - Router Page Components

`components/` - Client Components

`settings/` - Defaults

`types/` - Reusable Typescript Types


### Router

`/` - _Home / Onboarding page_
  - *Server-side Component* - The admin config data is provided via server-side component (SSR) as it's needed for the client component rendering
  - *Client-side Component* - This Wizzard.tsx component renders components dynamically using `React.createElement()` based on the admin config data loaded server-side.

`/admin` - _Administrative page_
  - *Server-side Component* - The admin config data is provided via server-side component (SSR) as it's needed for the client component rendering
  - *Client-side Component* - Using the DnD modules for dragging and dropping input components, form submission appends new configs to DB. The form's submit button is not clickable if any page is void of components.

`/data` - _Users Table_
  - *Client-side Component* - Requests all users from the DB using a server-action, saving the result to state.