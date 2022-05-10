const express = require('express');
const router = express.Router();

const Author = require("../models/author.model");
const Book = require("../models/book.model");


router.get('/', async(req,res)=>{
    try{
        const author = await Author.find().lean().exec();
        return res.json(author)
    }
    catch(err){
        return res.status(400).send(err.message);
    }
});


router.get('/:id/books', async(req,res)=>{
    try{
        const book = await Book.find({author_id : req.params.id}).populate("autor_id");
        return res.json(book)
    }
    catch(err){
        return res.status(400).send(err.message);
    }
});

router.get('/:id', async(req,res)=>{
    try{
        const author = await Author.findById(req.params.id).lean().exec();
        return res.json(author)
    }
    catch(err){
        return res.status(400).send(err.message);
    }
});


router.post('/', async(req,res)=>{
    try{
        const author = await Author.create(req.body)
        return res.status(200).json(author)
    }
    catch(err){
        return res.status(400).send(err.message);
    }
});

router.patch('/:id', async(req,res)=>{
    try{
        const author = await Author.findByIdAndUpdate(req.params.id , req.body, {new:true})
        return res.status(200).json(author)
    }
    catch(err){
        return res.status(400).send(err.message);
    }
});


router.delete('/:id', async(req,res)=>{
    try{
        const author = await Author.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).json(author)
    }
    catch(err){
        return res.status(400).send(err.message);
    }
});
module.exports = router;