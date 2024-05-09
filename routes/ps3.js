// const express = require('express');
// const router = express.Router();
// const https = require('https');  // Assuming https is used for API calls

// // Helper function to perform HTTPS GET requests
// function httpsGet(url) {
//   return new Promise((resolve, reject) => {
//     https.get(url, (response) => {
//       let data = '';

//       // A chunk of data has been received
//       response.on('data', (chunk) => {
//         data += chunk;
//       });

//       // The whole response has been received
//       response.on('end', () => {
//         try {
//           resolve(JSON.parse(data));
//         } catch (e) {
//           reject(e);
//         }
//       });
//     }).on('error', (err) => {
//       reject(err);
//     });
//   });
// }

// // GET route returning fixed string
// router.get('/string', (req, res) => {
//   res.render('index', { string: 'Hey now' });
// });

// // New POST route
// router.post('/data', async (req, res) => {
//   const query = req.body.query; // Or however you get the data needed for the API call
//   const cacheKey = `apiResponse:${query}`;

//   try {
//     // Check cache first
//     const cachedData = await client.get(cacheKey);
//     if (cachedData) {
//       return res.json({ source: 'cache', data: JSON.parse(cachedData) });
//     }

//     // Call third-party API if not in cache
//     const url = new URL(`https://api.example.com/data`);
//     url.searchParams.append('query', query);
//     const data = await httpsGet(url.toString());

//     // Save the new data in cache with a 15-second expiration
//     await client.setEx(cacheKey, 15, JSON.stringify(data));

//     // Return the new data
//     res.json({ source: 'api', data });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // GET route with parameter
// router.get('/names/:name', (req, res) => {
//   const name = req.params.name;
//   res.render('index', { name });
// });

// module.exports = router;

// const redis = require('redis');
// const client = redis.createClient({
//   // Your Redis configuration options
//   host: 'localhost',
//   port: 6379
// });

// client.on('error', (err) => console.log('Redis Client Error', err));
// client.connect();

const express = require('express');
const router = express.Router();
const https = require('https');  // Assuming https is used for API calls

// Helper function to perform HTTPS GET requests
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';

      // A chunk of data has been received
      response.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received
      response.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// This route should be modified according to your Redis client integration in app.js
router.post('/data', async (req, res) => {
  const { query } = req.body;
  const cacheKey = `apiResponse:${query}`;
  const client = req.redisClient; // Assuming Redis client is passed via middleware in app.js

  try {
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      return res.json({ source: 'cache', data: JSON.parse(cachedData) });
    }

    const url = new URL(`https://api.example.com/data`);
    url.searchParams.append('query', query);
    const data = await httpsGet(url.toString());

    await client.setEx(cacheKey, 15, JSON.stringify(data)); // Set data with 15 seconds expiry
    res.json({ source: 'api', data });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Example GET route
router.get('/string', (req, res) => {
  res.json({ string: 'Hey now' });
});

// Another example GET route that takes a parameter
router.get('/names/:name', (req, res) => {
  const { name } = req.params;
  res.json({ message: `Hello, ${name}!` });
});

module.exports = router;
