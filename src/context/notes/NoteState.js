import React, {useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "62ffacf4107db2a80122b680",
          "user": "62ff9e0bc86a33c7869a2d4c",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "Personal",
          "date": "2022-08-19T15:32:04.372Z",
          "__v": 0
        },
        {
          "_id": "62ffacf4107db2a80122b682",
          "user": "62ff9e0bc86a33c7869a2d4c",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "Personal",
          "date": "2022-08-19T15:32:04.537Z",
          "__v": 0
        },
        {
          "_id": "62ffacf4107db2a80122b684",
          "user": "62ff9e0bc86a33c7869a2d4c",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "Personal",
          "date": "2022-08-19T15:32:04.687Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value = {{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;