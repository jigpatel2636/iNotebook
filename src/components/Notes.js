import React, {useContext} from "react";
import NoteContext from '../context/notes/noteContext'
import Noteitem from "./Noteitem";

function Notes() {
    const context = useContext(NoteContext)
    const {notes, setNotes} = context
  return (
    <div>
      <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.map((note) => {
          return <Noteitem note={note}/>
        })}
      </div>
    </div>
  );
}

export default Notes;
