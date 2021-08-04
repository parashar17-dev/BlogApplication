// Creating Express Server :
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/Auth');
const userRoute = require('./routes/Users');
const postRoute = require('./routes/Posts');
const catRoute = require('./routes/Categories');
const multer = require('multer');
const path = require('path');
app.use(express.json());

// to use .env file:
const dotenv = require('dotenv');
dotenv.config();

const PORT = 5000 || process.env.PORT;

app.use('/images', express.static(path.join(__dirname, '/images')));

// Connecting to mongodb
mongoose
   .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
   })
   .then(console.log('connected to mongo'))
   .catch((err) => console.log(err));

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, './images');
   },
   filename: (req, file, cb) => {
      cb(null, req.body.name);
   },
});

const uploadImg = multer({ storage: storage }).single('file');

app.post('/api/upload', uploadImg, (req, res) => {
   res.status(200).json('file has been uploaded');
});

app.use('/api/auth', authRoute);

app.use('/api/users', userRoute);

app.use('/api/posts', postRoute);

app.use('/api/categories', catRoute);

// Serve Static assets if we are in production
if (process.env.NODE_ENV === 'production') {
   //set Static folder:

   app.use(express.static('client/build'));

   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}

// Port for the backend:
app.listen(PORT, () => console.log('Backend is running'));
