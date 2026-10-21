// Entry point of the app

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
require('dotenv').config();

const app = express();
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use(cors({
  origin(origin, callback) {
    // Requests without an Origin header are useful for health checks and tools.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS origin is not allowed'));
  },
  credentials: true,
}));

app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────────────────────

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Simple health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Finance Tracker API is running!' });
});

app.use(errorHandler);

// ─── Connect to MongoDB & Start Server ───────────────────────────────────────

const PORT = process.env.PORT || 5000;

const databaseConnection = mongoose.connect(process.env.MONGO_URI);

databaseConnection
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection failed:', err.message));

// Local Node.js development starts a listener. Vercel imports this Express app
// as a serverless function instead, so it must not open its own port there.
if (require.main === module) {
  databaseConnection
    .then(() => {
      app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch(() => process.exit(1));
}

module.exports = app;
