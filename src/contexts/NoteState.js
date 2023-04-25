import { useState } from "react";
import noteContext from "./noteContext";

const host = "http://localhost:5000";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);

  //Fetch All Notes
  async function getNotes() {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MmJhOGI3NGJkNjZmNzg4NDExMTZmIn0sImlhdCI6MTY4MjEyMDAyOH0.6d8uoo3N5edNDUhOiNOkf2KkoAm7uFuvUNh4EqcKG5E"
      }
    });
    const notesInitial = await response.json();
    setNotes(notesInitial);
  }

  //Add a note
  const addNote = async (title, description, tag = "default") => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MmJhOGI3NGJkNjZmNzg4NDExMTZmIn0sImlhdCI6MTY4MjEyMDAyOH0.6d8uoo3N5edNDUhOiNOkf2KkoAm7uFuvUNh4EqcKG5E"
      },
      body: JSON.stringify({
        "title": title,
        "description": description,
        "tag": tag
      })
    });

    const result = await response.json();

    if (result.success) {
      setNotes(notes.concat(result.savedNote));
      props.showAlert("Note Added", "success");
    }
    else {
      props.showAlert("There is a problem while adding the note", "danger");
    }
  }

  //Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",

        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MmJhOGI3NGJkNjZmNzg4NDExMTZmIn0sImlhdCI6MTY4MjEyMDAyOH0.6d8uoo3N5edNDUhOiNOkf2KkoAm7uFuvUNh4EqcKG5E"
      }
    });

    const result = await response.json();

    if (result.success) {
      const newNotes = notes.filter((element) => {
        return element._id !== id;
      });
      setNotes(newNotes);
      props.showAlert("Note Deleted", "success")
    }
    else {
      props.showAlert("There is a problem while deleting the note");
    }
  }

  //Edit a note
  const editNote = async (id, title, description, tag = "default") => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0MmJhOGI3NGJkNjZmNzg4NDExMTZmIn0sImlhdCI6MTY4MjEyMDAyOH0.6d8uoo3N5edNDUhOiNOkf2KkoAm7uFuvUNh4EqcKG5E",

        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "title": title,
        "description": description,
        "tag": tag
      })

    });

    const result = await response.json();
    if (result.success) {
      const newNote = result.note;
      for (let i of notes) {
        if (i._id === id) {
          i = newNote;
        }
      }

      setNotes(notes);
      props.showAlert("Note Updated","success");
    }
    
    else{
      props.showAlert("There is a problem while editing this note","danger");
    }
  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, getNotes, editNote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;