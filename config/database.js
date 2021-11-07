const parse = require("pg-connection-string").parse;

const credentials = {
  host:process.env.HOST,
  port:parseInt(process.env.DATABASE_PORT),
  database_name:process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  ssl: process.env.DATABASE_SSL === 'true'
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
          },
          options: {
            ssl: false,
          },
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
