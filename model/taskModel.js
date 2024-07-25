const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userId:{
      
      type:String
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["TODO", "IN PROGRESS", "DONE"],
      required: true,
      default: "TODO",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
