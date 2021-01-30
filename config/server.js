module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'ec2dac0cefdc34e70f0c94e802e565b2'),
    },
  },
  cron: {
    enabled: true,
  },
});
