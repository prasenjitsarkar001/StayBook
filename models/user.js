const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type:String,
        required: true,
        unique: true,
    trim: true
    },
    username: {
    type: String,
    unique: true,
    trim: true
  },
})
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User" , userSchema);