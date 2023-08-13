//api get route
import  connectToDatabase  from '@/lib/mongodb';

export default async function handler(req, res) {
  console.log("get request.....")
  if (req.method === 'GET') {
    const { db } = await connectToDatabase();

    const contacts = await db.collection('personaldetails').find({}).toArray();
    res.status(200).json(contacts);
  }
  else {
  res.status(400).json({ message: 'Method Not Allowed' });
}
}