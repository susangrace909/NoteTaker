const fs = require("fs");
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { application } = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.json());

//create route to main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//create route to notes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//create a get route
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(JSON.parse(data));
    }
  });
});

//post a note
app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let notes = JSON.parse(data) || [];
      let noteId = uuidv4();
      //req.body.id = noteId
      const newNote = req.body;
      console.log({ ...newNote, id: noteId });
      notes.push(newNote);
      fs.writeFile("./db/db.json", JSON.stringify(notes)),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            res.json("Successfully added!");
            console.log("Note successfully added!");
          }
        };
    }
  });
});

//delete a note
app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let notes = JSON.parse(data) || [];
      const id = req.params.id;
      const index = notes.map((note) => note.id).indexOf(id);

      notes.splice(index, 1);
      console.log(notes);
      fs.writeFile("./db/db.json", JSON.stringify(deletedNote)),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            res.json("Successfully deleted!");
            console.log("Note successfully deleted!");
          }
        };
    }
  });
});

// GET * should return the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
