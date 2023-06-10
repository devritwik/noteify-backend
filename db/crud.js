const uuid = require('crypto');
const client = require('./dbconfig.js');

const DATABASE_NAME = "notedb";
const COLLECTION_NAME = "notes";

/*
 * {id, title, body, author, date, shared, category}
 */

async function insertNote(req, res){
  let note = {}
  note.id = uuid.randomBytes(16).toString("hex");
  note.title = req.body.title;
  note.body = req.body.body;
  note.author = req.body.author;
  note.date = new Date();
  note.colour = req.body.colour;

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
    const userID = req.params.userID;
    console.log(userID);
    try{
      await client.connect();
      let dataItr = await client.db(DATABASE_NAME)
      .collection(COLLECTION_NAME)
      .find();

      let data = await dataItr.toArray()

      res.json(data);
      //console.log("Note Fetched Successfully");
      await dataItr.close();
    }catch(err){
      console.log(err.body);
      res.json('Error - note cannot be fetched');
    }finally{
      await client.close();
    }
}

async function updateNote(req, res){
    //Update Notes
    const noteID = req.params.noteID;

    try{
      await client.connect();
      await client.db(DATABASE_NAME)
      .collection(COLLECTION_NAME)
      .findOneAndUpdate(
        { id: "1ee1c08a76a985a4679ac6d809e28137"},
        {
          $set:{
            title: "Updated - Title By ID",
            body: "Updated - Note Body"
          }
        }
      )
      console.log("Update Hit Successfully");
      //res.json("Note Updated Successfully");
    }catch(err){
      console.log(err.body);
      res.json('Error - note cannot be fetched');
    }finally{
      await client.close();
    }



    res.send("Success")
}

async function deleteNote(req, res){
    //Delete Notes
    const id = req.params.noteID;
    try{
      await client.connect();
      await client.db(DATABASE_NAME)
      .collection(COLLECTION_NAME)
      .deleteOne(
        { id: id}
      )
      //console.log("Note Deleted Successfully");
      res.json("Note Deleted Successfully");
    }catch(err){
      console.log(err.body);
      res.json('Error - note cannot be Deleted');
    }finally{
      await client.close();
    }

}



module.exports.insertNote = insertNote;
module.exports.getNotes = getNotes;
module.exports.updateNote = updateNote;
module.exports.deleteNote = deleteNote;




