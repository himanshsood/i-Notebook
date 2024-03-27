import React, { useState, useContext } from "react";
import UserContext from "../context/notes/UserContext";

const AddNote = () => {

    const context = useContext(UserContext);
    const {addNote} = context || {};

    const [note,setnote]=useState({title:"",description:"",tag:"default"})

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    const onChange=(e)=>{
        //spread operator 
        setnote({...note,[e.target.name]:e.target.value})
    }


  return (
    <div>
      <div>
        <h1>Add Your Notes</h1>

        <form>
          <div className="mb-3">
            <label for="title" className="form-label">
              TITLE
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              DESCRIPTION
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick} >
            ADD NOTE
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
