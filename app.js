// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));

// // Set up Pug
// app.set('view engine', 'pug');
// app.set('views', './views');

// // Import routes from ps3.js
// const ps3Routes = require('./routes/ps3');
// app.use('/ps3', ps3Routes);

// // Start server
// app.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });

const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const app = express();
const port = 3000;

// Create a Redis client
const client = redis.createClient({
  url: 'redis://localhost:6379'  // Use environment variable or configuration
});

client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();

// Middleware to pass Redis client
app.use((req, res, next) => {
  req.redisClient = client;
  next();
});

app.use(bodyParser.json());
app.use('/api', require('./routes/ps3'));  // Ensure routes are correctly directed

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

