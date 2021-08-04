// Creating route for a user to register  and login :

// Express router :
const router = require('express').Router();

// Function to hash user password :
const bcrypt = require('bcrypt');

// Importing userSchema :
const User = require('../models/User');

// Register request :
router.post('/register', async (req, res) => {
   try {
      // Hashing the user Password :
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(req.body.password, salt);

      // Creating new User :
      const newUser = new User({
         username: req.body.username,
         email: req.body.email,
         password: hashPass,
      });

      // if every thing is correct saving user to the database :
      const user = await newUser.save();
      res.status(200).json(user);
   } catch (err) {
      res.status(500).json(err);
   }
});

// Loging in the user:
router.post('/login', async (req, res) => {
   try {
      // Finding if the username exists in the database :
      const user = await User.findOne({ username: req.body.username });

      // Returning wrong credentials response :
      !user && res.status(400).json('User do not exist');

      // if username exists checking the password
      const validate = await bcrypt.compare(req.body.password, user.password);
      !validate && res.status(400).json('wrong credentials');

      const { password, ...others } = user._doc;

      // Returning user data except the password :
      res.status(200).json(others);
   } catch (err) {
      res.status(500).json();
   }
});

module.exports = router;
