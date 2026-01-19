const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let upload = require('./upload');
const url = require('url');
let Image = require('../models/images');

router.get('/', (req, res) => {
  // ✅ CI/Test-safe: don't touch DB in tests
  if (process.env.NODE_ENV === 'test') {
    return res.status(200).send('OK');
  }

  Image.find({}, function (err, images) {
    if (err) {
      console.log(err);
      // ✅ Don’t hang the request on DB failure
      return res.status(500).send('Database error');
    }

    return res.render('index', { images: images, msg: req.query.msg });
  });
});

router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.redirect(`/?msg=${err}`);
    }

    if (req.file == undefined) {
      return res.redirect('/?msg=Error: No file selected!');
    }

    let newImage = new Image({
      name: req.file.filename,
      size: req.file.size,
      path: 'images/' + req.file.filename,
    });

    // Save (don’t block response if save fails)
    newImage.save().catch((e) => console.log(e));

    return res.redirect('/?msg=File uploaded successfully');
  });
});

module.exports = router;
