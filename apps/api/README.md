# api

## Getting started

### Create a database

```bash
pnpm dlx wrangler d1 create my-database
```

### Bind to your D1 database

Copy the lines obtained from the cli command above.

Add them to the wrangler.toml file. Particularly the database name and the id.

You'll also need to add your cloudflare account id, database id and d1 token to your .env file.

```txt
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_DATABASE_ID=
CLOUDFLARE_D1_TOKEN=
```

These can all be found in your cloudflare dashboard.

- https://developers.cloudflare.com/fundamentals/setup/find-account-and-zone-ids/
- https://developers.cloudflare.com/fundamentals/api/get-started/create-token/

Make sure your D1 token has **D1:Read, D1:Edit** permissions.

### Migrate tables

Once you have your database setup run the migration script to generate the required tables.

```
pnpm db:migrate
```

### Seeding

TODO...

## Developing

Before you start development you'll need to add an api-key to access the api.

Create a `.dev.vars` file and add `API_KEY` with any value you want to develop with.

Then whenever you make a call to the api set the `x-api-key` header with the value of `API_KEY`.

```
pnpm install
pnpm dev
```

## Deployment

TODO...
