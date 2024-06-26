const Book=require('../models/Book');
const mongoose = require('mongoose')
 async function addBooks(req,res){
try{
 let {name,author,DOL,price,isDeleted}=req.body;
 let newBook=Book({name,author,DOL,price,isDeleted});
 const savedBooked=await newBook.save();
 res.status(201).json({message:"book added Sucessfully",book :savedBooked});
}catch(err){
    console.log(err.message);
  res.status(400).json({message:"Add failed"});
}
}

async function editBook(req,res){
  try{
    let {name,author,DOL,price}=req.body;
   
    let book=await Book.findById(req.params.id);
    if(!book){
      res.status(404).json({message:"book not found"});
    }
    let updatedBook=await Book.findByIdAndUpdate(req.params.id,{name,author,DOL,price,},{ new: true });

    res.status(201).json({message:"book updated Sucessfully",book :updatedBook});
   }catch(err){
       console.log(err.message);
     res.status(400).json({message:"updation failed failed"});
   }
}


async function deleteBook(req,res){
  try{
    console.log("Deleting book")
    console.log("Param Id ", req.params.id)
    let book=await Book.findById({_id: new mongoose.Types.ObjectId(req.params.id)});
    console.log("from deletebook Backend"+ req.params.id +book);
    if(!book){
      return res.status(404).json({message:"book not found"});
    }
    book.isDeleted=true;
    book.save();
    res.json({message:"book Deleted"});
    
  }catch(err){
       console.log(err);
     res.status(500).json({message:"server error"});
   }
}


async function getBooks(req,res){
   console.log(req.user);
try{
  const { search = 'Harry Potter23', page = 1, limit = 5 } = req.query;
  const query={
    isDeleted: req.user.role=='Guest' ?false:{ $in: [true,false]},
    name: { $regex: search, $options: 'i' }
  };
 
  const books= await Book.find(query)
     .skip((page-1)*limit)
     .limit(parseInt(limit));

    const total= await Book.countDocuments(query);
    res.json({books,total});
}catch(err){
    console.log(err.message);
  res.status(400).json({message:"server error"});
}
}


module.exports={addBooks,editBook,deleteBook,getBooks};