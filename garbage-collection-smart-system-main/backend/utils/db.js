import mongoose from "mongoose";
import dns from "dns";

// Force Google DNS — fixes MongoDB Atlas DNS resolution issues on some networks
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000, // wait up to 30s to connect
            socketTimeoutMS: 45000,          // close sockets after 45s of inactivity
            maxPoolSize: 10,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        // Retry after 5 seconds instead of crashing
        console.log('Retrying connection in 5 seconds...');
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;