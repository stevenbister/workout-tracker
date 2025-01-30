import { config } from 'dotenv';
import { z } from 'zod';

config();

const EnvSchema = z.object({
    NODE_ENV: z.string().default('development'),
    LOG_LEVEL: z.enum([
        'fatal',
        'error',
        'warn',
        'info',
        'debug',
        'trace',
        'silent',
    ]),
    CLOUDFLARE_ACCOUNT_ID: z.string(),
    CLOUDFLARE_DATABASE_ID: z.string(),
    CLOUDFLARE_D1_TOKEN: z.string(),
});

export type Env = z.infer<typeof EnvSchema>;

const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
    console.error('❌ Invalid env:');
    console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
    process.exit(1);
}

export default env;
