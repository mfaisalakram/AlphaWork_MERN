const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  text: {
    type: String,
    requried: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      },
      text:{
          type:String,
          require:true
      },
      date:{
          type:Date,
          default:Date.now
      }
    }
  ]
});
module.exports = Post = mongoose.model("post", PostSchema);
