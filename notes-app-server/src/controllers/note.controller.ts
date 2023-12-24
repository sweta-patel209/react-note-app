import { fetchAllNotes, saveNote, deleteNote, editNote } from "../repository/noteRepo";
import { Request, Response, response } from "express";
import Note from "../model/note";
export const getAllNotes = async(req:Request,res:Response) => {
    
   // console.log(test)
    try {
        const new_note = await fetchAllNotes();
  
        res.status(200).json({
          status: "Ok!",
          message: "Successfully fetched all note data!",
          data: new_note,
        });
      } catch (err) {
        res.status(500).json({
          status: "Internal Server Error!",
          message: "Internal Server Error!",
        });
      }
}

export const create =async (req: Request, res: Response) => {
    try {
        const newNote = {
            id:0,
        } as Note;
        newNote.id = req.body.id;
        newNote.title = req.body.title;
        newNote.content = req.body.content;
  
        const data = await saveNote(newNote);
  
        res.status(201).json({
          data:data,
          status: "Created!",
          message: "Successfully created note!",
        });
      } catch (err) {
        res.status(500).json({
          status: "Internal Server Error!",
          message: "Internal Server Error!",
        });
      }
}

export const removeNote = async(req: Request, res: Response) => {
    try {
      let id = parseInt(req.params["id"]);
      await deleteNote(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully deleted note!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error while deleting Note!",
        message: "Internal Server Error while deleting Note!",
      });
    }
}

export const updateNote = async(req: Request, res: Response) => {
  try {
    let id = parseInt(req.params["id"]);
    const newNote = {
      id:0,
  } as Note;
  newNote.id = id;
  newNote.title = req.body.title;
  newNote.content = req.body.content;
    await editNote(newNote);

    res.status(200).json({
      status: "Ok!",
      message: "Successfully updated note!",
    });
  } catch (err) {
    res.status(500).json({
      status: "Internal Server Error while updating Note!",
      message: "Internal Server Error while updating Note!",
    });
  }
}



