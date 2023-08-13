// pages/api/add.js

import  connectToDatabase  from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log("post request")
    const { name, phone, email, address } = req.body;
    
    console.log("Name is:", name);
    console.log("Phone is:", phone);
    console.log("Email is:", email);
    console.log("Address is:", address);

    const { db } = await connectToDatabase();

    await db.collection('personaldetails').insertOne({
      name,
      phone,
      email,
      address,
    });

    res.status(201).json({ message: 'Address added successfully' });
  }
}
