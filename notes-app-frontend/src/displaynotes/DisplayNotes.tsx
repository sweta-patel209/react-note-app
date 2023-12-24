import React, { useState } from "react";
import "./DisplayNotes.css";
// import AddEditNotes from "../addeditnotes/AddEditNotes";


const DisplayNote = (props:any) => {
  console.log(props.notes.data)
console.log(props.notes.data)
  const notesToDisplay = props.notes
  return (
    <>
      
      <div className="notes-grid">
        {!!notesToDisplay && notesToDisplay.length > 0 ? notesToDisplay.map((note:any,i:any) => (
          <div key={i} className="note-item" onClick={() => props.handleNoteClick(note)}>
            <div className="notes-header">
              <button onClick={(e)=>props.deleteNote(e,note.id)}>X</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        )) : ''}
      </div>
    </>
  );
};

export default DisplayNote;
