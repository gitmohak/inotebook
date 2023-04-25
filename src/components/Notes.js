import React, { useContext, useEffect, useState } from 'react';
import noteContext from '../contexts/noteContext';
import NoteItem from './NoteItem';

function Notes() {
    const { notes, getNotes, editNote } = useContext(noteContext);
    const [currentID, setCurrentID] = useState(null);
    const [note, setNote] = useState({
        etitle: "",
        edescription: ""
    });

    useEffect(() => {
        getNotes();
    }, [getNotes]);

    const showEditNote = (id) => {
        for (let i of notes){
            if(i._id === id){
                document.getElementById("etitle").value = i.title;
                document.getElementById("edescription").value = i.description;
                document.getElementById("etag").value = i.tag;

                setCurrentID(id);
                setNote({
                    etitle: i.title,
                    edescription: i.description
                });
            }
        }
    }

    const handleChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }

    return (
        <>
            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' onChange={handleChange}/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea name="edescription" id="edescription" className="form-control" rows="5" onChange={handleChange}></textarea>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                            <button type="button" className="btn btn-primary"
                            disabled={(()=>{
                                if(note.etitle.length<5 || note.edescription.length<5){
                                  return true;
                                }
                                else{
                                    return false;
                                }
                              })()}

                            onClick={()=>{

                                editNote(currentID, document.getElementById("etitle").value, document.getElementById("edescription").value, document.getElementById("etag").value);

                            }}
                            
                            data-bs-dismiss="modal">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <h2 className='my-4'>Your Notes</h2>
                <p>
                    {notes.length === 0 && "No notes to display"}
                </p>
                {
                    notes.map((note) => {
                        return <NoteItem key={note._id} note={note} showEditNote={showEditNote}/>
                    })
                }
            </div>
        </>
    )
}

export default Notes