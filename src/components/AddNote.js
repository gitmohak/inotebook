import React, { useContext, useState } from 'react';
import noteContext from '../contexts/noteContext';

function AddNote() {
    const { addNote } = useContext(noteContext);
    const [note, setNote] = useState({
      title: "",
      description: ""
    });

    const handleChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("tag").value = "";
    }
  return (
    <>
    <h2 className='my-4'>Add a Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' onChange={handleChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea name="description" id="description" className="form-control" rows="5" onChange={handleChange}></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' onChange={handleChange}/>
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleSubmit} disabled={(()=>{
          if(note.title.length<5 || note.description.length<5){
            return true;
          }
        })()}>Add Note</button>
      </form>
      </>
  )
}

export default AddNote