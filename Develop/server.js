const fs = require("fs");
const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();

//app to make new ids

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());
//file path for public folder/css stuff
app.use(express.static("public"));

// GET /notes should return the notes.html file
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// GET * should return the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// GET /api/notes should read the db.json file and return all saved notes as JSON

//function createNewNote(body, notesArray) {
//  const note = body;
//  notesArray.push(note);
//  fs.writeFileSync(
//    path.join(__dirname, "./db/db.json"),
//    JSON.stringify({ notes: notesArray }, null, 2)
//  );
//  return note;
//}

//POST /api/notes should receive a new notes to save on the request body, add it
// to the db.json file, and then return the new note
// to the client. You'll need to find a way to give
// each note a unique id when it's saved (look into
// npm packages that could do that for you)

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
