const express = require('express');
const router = express.Router();
const Bcrypt = require('bcryptjs');
const { users } = require('../models/Register');

router.post('', async (req, res) => {
  console.log('body......', req.body.userData);
  console.log('userEmail...', req.body.userEmail);
  // console.log('id', req.body.userId);
  let dataJson = req.body.userData;
  hashValue = Bcrypt.hashSync(dataJson.newPassword, Bcrypt.genSaltSync(10));
  if (typeof dataJson == 'string') {
    dataJson = JSON.parse(dataJson);
  }
  users.findOne({ emailId: req.body.userEmail }).then(getUser => {
    console.log('user found.....', getUser);
    if (getUser) {
      let isValid = Bcrypt.compareSync(dataJson.oldPassword, getUser.password);
      console.log(isValid);
      if (isValid) {
        users
          .updateOne(
            { emailId: req.body.userEmail },
            { $set: { password: hashValue } }
          )
          .then(response => {
            console.log('updatedResponse', response);
            res.json({ msg: 'success' });
          });
      } else {
        res.json({ msg: 'wrong-password' });
      }
    } else if (!getUser) {
      res.json({ msg: 'emailId-not-found' });
    }
  });
});
module.exports = router;
