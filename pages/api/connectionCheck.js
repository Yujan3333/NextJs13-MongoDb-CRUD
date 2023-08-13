// pages/api/connectionCheck.js
import connectMongoDB from '@/lib/mongodb'; // Replace with the correct path to mongodb.js

export default async function handler(req, res) {
  try {
    await connectMongoDB();
    // Now you can use the Mongoose `db` object to interact with MongoDB
    // For example: const MyModel = db.model('MyModel');
    res.status(200).json({ message: 'Successfully connected to MongoDB!' });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ error: 'Failed to connect to MongoDB' });
  }
}
