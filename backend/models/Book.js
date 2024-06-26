const mongoose=require('mongoose');

const bookSchema=new mongoose.Schema({
    name:{type: String,required: true},
    author :{type: String,required: true},
    DOL:{type: Date,required: true},
    price:{type: Number,required: true},
    isDeleted:{type: Boolean,default: false}

})

module.exports=mongoose.model('Book',bookSchema);
