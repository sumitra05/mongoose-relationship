const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name : { type:String , required: true},
    body : {type:String , required:true},
    section_id : {
        type:mongoose.Schema.Types.ObjectId, ref:"section"
    },
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "author" },
    isCheckedOut : {type:Boolean, default:false},

});


const Book = mongoose.model('books', bookSchema);
module.exports = Book;