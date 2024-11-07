const express = require('express');
const bodyParser = require('body-parser');
const listingsRoutes = require('./routes/listings');
const bookingsRoutes = require('./routes/bookings');
var cors = require('cors')
const app = express();
const PORT = 3000;
app.use(cors())
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/listings', listingsRoutes);
app.use('/api/bookings', bookingsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
