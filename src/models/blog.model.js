import { Schema, model } from "mongoose";

let blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: [5, "Min character length for title is 5"],
  },
  description: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        let matches = String(value).match(/\b[^\d\s]+\b/g);
        if (matches && matches.length >= 20) {
          //20 or more words
          return true;
        } else {
          //not enough words
          return false;
        }
      },
      message: "Description should be more than 20 words",
    },
    image:{
        type:String,
        required:true,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKFSgdhQvBlZO6I8s-jtKIYOED1NqEs4xEjA&s"
    },
    authorId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        requied:true
    },
    commentId:[{type:Schema.Types.ObjectId,ref:"Comment"}]
  },
},{timestamps:true});

let Blog=model("Blog",blogSchema)

export default Blog