const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const destinationsRouter = require('./routes/destinations');
const eventsRouter = require('./routes/events');

const app = express();
const port = 8000;

// Apply CORS middleware first, before any routes
app.use(cors());  // This simpler configuration should work for development

// Use JSON middleware to parse incoming requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/destinationsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Use the destinations routes
app.use('/api/destinations', destinationsRouter);
app.use('/api/events', eventsRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});