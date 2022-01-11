const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');

// DB config
const db = require('./config/keys').mongoURI;
// Connection to MongoDB
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('Database server Connected'))
  .catch((error) => console.log(error.message));

// Configuration of dev-server
dotenv.config({ path: './config/.env' });
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
