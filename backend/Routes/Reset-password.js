const express = require('express');
const router = express.Router();
const Bcrypt = require('bcryptjs');
const { users } = require('../models/Register');

router.post('/token', async (req, res) => {
  console.log('test 123');
  console.log('body', req.body);
  users.findOne({ resetPasswordToken: req.body.userData }).then(response => {
    console.log(response);
    if (response) {
      res.json({ msg: 'success' });
    } else {
      res.json({ msg: 'error' });
    }
  });
});
router.post('', async (req, res) => {
  console.log('request', req.body);
  console.log('token', req.body.token);
  console.log('password', req.body.userData);
  hashValue = Bcrypt.hashSync(req.body.userData, Bcrypt.genSaltSync(10));
  users
    .findOne({
      resetPasswordToken: req.body.token,
      resetPasswordExpires: { $gt: Date.now() }
    })
    .then(response => {
      console.log(response);
      if (response) {
        users
          .updateOne(
            {
              resetPasswordToken: req.body.token
            },
            {
              $set: {
                password: hashValue
              }
            }
          )
          .then(response => {
            console.log(response);
            users
              .updateOne(
                { resetPasswordToken: req.body.token },
                { $unset: { resetPasswordToken: '', resetPasswordExpires: '' } }
              )
              .then(response => {
                console.log(response);
              });
          });
        res.json({ msg: 'success' });
      } else {
        console.log('successfully redirected...');
        res.json({ msg: 'token-expired' });
      }
    });
});
module.exports = router;
