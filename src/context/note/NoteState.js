import NoteContext from "./noteContext";
import { useState} from "react";
import React from "react";

const NoteState = (props) => {
  const host = "https://inotes-server.herokuapp.com/";
  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("authtoken")
      },
      body: JSON.stringify({title, description, tag}),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  const fetchNote = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("authtoken")        
        }  
    });
    
    const json = await response.json();
    setNotes(json);
};

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token":
            localStorage.getItem("authtoken")
        }
      });

    const filterNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(filterNote);
  };

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("authtoken")
      },
      body: JSON.stringify({title, description, tag}),
    });

    let newNote = await  JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
            return (
                newNote[index].title = title,
                   newNote[index].description = description,
                   newNote[index].tag = tag
                   ) 
                   break;
                  }
    }
    setNotes(newNote)
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, fetchNote , editNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
