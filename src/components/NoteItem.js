import React, { useContext } from 'react'
import noteContext from '../contexts/noteContext'

function NoteItem(props) {
    const { deleteNote } = useContext(noteContext);
    return (
        <div className="card col-md-3 mx-3 my-3" style={{ width: "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">{props.note.title}</h5>
                <p className="card-text">{props.note.description}</p>

                <i className="bi bi-pencil-square" data-bs-toggle="modal" data-bs-target="#editModal" onClick={()=>{
                    return props.showEditNote(props.note._id);
                }}></i>
                
                <i className="bi bi-trash3 ms-3" onClick={() => {
                    return deleteNote(props.note._id);
                }}></i>
            </div>
        </div>
    )
}

export default NoteItem