const express=require('express');
const { body, validationResult } = require("express-validator");
const Notes=require("../Models/Notes");
const router=express.Router();
const fetchuser=require("../middleware/fetchuser");


router.get('/getnotes', fetchuser, async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.isAuthenticated()) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Fetch notes for the logged-in user
        const notes = await Notes.find({ user: req.user.id });

        res.json(notes);
    } catch (error) {
        res.status(500).send("Internal Server Error occurred");
    }
});

// Route 2: Create notes
router.post('/createnotes', [
    body("title").isLength({min: 5,}),
    body("description").isLength({min: 5,})
], async (req, res) => {
    const {title,description}=req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(401).json({ error: "Invalid token" });
    }
    const note=new Notes({
        title,description
    })
    const savednote=await note.save();
    res.json(savednote);
});


//route3 update an existing note
router.put('/updatenote/:id', fetchuser,async(req,res)=>{
    const{title,description}=req.body;
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    //find the note to be updated and update it
    let note=await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")};
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed");
    }
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json({note});
})

//route3 delete an existing note
//route3 delete an existing note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Note ID is required as a route parameter' });
        }

        const note = await Notes.findById(id);
        if (!note) {
            return res.status(404).send('Note not found');
        }

        if (note.user && note.user.toString() !== req.user.id) {
            return res.status(401).send('Not allowed');
        }

        await Notes.findByIdAndDelete(id);
        res.json({ success: 'Note has been deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error occurred');
    }
});











module.exports=router