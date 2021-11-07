require('dotenv/config');

const credentials = {
  host:process.env.HOST,
  port:process.env.PORT,
  jwt_secret: process.env.JWT_SECRET
}

module.exports = ({ env }) => ({
  host: env('HOST', credentials.host),
  port: env.int('PORT', credentials.port),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', credentials.jwt_secret),
    },
  },
});