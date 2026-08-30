require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/db');
const artistRoutes = require('./routes/artistRoutes');
const badgeRoutes = require('./routes/badgeRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
const port = Number(process.env.PORT || 8086);

app.disable('x-powered-by');
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '2mb' }));
app.get('/api/health', (_req, res) => res.json({ success: true, data: { status: 'ok' } }));
app.use('/api/artists', artistRoutes);
app.use('/api/badges', badgeRoutes);
app.use(notFound);
app.use(errorHandler);

async function start() {
  await connectDatabase();
  app.listen(port, () => console.log(`API listening at http://localhost:${port}`));
}

if (require.main === module) {
  start().catch((error) => {
    console.error(`API failed to start: ${error.message}`);
    process.exit(1);
  });
}

module.exports = app;
