import { updateNote } from "../controllers/note.controller";
import Note from "../model/note";


var notesList: Note[] = [
//   {
//     id:1,
//     title:'teste11',
//     content:'contentttt'
// },
//{
//     id:2,
//     title:'teste2',
//     content:'contentttt dsfsdfsf'

//}
]


export const fetchAllNotes = async() =>{
   
    try {
        // obj.push(note)
       // console.log(note)
        console.log(notesList)
        return notesList;
       
   
    } catch (error) {
      console.log(error);  
    }
}

export const saveNote =async (note:Note) => {
    
    try {
        //let newNote:Note;
        const newNote = { id: note.id, title:note.title, content:note.content } as Note ;  
        notesList.push(newNote) 
        return notesList;           
        //obj = newNote;
      } catch (error) {
        throw new Error("Failed to create note!");
      }
}

export const deleteNote =async (noteId:number): Promise<void> => {
    
    try {
        //let newNote:Note;
        const newNote = notesList.filter((note:any)=>(note.id !== noteId));  
        notesList = newNote;      
        //obj = newNote;

        
      } catch (error) {
        throw new Error("Failed to delete note!");
      }
}

export const editNote =async (note:Note): Promise<void> => {
    
    try {
        //let newNote:Note;
     //   const newNote = notesList.map((note1));  
      //  notesList = newNote;      
        //obj = newNote;
      //  var updatedNote:Note={ id: 0, title:'', content:'' }
      const updatedNote = {} as Note;
        notesList.map((note1) =>
            {
                if( note1.id === note.id)
                {
                    updatedNote.id= note.id;
                    updatedNote.title = note.title;
                    updatedNote.content = note.content;
                    return updatedNote;
                }
            
            }       
        );
      //  console.log(updatedNote);
      //  notesList = [...notesList, updatedNote]
        

        const editedNote = notesList.find(x => x.id === note.id);
            if (editedNote) {
                editedNote['content'] = note.content;
                editedNote['title'] = note.title;
            }
      
            console.log(notesList)

      } catch (error) {
        throw new Error("Failed to delete note!");
      }
}






