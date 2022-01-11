const express = require('express');
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const cors = require('cors');

//importing routes
const intelRoute = require('./routes/intelRoute');
const adminRoute = require('./routes/adminRoutes');
const feedbackRoute = require('./routes/feedbackRoute');

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//morgan configuration for storing req log
function assignid(req, res, next) {
  req.id = uuidv4();
  next();
}
app.use(assignid);
morgan.token('id', (req) => req.id);

morgan.token('param', (req, res, param) => 'userToken');
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(
    morgan(':id :param :method :status :url "HTTP/:http-version"', {
      stream: accessLogStream,
    })
  );
}

//REST API
app.use('/', intelRoute);
app.use('/intel', intelRoute);
app.use('/admin', adminRoute);
app.use('/feedback', feedbackRoute);

module.exports = app;
