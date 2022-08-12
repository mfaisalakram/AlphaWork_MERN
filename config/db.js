const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// let connString="mongodb://localhost:27017/eaglance-chat";

// if(process.env.NODE_ENV== "production"){
let connString =
  'mongodb+srv://faisalakram:faisalakram@cluster0.v4htb.mongodb.net/?retryWrites=true&w=majority';
// }

const connectDB = async () => {
  try {
    await mongoose.connect(connString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('mongoDB is connected Faisal');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
