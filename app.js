const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const multer = require('multer');
const config = require('./config');
const database = require('./database');
const rateLimiter = require('express-rate-limit');
const cookieParser = require('cookie-parser');

// setting up the express app
const app = express();
const dev = app.get('env') !== 'production';

app.set('port', config.global.port);
app.set('env', config.global.env);

// setting up the middlewares
app.use(cors(dev ? {} : config.cors));
app.use(morgan(dev ? 'dev' : 'combined'));
app.use(cookieParser({ httpOnly: true, secure: !dev }));
app.use(express.urlencoded({ extended: true }));
app.use(
  express.json(
    {
      limit: '50mb',
    },
    {
      verify: (req, res, buf) => (req.rawBody = buf),
    },
  ),
);

// setting up the rate limiter
app.use(rateLimiter(config.security.limiter.standard));

// setting up the compression
app.use(
  compression({
    level: 6,
    threshold: 0,
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    },
  }),
);

// setting up the routes
app.use('/api/v1', require('./routes'));

// multer setup
app.use(
  multer({
    dest: 'public/uploads',
  }).single('image'),
);

// setting up the error handlers RFC 7807
app.use(require('./handlers/error'));
app.use(require('./handlers/notfound'));

// setting up the server
app.listen(app.get('port'), async () => {
  try {
    await database.connect();
    console.info(
      `> Server listening on port ${app.get('port')} in ${app.get('env')} mode`,
      {
        timestamp: new Date().toISOString(),
        url: config.global.base_url,
      },
    );
  } catch (err) {
    console.error(err);
  }
});

// exporting the app
module.exports = app;
