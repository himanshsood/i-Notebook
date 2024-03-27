import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = (props) => {

  const notesInitial=[
    {
      "_id": "65982ba3bce5787d4ffb0458",
      "title": "himaaa",
      "description": "ewfrk ewhifi fnewo",
      "__v": 0
    },
    {
      "_id": "65982bcdf3687c679cb97796",
      "title": "himaaa",
      "description": "ewfrk ewhifi fnewo",
      "__v": 0
    },
    {
      "_id": "65982bcdf3687c679cb97796",
      "title": "himaaa",
      "description": "ewfrk ewhifi fnewo",
      "__v": 0
    },
    {
      "_id": "65982bcdf3687c679cb97796",
      "title": "himaaa",
      "description": "ewfrk ewhifi fnewo",
      "__v": 0
    },
    {
      "_id": "65982bcdf3687c679cb97796",
      "title": "himaaa",
      "description": "ewfrk ewhifi fnewo",
      "__v": 0
    }
  ]

  const [notes,setNotes]=useState(notesInitial)

  //add a note 

  const addNote=(title,description,tag)=>{

    //to do api call
    const note={
      "_id": "65982ba3bce5787d4ffb0458",
      "title": "himaaa",
      "description": "ewfrk ewhifi fnewo [ADDED]",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }



  //delete a note


  const deleteNote=(id)=>{
    const newNotes=notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)
  }



  //edit a note

  const editNote=()=>{

  }

  return (
    <UserContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
