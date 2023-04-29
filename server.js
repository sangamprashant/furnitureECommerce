const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path =require ("path")

// enable CORS
app.use(cors());
app.use(express.json())
require('./models/model')
require('./models/product')
require('./models/cart')
require('./models/order')
app.use(require("./route/account"))
app.use(require("./route/auth"))
app.use(require("./route/product"))

// connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log(error);
});


//serving the frontend
app.use(express.static(path.join(__dirname,"./shop/build")))
app.get("*",(req,res)=>{
  res.sendFile(
    path.join(__dirname,"./shop/build/index.html"),
    function (err){
      res.status(500).send(err)
    }
  )
})


// start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
