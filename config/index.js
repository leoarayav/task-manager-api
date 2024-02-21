const env = process.env;

module.exports = {
  global: {
    app_name: env.APP_NAME || 'Task manager',
    port: env.PORT || 3000,
    env: env.NODE_ENV || 'development',
    base_url: env.BASE_URL || 'http://localhost:3001/api/v1',
  },
  database: {
    url: env.DATABASE_URL || 'mongodb://localhost:27017/task-manager',
  },
  security: {
    salt_rounds: 10,
    limiter: {
      standard: {
        windowsMs: 15 * 60 * 1000, // 15 minutes
        max: 2000,
      },
      strict: {
        windowMs: 5 * 60 * 1000, // 5 minutes
        max: 5,
      },
    },
    tokens: {
      secret: env.TOKEN_SECRET,
      access: {
        secret: env.ACCESS_TOKEN_SECRET,
        expire: env.ACCESS_TOKEN_EXPIRE || '1h',
      },
      refresh: {
        secret: env.REFRESH_TOKEN_SECRET,
        expire: env.REFRESH_TOKEN_EXPIRE || '1d',
      },
    },
  },
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    maxAge: 3600,
  },
};
