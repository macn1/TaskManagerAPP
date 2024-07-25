const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
let userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        // unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
}
,
    {
        timestamps:true
    })


    // Hash the password before saving the user model
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 8);
    }
    next();
  });
  
  // Create a method to compare the password
  userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

let User = mongoose.model('User',userSchema)

module.exports =User