const express = require('express');
const router = express.Router();
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { users } = require('../models/Register');

router.post('', async (req, res) => {
  console.log(req.body);
  var input = req.body.userData;
  console.log('input', input);

  async.waterfall(
    [
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },

      function(token, done) {
        users
          .updateOne(
            { emailId: req.body.userData },
            {
              $set: {
                resetPasswordToken: token,
                resetPasswordExpires: Date.now() + 3600000
              }
            }
          )
          .then(response => {
            console.log('response : ' + response);

            users.findOne({ emailId: req.body.userData }).then((user, err) => {
              if (!user) {
                res.json({ msg: 'error' });
              }
              console.log('user', user);
              console.log('error', err);
              done(err, token, user);
            });
          });
      },
      function(token, user, done) {
        console.log('step 2');
        console.log('user', user);

        var smtpTrans = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'arunrocky1000@gmail.com',
            pass: 'kesavank7'
          }
        });
        var mailOptions = {
          from: 'arunrocky1000@gmail.com',
          to: user.emailId,
          subject: 'Node.js Password Reset',
          text:
            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please copy and paste this ' +
            token +
            ' verification code to your page\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        console.log('step 3');

        smtpTrans.sendMail(mailOptions, function(err) {
          console.log('sent');
        });
        done('done');
      }
    ],
    function(done) {
      console.log('this done' + ' ' + done);
      res.json({ msg: 'success' });
    }
  );
});
module.exports = router;
