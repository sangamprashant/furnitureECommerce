const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Photo:{
    type:String,
    default:null
  },
  sell:{
    type:Boolean,
  }
});

mongoose.model("FURNITUREUSEREC", userSchema);
