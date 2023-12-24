import React, { useEffect, useState } from "react";
import "./AddEditNotes.css";
import DisplayNote from "../displaynotes/DisplayNotes";

const AddEditNotes = (props: any) => {
  type Note = {
    id: number;
    title: string;
    content: string;
  };
  const [count, setCount] = useState(-1);
  const [isDisabled, setisDisabled] = useState(true);
  const [notes, setNotes] = useState<Note[]>([
    // {
    //   id: 1,
    //   title: "note title 1",
    //   content: "note one is here",
    // },
    // {
    //   id: 2,
    //   title: "note title 2",
    //   content: "note two is here",
    // },
    // {
    //   id: 3,
    //   title: "note title 3",
    //   content: "note three is here",
    // },
    // {
    //   id: 4,
    //   title: "note title 4",
    //   content: "note 4 is here",
    // },
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [error, setError] = useState("")

  useEffect(() => {
    setCount(count + 1);
    console.log(count)
  }
 , []);

  useEffect(()=>{   
    fetchNotes();
  },[])

  const fetchNotes = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/notes/getallnotes");
        const noteList = await response.json();
        const notes:Note[] = noteList.data;
        setNotes(notes);

        console.log(notes,notes.length)
    } catch (error) {
        console.log(error);
    }
};

  const handleNoteClick = (note: Note) => {
    console.log(note)
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    console.log(selectedNote)
  };

  const handleUpdateNote = async (e: React.FormEvent) => {
    e.preventDefault();
   

    if (!selectedNote) {
      return;
    }

    if(title == '' || content == '' ){
        setError("Please enter required details");
        setisDisabled(true);
        return;
    }
  console.log(selectedNote)
   try {
    const response = await fetch(
        `http://localhost:5000/api/notes/${selectedNote.id}`,
        {
            method:'PUT',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                content
            })
        }
    )
    const updatedNote = await response.json();
    const updatedNotesList = notes.map((note) =>
      note.id === selectedNote.id ? updatedNote : note
    );

    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
    fetchNotes();
    
   } catch (error) {
    console.log(error);
   }

    
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const handleAddNote = async(e: React.FormEvent) => {
    setisDisabled(true);
    e.preventDefault();
    console.log(title);
    console.log(content);
    if(title == '' || content == '' ){
        setError("Please enter required details");
        setisDisabled(true);
        return;
    }
    try {
    const response = await fetch(
        "http://localhost:5000/api/notes/savenote",{
            method:"POST",
            headers:{
              "Content-Type": "application/json"
            },
            body:JSON.stringify({
                id:notes.length+1,
                title,
                content
            })
        }
    );
   
    const newNote = await response.json();
    console.log(newNote)
    setNotes([newNote, ...notes]);
    
    setTitle("");
    setContent("");
    fetchNotes();
    console.log('noew notes',notes)
        
    } catch (error) {
        console.log(error);
    }
    
  };

  const deleteNote = async (
    e:React.MouseEvent,
    noteId:number
  )=>{
     e.stopPropagation();
     try {
        const response = await fetch(
            `http://localhost:5000/api/notes/${noteId}`,{
                method:"DELETE"
                
            }
        );
        const updatedNotes = notes.filter((note:any)=>(note.id !== noteId));

    setNotes(updatedNotes);
        
     } catch (error) {
        console.log(error);
     }
  
    
  }

  return (
    <div className="app-container">
      <form
        className="note-form"
        onSubmit={(e) =>
          selectedNote ? handleUpdateNote(e) : handleAddNote(e)
        }
      >
        <input
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        ></input>
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          required
        ></textarea>

        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit" onClick={handleUpdateNote}>
              Save
            </button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <>
            <button disabled = {isDisabled} onClick={handleAddNote}>Add Note</button>
          </>
        )}
         {error && <p className='error-cls'>{error}</p>}
      </form>

      <DisplayNote notes={notes} handleNoteClick={handleNoteClick} deleteNote={deleteNote}/>
    </div>
  );
};

export default AddEditNotes;
