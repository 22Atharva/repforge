import express from 'express';
import { getDB } from '../config/db.js';

const router = express.Router();

router.get('/health', (req, res) => {
  const dbState = getDB().readyState;
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: states[dbState] || 'unknown',
  });
});

export default router;
