const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes=require('./routes/userRoutes');
const bookRoutes=require('./routes/bookRoutes');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/users',userRoutes);
app.use('/api/books',bookRoutes);

mongoose.connect("mongodb+srv://harshitpatil015:YPjkwcfbTEiqIRna@cluster0.fbydfdx.mongodb.net/bookStore?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log('connected to db');
}).catch((err)=>{
    console("DBconnection failed");
    console.log(err);
})
app.get('/',(req,res)=>{
    res.send("hello ji");
}
)
app.listen(port, () => {
  console.log(`Server is running`);
});
