import connectMongoDB from "@/lib/mongodb";


const uri = process.env.MONGODB_URI;


export async function POST(request, res) {
  const { name, address, email, phone } = await request.body;
  await connectMongoDB();

  const database = client.db('mongolab');
  const addressess= database.collection('personaldetails');
  await addressess.create({ name, address, email, phone });
  return res.json({ message: "Address Created" }, { status: 201 });
}

export async function GET(request, res) {
  await connectMongoDB();
  
  const database = client.db('mongolab');
  const addressess= database.collection('personaldetails');

  const addressSingle = await addressess.find(); // Rename variable from Address to addresses
  return res.json({ addressSingle });
}

export async function DELETE(request, res) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  
  const database = client.db('mongolab');
  const addressess= database.collection('personaldetails');

  await addressess.findByIdAndDelete(id);
  return res.json({ message: "Address deleted" }, { status: 200 });
}
