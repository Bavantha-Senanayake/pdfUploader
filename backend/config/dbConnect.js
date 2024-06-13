const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        const conn =  mongoose.connect(process.env.MONGO_URI);
        
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error:', error.message);
    }
};

module.exports = dbConnect;
