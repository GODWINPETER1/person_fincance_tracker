import { Router } from 'express';
import pool from '../config/db'; // Ensure this points to your DB config file

const router = Router();

// Test Database Connection
router.get('/test-db', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        res.json({ message: 'Database Connected!', result: rows });
    } catch (error) {
        console.error('Database Test Error:', error);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

export default router;
