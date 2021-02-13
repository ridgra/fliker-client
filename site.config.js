module.exports = {
  title: 'fliker.',
  env: {
    dev: process.env.NODE_ENV === 'development',
    prod: process.env.NODE_ENV === 'production',
  },
  api: {
    flickrURLDev: 'http://localhost:3000/api',
    flickrURLProd: 'http://localhost:3000/api',
  },
};
