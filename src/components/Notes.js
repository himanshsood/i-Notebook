import React, { useContext } from "react";
import UserContext from "../context/notes/UserContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(UserContext);
  const { notes, setNotes, addNote} = context || {};

  return (
    <>
    <AddNote />
    <div className="row my-3">
      <h1>Your Notes</h1>

      {notes.map((note) => {
        return <NoteItem note={note}/>;
      })}


      
    </div>

  </>
  );
};

export default Notes;
