const express = require('express');
const Bcrypt = require('bcryptjs');
const { users } = require('../models/Register');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('', async (req, res) => {
  console.log('login route works');
  console.log(req.body);
  console.log(req.body.userData);

  users
    .findOne({
      $or: [
        { userId: { $in: req.body.userData.username } },
        { mobileNumber: { $in: req.body.userData.username } },
        { emailId: { $in: req.body.userData.username } }
      ]
    })
    .then(getUser => {
      console.log('login user', getUser);
      if (!getUser) {
        // console.log("User not found with this id " + usernameVble);

        res.json({
          error: 'User Not Found',
          msg: 'not-found'
        });
      }
      if (getUser) {
        // console.log("User Exist!",getUser[0].password);
        let isValid = Bcrypt.compareSync(
          req.body.userData.password,
          getUser.password
        );

        if (isValid) {
          isRefreshed = true;
          const token = jwt.sign(
            { email: getUser.email, userId: getUser.userId },
            'password_should_be_longer'
          );
          // const refreshToken = jwt.sign(
          //   {
          //     email: getUser[0].email,
          //     userId: getUser[0].userId
          //   },
          //   'password_refresh_should_be_longer',
          //   { expiresIn: '9000000' }
          // );
          res.json({
            msg: 'success',
            userData: getUser,
            token: token
          });
        } else {
          res.json({
            msg: 'invalid-credentials'
          });
        }
      }
    });
});
module.exports = router;
