// pages/api/update.js

import connectToDatabase from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
// import Address from '@/models/address';

export default async function updateContact(req, res) {
  if (req.method === 'PUT') {
    try {
      console.log("PUT Update request");
      // console.log("Request body:", req.body);

      // const { id, name, phone, email, address } = req.body;
      const { name, phone, email, address } = req.body;


      // Checking by hard coding
      // name="yujanbasnet";
      // const id1="64cb1b9121af5b8061aa95b8";


      const id=req.query.id
      console.log("Id is:", id);
      console.log("Name is:", name);
      console.log("Phone is:", phone);
      console.log("Email is:", email);
      console.log("Address is:", address);

      const {db } = await connectToDatabase();

      console.log("Running in Update route");

      // create a filter for a personaldetails update
    // const filter = { _id: ObjectId(id) };
    const filter = { _id: new ObjectId(id) };

    // this option instructs the method to create a document if no documents match the filter
    // const options = { upsert: true };

    // create a document that sets the detail
    const updateDoc = {
      $set: {
        name,
        phone,
        email,
        address,
      },
    };
    
    const personaldetails = await db.collection("personaldetails");

    // const result = await personaldetails.updateOne(filter, updateDoc, options )
    
    const result = await personaldetails.updateOne(filter, updateDoc )
    console.log("Result is : ", result);

      // await db.collection('personaldetails').updateOne(
      //   { _id: id1 },
      //   {
      //     $set: {
      //       name,
      //       phone,
      //       email,
      //       address,
      //     },
      //   }
      // );

      
    

      res.status(200).json({ message: 'Address updated successfully' });
    } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).json({ message: 'An error occurred while updating the address' });
    }
  }
}

