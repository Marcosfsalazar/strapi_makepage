require('dotenv/config');

const credentials = {
  host:process.env.HOST,
  port:process.env.PORT,
  database_name:process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_USERNAME,
  ssl: process.env.DATABASE_SSL
}

module.exports = ({ env }) => ({
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
});
