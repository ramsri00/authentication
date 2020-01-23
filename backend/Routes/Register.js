const express = require('express');
const Bcrypt = require('bcryptjs');
const { users } = require('../models/Register');
const multer = require('multer');
const router = express.Router();

//for uploading image with formGroup
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post(
  '',
  multer({ storage: storage }).single('image'),
  async (req, res) => {
    console.log('body', req.body);
    console.log('password', req.body.password);
    console.log('Imagefile', req.file);
    let dataJson = req.body;
    let imageValue = false;
    if (req.file != undefined) {
      imageValue = true;
    }
    if (typeof dataJson == 'string') {
      dataJson = JSON.parse(dataJson);
    }
    await users.countDocuments().then(count => {
      userCount = count + 200;
    });
    str1 = 'LIB';
    str2 = userCount.toString(36).toUpperCase();
    userId = str1 + str2;
    hashValue = Bcrypt.hashSync(dataJson.password, Bcrypt.genSaltSync(10));
    const url = req.protocol + '://' + req.get('host');

    //$or: [
    //   { mobileNumber: { $in: dataJson.mobileNumber } },
    //   { emailId: { $in: dataJson.emailId } }
    // ]
    users.findOne({ emailId: dataJson.email }).then(response => {
      console.log('response 2', response);

      // if (!response) {
      if (response) {
        console.log(response.emailId);

        console.log('emailId already exists');
        return res.json({ msg: 'emailIdexists' });
      }
      if (!response) {
        const newUser = new users({
          userId: userId,
          firstName: dataJson.firstName,
          lastName: dataJson.lastName,
          emailId: dataJson.email,
          mobileNumber: dataJson.mobileNumber,
          gender: dataJson.gender,
          password: hashValue
        });
        newUser
          .save()
          .then(response => {
            console.log(response);
            if (imageValue) {
              users
                .updateOne(
                  { emailId: dataJson.email },
                  {
                    $set: {
                      imageUrl: url + '/images/' + req.file.filename
                    }
                  }
                )
                .then(response => {
                  console.log(response);
                  return res.json({ msg: 'success', response: response });
                });
            }
            res.json({
              msg: 'success',
              response: response
            });
          })
          .catch(err => {
            console.log(err);
            // res.json({
            //   err: err
            // });
          });
      }
    });
  }
);
module.exports = router;
