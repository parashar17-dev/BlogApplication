// This is a post schema i.e format of data of a post on database:

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
         unique: true,
      },
      desc: {
         type: String,
         required: true,
      },
      photo: {
         type: String,
         required: false,
      },
      username: {
         type: String,
         required: true,
      },
      categories: {
         type: Array,
         required: false,
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
