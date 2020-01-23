const express = require('express');
const router = express.Router();
const { users } = require('../models/Register');

router.post('/getUserDetails', async (req, res) => {
  console.log(req.body.userData);
  users.findOne({ emailId: req.body.userData }).then(response => {
    console.log(response);
    res.json({ userData: response });
  });
});
router.post('', async (req, res) => {
  console.log('body....', req.body.userData);
  console.log('present mail', req.body.presentMail);

  let dataJson = req.body.userData;

  console.log('dataJson', dataJson);
  if (typeof dataJson == 'string') {
    dataJson = JSON.parse(dataJson);
  }
  users.findOne({ emailId: dataJson.email }).then(user => {
    console.log(user);
    if (user) {
      res.json({ msg: 'emailId-exists' });
    }
    if (!user) {
      users
        .updateOne(
          { emailId: req.body.presentMail },
          {
            $set: {
              firstName: dataJson.firstName,
              lastName: dataJson.lastName,
              emailId: dataJson.email,
              mobileNumber: dataJson.mobileNumber
            }
          }
        )
        .then(response => {
          console.log(response);
          res.json({ msg: 'success', email: dataJson.email });
        })
        .catch(err => {
          console.log(err);
          res.json({
            err: err
          });
        });
    }
  });
  // users
  //   .updateOne(
  //     { emailId: req.body.userId },
  //     {
  //       $set: {
  //         alternateMobileNumber: dataJson.mobileNumber,
  //         placeOfResidence: dataJson.placeOfResidence,
  //         suburbCity: dataJson.suburbCity,
  //         postCode: dataJson.postCode,
  //         imageUrl: url + '/images/' + req.file.filename
  //       }
  //     }
  //   )
  //   .then(response => {
  //     console.log(response);
  //     res.json({ response: response });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.json({
  //       err: err
  //     });
  //   });
});
module.exports = router;
