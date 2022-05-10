const express = require('express');
const router = express.Router();

const Book = require("../models/book.model");

router.get('/', async(req,res)=>{
    try{
        let criteria = {};
        const {isCheckedOut} = req.query;
        if (isCheckedOut) {
            criteria.isCheckedOut = isCheckedOut;
        }
        const books =  await Book.find().populate("section_id").populate("author_id").lean().exec();
        return res.json(books)
    }
    catch(err){
        return res.status(400).send(err.message);
    }
});


router.get('/:id/section', async(req,res)=>{
    try{
        const books  = await Book.find({section_id : req.params.findById});
        return res.json(books)
    }
    catch(err){
        return res.status(400).send(err.message);
    }
});

router.get('/:id/sections', async(req,res)=>{
    try{
        const books  = await Book.find({section_id : req.params.id}).populate("section_id");
        return res.json(books)
    }
    catch(err){
        return res.status(400).send(err.message);
    }
});

router.get('/:id', async(req,res)=>{
    try{
        const books  = await Book.findById(req.param.id).lean().exec();
        return res.json(books)
    }
    catch(err){
        return res.status(400).send(err.message);
    }
});


router.post('/', async(req,res)=>{
    try{
        const author = await Book.create(req.body)
        return res.status(200).json(author)
    }
    catch(err){
        return res.status(400).send(err.message);
    }
});

router.patch('/:id', async(req,res)=>{
    try{
        const author = await Book.findByIdAndUpdate(req.params.id , req.body, {new:true})
        return res.status(200).json(author)
    }
    catch(err){
        return res.status(400).send(err.message);
    }
});


router.delete('/:id', async(req,res)=>{
    try{
        const author = await Book.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).json(author)
    }
    catch(err){
        return res.status(400).send(err.message);
    }
});

module.exports = router;