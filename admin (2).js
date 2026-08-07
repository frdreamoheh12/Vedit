require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const applicationRoutes = require('./routes/applications');
const statusRoutes = require('./routes/status');
const adminRoutes = require('./routes/admin');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

// ---- core middleware ----
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*', credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

const globalLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use('/api', globalLimiter);

// ---- routes ----
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));
app.use('/api/auth', authRoutes);
app.use('/api', contentRoutes);              // /api/services, /api/courses, /api/testimonials, /api/portfolio
app.use('/api/applications', applicationRoutes); // /api/applications/service|class|team
app.use('/api/status', statusRoutes);         // /api/status/:applicationId
app.use('/api/admin', adminRoutes);           // secured dashboard endpoints

app.use(notFound);
app.use(errorHandler);

// ---- start ----
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected.');
    app.listen(PORT, () => console.log(`Vedit backend running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
