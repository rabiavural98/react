// backend/routes/testRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Corrected import statement
const Admin = require('../models/adminModel');

router.get('/DBConnectionTest', async (req, res) => {
    try {
        // Find the first document in the 'admins' collection
        const admin = await Admin.findOne({});
        if (admin) {
            // Send the "name" value
            res.send(`Backend connected successfully! Admin name: ${admin.name}`);
        } else {
            res.send('No admin found');
        }
    } catch (err) {
        console.error('Error fetching admin:', err);
        res.status(500).send('Error fetching admin');
    }
});

module.exports = router;

