const express =require("express");
const book =require("../controllers/bookController");
const { auth }=require("../middleware/auth");
const { authAdmin }=require("../middleware/admin");

const router=express.Router();


router.post('/addBook',[auth,authAdmin],book.addBooks);
router.put('/editBook/:id',[auth,authAdmin],book.editBook);
router.delete('/deleteBook/:id',[auth,authAdmin],book.deleteBook);
router.get('/getBooks',auth,book.getBooks);


module.exports=router;