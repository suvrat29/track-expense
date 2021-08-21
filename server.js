//Install express server
const compression = require('compression')
const express = require('express');
const path = require('path');
const app = express();

//Enable compression to improve load times
app.use(compression())

// Serve only the static files form the dist directory
app.use(express.static('./dist/'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', { root: 'dist/' }),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

