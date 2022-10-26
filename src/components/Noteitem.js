import React ,{useContext} from "react";
import noteContext from "../context/note/noteContext";

function Noteitem(props) {
    const {note,updateNote,showAlert} = props;
    const context = useContext(noteContext);
    const{deleteNote} = context;
  return (
    <div className="col-md-3 mb-3">
      <div className="card">
        <div className="card-body">
          <div className="noteIcon d-flex align-items-center">
          <h5 className="card-title ">{note.title}</h5>
          <i className="fa-sharp fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
          <i className="fa-sharp fa-solid fa-trash" onClick={()=>{deleteNote(note._id); 
            showAlert("note deleted successfully","success");}}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
