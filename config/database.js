const parse = require("pg-connection-string").parse;

const credentials = {
  host:process.env.HOST || "127.0.0.1",
  port:parseInt(process.env.DATABASE_PORT) || 5432,
  database_name:process.env.DATABASE_NAME || 'database',
  username: process.env.DATABASE_USERNAME || 'user',
  password: process.env.DATABASE_PASSWORD || 'password',
  ssl: process.env.DATABASE_SSL === 'true' || false
}

module.exports = ({ env }) => {
  if(env('NODE_ENV') === 'production'){
    const config = parse(process.env.DATABASE_URL);
    return {
      defaultConnection: 'default',
      connections: {
        default: {
          connector: 'bookshelf',
          settings: {
            client: 'postgres',
            host: config.host,
            port: config.port,
            database: config.database,
            username: config.user,
            password: config.password,
            ssl: {
              rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
            },
          },
          options: {},
        },
      },
    }
  }

  return {
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', credentials.host),
        port: env.int('DATABASE_PORT', credentials.port),
        database: env('DATABASE_NAME', credentials.database_name),
        username: env('DATABASE_USERNAME', credentials.username),
        password: env('DATABASE_PASSWORD', credentials.password),
        ssl: env.bool('DATABASE_SSL', credentials.ssl),
      },
      options: {}
    },
  },
}};
