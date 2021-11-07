require('dotenv/config');

const credentials = {
  host:process.env.HOST,
  strapi_port:process.env.STRAPI_PORT,
  jwt_secret: process.env.JWT_SECRET
}

module.exports = ({ env }) => ({
  host: env('HOST', credentials.host),
  port: env.int('STRAPI_PORT', credentials.strapi_port),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', credentials.jwt_secret),
    },
  },
});