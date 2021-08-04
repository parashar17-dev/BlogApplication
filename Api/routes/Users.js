const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Post = require('../models/Post');

// Update User Profile :
router.put('/:id', async (req, res) => {
   if (req.body.userId === req.params.id) {
      if (req.body.password) {
         const salt = await bcrypt.genSalt(10);
         req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      try {
         const UpdatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
               $set: req.body,
            },
            { new: true }
         );
         res.status(200).json(UpdatedUser);
      } catch (err) {
         res.status(500).json(err);
      }
   } else res.status(401).json('You can Update only your account!');
});

// Delete User and Posts:
router.delete('/:id', async (req, res) => {
   if (req.body.userId === req.params.id) {
      const user = await User.findById(req.params.id);
      try {
         if (user) {
            try {
               await Post.deleteMany({ username: user.username });
               await User.findByIdAndDelete(req.params.id);
               res.status(200).json('User has been deleted...');
            } catch (err) {
               res.status(500).json(err);
            }
         }
      } catch (err) {
         res.status(404).json('User Not Found');
      }
   } else res.status(401).json('You can delete only your account!');
});

// Get User :
router.get('/:id', async (req, res) => {
   try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
   } catch (err) {
      res.status(500).json(err);
   }
});
module.exports = router;
