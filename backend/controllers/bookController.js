const Book=require('../models/Book');
const mongoose = require('mongoose')
 


async function addBooks(req,res){
try{
 let {name,author,DOL,price,isDeleted,userID}=req.body;
//  const abc = new ObjectId(userID)
 let newBook=Book({name,author,DOL,price,isDeleted,userID});
 console.log("backend req"  + req);
 console.log( "backend req.user" + req.user);
//  if(newBook.price>200){
//  return  res.status(400).json({message:"cant add "});
//  }
console.log("saved ho gaya");
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
    let updatedBook=await Book.findByIdAndUpdate(req.params.id,{name,author,DOL,price},{ new: true });

    res.status(201).json({message:"book updated Sucessfully",book :updatedBook});
   }catch(err){
       console.log(err.message);
     res.status(400).json({message:"updation failed failed"});
   }
}


async function deleteBook(req,res){
  try{
  //   console.log("Deleting book")
  //   console.log("Param Id ", req.params.id)
    let book=await Book.findById({_id: new mongoose.Types.ObjectId(req.params.id)});
    // console.log("from deletebook Backend"+ req.params.id +book);
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
try{
  // const { search = 'Harry Potter23', page = 1, limit = 5 } = req.query;
  const { search = '', page = 1, limit = 5, sortField = 'name', sortOrder = 1, minPrice, maxPrice } = req.query;

  const query = {
    name: { $regex: search, $options: 'i' },
    ...(req.user.role === 'Guest' ? { isDeleted: false } : { isDeleted: { $in: [true, false] } }),
    price: {
      $gte: minPrice ? parseFloat(minPrice) : 0,
      $lte: maxPrice ? parseFloat(maxPrice) : Number.MAX_SAFE_INTEGER,
    }
  };
  console.log("first query", query);
  const books =await Book.aggregate([
    {
      $match: query
    },{
     $lookup:{
      from:'users',
      localField:'userID',
      foreignField:'_id',
      as:'user'
     }
    },
    {
      $unwind : "$user"
    },
    {
      $project: {
        name: 1,
        author: 1,
        DOL: 1,
        price: 1,
        userName: "$user.name"
      }
    },
    {
      $sort: {
        [sortField]: parseInt(sortOrder)
      }
    },
    {
      $skip:  (parseInt(page) - 1) * parseInt(limit)
    },
    {
      $limit: parseInt(limit)
    }

  ])


  
  // const query={
  //   isDeleted: req.user.role=='Guest' ?false:{ $in: [true,false]},
  //   name: { $regex: search, $options: 'i' }
  // };
 
  // const books= await Book.find(query)
  //    .skip((page-1)*limit)
  //    .limit(parseInt(limit));
    console.log("QUery ", books);
   
     const total= await Book.countDocuments(query);
    res.json({books,total});
}catch(err){
    console.log(err.message);
  res.status(400).json({message:"server error"});
}
}


module.exports={addBooks,editBook,deleteBook,getBooks};