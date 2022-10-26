import React, {useContext ,useEffect , useRef, useState} from 'react';
import noteContext from '../context/note/noteContext';
import Noteitem from './Noteitem';
import {useNavigate} from 'react-router-dom'

function Note({showAlert , codeData}) {
    const context = useContext(noteContext);
    const {notes ,fetchNote,editNote} = context;
    const navigate = useNavigate();

    useEffect(()=>{
      if(localStorage.getItem("authtoken")){
        fetchNote();
        codeData();
      }else{
        navigate("/login")
      }
    },[editNote])
  

  const [note,setNote] = useState({etitle : "",edescription : "", etag : ""})
  const ref = useRef(null);
  const closeRef = useRef(null);

  const updateNote = (currentNote)=>{
    ref.current.click();
    setNote({id:currentNote._id ,etitle : currentNote.title , edescription : currentNote.description, etag: currentNote.tag})
    fetchNote();
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    closeRef.current.click();
    editNote(note.id,note.etitle,note.edescription,note.etag);
    showAlert("updated successfully","success")
  }

  const onChange = (e)=>{
    setNote({...note, [e.target.name] : e.target.value})
  }

  return (
    <>
<button type="button" ref = {ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
      </div>
      <div className="modal-body">
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
            name="etitle"
            onChange={onChange}
            value={note.etitle}
            minLength={5}
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
            name="edescription"
            onChange={onChange}
            value={note.edescription}
            minLength={5}
          />
        </div>
      </form>
      </div>
      <div className="modal-footer">
        <button disabled = {note.etitle.length < 5 || note.edescription.length < 5} ref={closeRef} type="button" className="btn btn-primary" data-bs-dismiss = "modal" onClick={handleSubmit}>Save</button>
      </div>
    </div>
  </div>
</div>

    {notes.length===0 && <small>Nothing To Show</small>}
    <div className='container'>
        <div className="row">
            {notes.map((usernote)=>{
              return <Noteitem note = {usernote} key={usernote._id} updateNote={updateNote} showAlert={showAlert}/>
            })}
        </div>
      
    </div>
    </>
  )
}

export default Note
