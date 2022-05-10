const express = require('express');
const connect = require('./configs/db');
const app = express();

const authorController = require('./controllers/author.controller')
const bookController = require("./controllers/book.controller");
const sectionController = require("./controllers/section.controller");


app.use(express.json());
app.use("/authors", authorController);
app.use("/books", bookController);
app.use("/sections", sectionController);


app.listen(4200, async()=>{
    try {
        await connect();
        console.log(`running on 4200`)
    } catch (error) {
        console.log(error.message);
    }
})