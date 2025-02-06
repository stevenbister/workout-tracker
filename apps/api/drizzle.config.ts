import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/db/schema',
    out: './src/db/migrations',
    verbose: true,
    strict: true,
    dialect: 'sqlite',
    ...(process.env.NODE_ENV === 'test'
        ? {
              dbCredentials: {
                  url: './src/db/test/test.db',
              },
          }
        : {
              driver: 'd1-http',
              dbCredentials: {
                  accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
                  databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
                  token: process.env.CLOUDFLARE_D1_TOKEN!,
              },
          }),
});
