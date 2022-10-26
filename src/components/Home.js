import React, { useState ,useContext} from "react";
import Note from "./Note";
import noteContext from '../context/note/noteContext';


function Home({showAlert, codeData}) {
  const context = useContext(noteContext);
  const{addNote} = context;

  const [note,setNote] = useState({title : "",description : "", tag : "default"})

  const handleSubmit = (e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag)
    setNote({title : "",description : "", tag : ""})
    showAlert("note has been added successfully","success")
  }

  const onChange = (e)=>{
    setNote({...note, [e.target.name] : e.target.value})
  }
  
  return (
    <div className="container my-5">
      <h3>Add Notes</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            placeholder="Enter Title"
            name="title"
            onChange={onChange}
            minLength={5}
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="desc"
            placeholder="Enter Desc..."
            name="description"
            onChange={onChange}
            minLength={5}
            value={note.description}
          />
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Add Note
        </button>
      </form>
      <div className="output my-3">
        <h3>Your Note</h3>
         <Note showAlert={showAlert} codeData={codeData}/>
      </div>
    </div>
  );
}

export default Home;
