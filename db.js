const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ritwikdas:HgZlPFzao2UJZoej@cluster0.9bqgxk7.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


const DATABASE_NAME = "notedb";
const COLLECTION_NAME = "notes";

/**
 * 
 * {id, title, body, author, date, shared, category}
 * 
 */

async function createNote(req, res){
  let note = {}
  note.title = req.body.title;
  note.body = req.body.body;
  note.author = req.body.author;
  note.date = new Date();
  note.shared = false;
  note.category = req.body.category;

  try{
    await client.connect();
    await client.db(DATABASE_NAME)
    .collection(COLLECTION_NAME)
    .insertOne(note);
    console.log("Note Inserted");
    res.json();
    
  }catch(err){
    console.log(err);
  }
  finally{
    await client.close();
  }
}



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
//run().catch(console.dir);
createNote();

