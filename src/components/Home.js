import React, { useContext } from "react";
import UserContext from "../context/notes/UserContext";
import Notes from "./Notes";
import AddNote from "./AddNote";

function Home() {
  const context=useContext(UserContext);
  const {notes,setNotes}=context || {};
  return (
    <div>
     
     
    <Notes />
      
    </div>
  );
}

export default Home;
