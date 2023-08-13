// pages/api/delete.js

import connectToDatabase from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function deleteContact(req, res) {
  if (req.method === 'DELETE') {
    try {
      console.log("Delete request");

      const id = req.query.id;
      console.log('id is:', id);

      const { db } = await connectToDatabase();

      //id of the doc in collection
      const query = { _id: new ObjectId(id) };

      //collection of the db
      const personaldetails = await db.collection("personaldetails");

      // await db.collection('personaldetails').deleteOne(filter);
      const result = await personaldetails.deleteOne(query)
      console.log("Result is : ", result);
      if (result.deletedCount === 1) {
        console.log("Successfully deleted one document.");
      } else {
        console.log("No documents matched the query. Deleted 0 documents.");
      }

      res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).json({ message: 'An error occurred while deleting the address' });
    }
  }
}




