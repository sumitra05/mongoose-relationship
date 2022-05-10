const express = require('express');
const router = express.Router();

const Section = require("../models/section.model");

router.get('/', async(req,res)=>{
    try{
        const sections = await Section.find().lean().exec();
        res.status(200).json(sections);
    }
    catch(err){
        return res.status(400).send(err.message);
    }
});


router.get('/:id', async(req,res)=>{
    try{
        const sections  = await Section.findById(req.param.id).lean().exec();
        return res.json(sections)
    }
    catch(err){
        return res.status(400).send(err.message);
    }
});


router.post('/', async(req,res)=>{
    try{
        const sections = await Section.create(req.body)
        return res.status(200).json(sections)
    }
    catch(err){
        return res.status(400).send(err.message);
    }
});

router.patch('/:id', async(req,res)=>{
    try{
        const sections = await Section.findByIdAndUpdate(req.params.id , req.body, {new:true})
        return res.status(200).json(sections)
    }
    catch(err){
        return res.status(400).send(err.message);
    }
});


router.delete('/:id', async(req,res)=>{
    try{
        const sections = await Section.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).json(sections)
    }
    catch(err){
        return res.status(400).send(err.message);
    }
});

module.exports = router;