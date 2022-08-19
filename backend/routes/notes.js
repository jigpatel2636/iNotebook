const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../Middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// Route 1: Get all the notes using GET: /api/notes/fetchallnotes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
        
    }
    catch(error) {
        console.log(error.message)
        res.status(500).send("Internal server error has occured")
    }
});

// Route 2: Add Notes: /api/notes/fetchallnotes
router.post("/addnote",fetchuser,
  [
    body("title", "Enter a valide title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 10 }),
  ],
  async (req, res) => {
    try {
    const {title, description, tag} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
      title, description, tag, user: req.user.id
    })
    const savedNote = await note.save()
    res.json(savedNote)
    }
    catch(error) {
        console.log(error.message)
        res.status(500).send("Internal server error has occured")
    }
  }
 
);

module.exports = router;
