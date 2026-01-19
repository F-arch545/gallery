const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// Initializing the app
const app = express();

// View Engine
app.set('view engine', 'ejs');

// Set up the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());

app.use('/', index);
app.use('/image', image);

// ✅ Only connect DB + start server when this file is run directly
if (require.main === module) {
  const MONGODB_URI = process.env.MONGODB_URI || (config.mongoURI && config.mongoURI[app.settings.env]);
  const PORT = process.env.PORT || 5000;

  if (!MONGODB_URI) {
    console.log('Missing MongoDB URI. Set MONGODB_URI or configure config.mongoURI for this environment.');
  } else {
    mongoose.connect(
      MONGODB_URI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Connected to Database: ${MONGODB_URI}`);
        }
      }
    );
  }

  app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
  });
}

module.exports = app;
