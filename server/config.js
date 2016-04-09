const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/mern-starter',
  port: process.env.PORT || 8000,
  google: {
    clientID: '1011472644628-lh6jks90fv9bbof3g50loeu7vubhjpj7.apps.googleusercontent.com',
    clientSecret: '_JZ6D7auzGU0TwiCqB5OlMKc',
    callbackURL: '/',
  },
};

export default config;
