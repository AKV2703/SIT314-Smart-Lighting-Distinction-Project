const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI

// Use strict mode for queries
mongoose.set('strictQuery', true);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('[override] MongoDB connected'))
    .catch((err) => {
        console.error('[override] MongoDB connection error:', err.message);
        process.exit(1); // exit process if connection fails
    }
);

// Export connection
module.exports = mongoose.connection;