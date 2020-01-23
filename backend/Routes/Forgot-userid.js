const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { users } = require('../models/Register');

router.post('', async (req, res) => {
  var userId;
  console.log('user Details', req.body);
  users.findOne({ emailId: req.body.userData }).then(response => {
    if (response) {
      console.log(response);
      userId = response.userId;
      console.log(userId);

      var smtpTrans = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'arunrocky1000@gmail.com',
          pass: 'kesavank7'
        }
      });
      var mailOptions = {
        from: 'arunrocky1000@gmail.com',
        to: response.emailId,
        subject: 'Node.js Password Reset',
        text:
          'You are receiving this because you (or someone else) have requested the emailId for your account.\n\n' +
          'This is your respected UserId ' +
          userId +
          '\n\n' +
          'If you did not request this, please ignore this email.\n'
      };
      console.log('step 3');

      smtpTrans.sendMail(mailOptions, function(err) {
        console.log('sent');
      });
      res.json({ msg: 'success' });
    } else {
      res.json({ msg: 'mailId-Notfound' });
    }
  });
});
module.exports = router;
