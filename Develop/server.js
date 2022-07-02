const fs = require("fs");
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;
const app = express();

//create route to main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"))
});

//create route to notes
app.get('/notes', (req, res) =>{
  res.sendFile(path.join(__dirname, './public/notes.html'))
});

//create a get route
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.json(JSON.parse(data))
    }
  })
});

//post a note
app.post('/api/notes', (req,res) => {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      let notes = JSON.parse(data)
      const newNote = {...req.body, id: uuidv4()}
      notes.push(newNote)
      fs.writeFile('./db/db.json', JSON.stringify(notes)), (err) => {
        if (err) {
          console.log(err)
        } else {
          res.json('Successfully added!')
          console.log("Note successfully added!")
        }
      }
    }
  })
});

//delete a note
app.delete('/api/notes/:id', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      let notes = JSON.parse(data)
      const id = req.params.id
      let deletedNote = notes.filter(note => {
        note.id !== id
      })
      fs.writeFile('./db/db.json', JSON.stringify(deletedNote)), (err) => {
        if (err) {
          console.log(err)
        } else {
          res.json('Successfully deleted!')
          console.log("Note successfully deleted!")
    }
  })
});

// GET * should return the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
