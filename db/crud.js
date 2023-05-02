const client = require('./dbconfig.js');

const DATABASE_NAME = "notedb";
const COLLECTION_NAME = "notes";

/**
 * 
 * {id, title, body, author, date, shared, category}
 * 
 */

async function insertNote(req, res){
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
    res.json('Note Inserted Successfully');
    
  }catch(err){
    console.log(err);
    res.json('Error - note cannot be inserted');
  }
  finally{
    await client.close();
  }
}

async function getNotes(req, res){
    //Get Notes
    res.send("Success")
}

async function updateNote(req, res){
    //Update Notes
    res.send("Success")
}

async function deleteNote(req, res){
    //Delete Notes
    res.send("Success")

}

module.exports.insertNote = insertNote;
module.exports.getNotes = getNotes;
module.exports.updateNote = updateNote;
module.exports.deleteNote = deleteNote;




