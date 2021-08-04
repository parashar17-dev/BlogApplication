// Creating express router for Post requests :
const router = require('express').Router();

// importing Post schema :
const Post = require('../models/Post');

// Create New Post :
router.post('/', async (req, res) => {
   const newPost = new Post(req.body);
   try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
   } catch (err) {
      res.status(500).json(err);
   }
});

// Update Post :
router.put('/:id', async (req, res) => {
   try {
      // getting the post with requested post id :
      const post = await Post.findById(req.params.id);

      // checking if the post belongs to the user:
      if (post.username === req.body.username) {
         try {
            // updating the post with changed data :
            const updatedPost = await Post.findByIdAndUpdate(
               req.params.id,
               {
                  $set: req.body,
               },
               { new: true }
            );
            res.status(200).json(updatedPost);
         } catch (err) {
            res.status(500).json(err);
         }
      } // if post don't belong to the user
      else res.status(401).json('You can Update only your Post');
   } catch (err) {
      res.status(500).json(err);
   }
});

// Delete Post:
router.delete('/:id', async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);

      // Checking if the post belongs to the user:
      if (post.username === req.body.username) {
         try {
            await post.delete();
            res.status(200).json('Post has been deleted');
         } catch (err) {
            res.status(500).json(err);
         }
      } // if post don't belong to the user
      else res.status(401).json('You can delete only your post');
   } catch (err) {
      res.status(500).json(err);
   }
});

// Get a  Post :
router.get('/:id', async (req, res) => {
   try {
      // finding the post by id :
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
   } catch (err) {
      res.status(500).json(err);
   }
});

// Get all Posts :
router.get('/', async (req, res) => {
   const username = req.query.user;
   const catName = req.query.cat;

   try {
      let posts;
      if (username) {
         posts = await Post.find({ username: username });
      } else if (catName) {
         posts = await Post.find({
            categories: {
               $in: [catName],
            },
         });
      } else {
         posts = await Post.find();
      }
      res.status(200).json(posts);
   } catch (err) {}
});
module.exports = router;
