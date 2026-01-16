require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { getPool } = require('./db');
const invoiceRoutes = require('./routes/invoices');

const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', async (req, res) => {
  try {
    const pool = await getPool();
    res.json({
      status: 'ok',
      dbConnected: Boolean(pool)
    });
  } catch (error) {
    res.json({
      status: 'ok',
      dbConnected: false,
      error: 'Database connection failed.'
    });
  }
});

app.use('/api', invoiceRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Unexpected server error.' });
});

app.listen(port, () => {
  console.log(`Invoice API listening on port ${port}`);
});
