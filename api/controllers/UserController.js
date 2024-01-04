/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const jwt = require('jsonwebtoken');

module.exports = {
  create: async (req, res) => {
    let data = req.body;
    let check = await User.find({
      email: data.email
    });

    if (check == undefined || check.length == 0) {
      let user = await User.create(data).fetch();
      // let authCode = speakEasy.totp({
      //   digits: 8,
      //   secret: sails.config.session.secret + user.email,
      //   encoding: 'base32',
      //   step: 86400
      // });

      // EmailService.sendMail({
      //   email: user.email,
      //   subject: "Verification",
      //   message: `Please use this token <code>${authCode}</code> to verify your account. <br>`
      // }, (err) => {
      //   if (err) {
      //     res.ok({
      //       message: 'Error sending email.'
      //     });
      //   } else {

      jwt.sign(user, sails.config.session.secret, (err, token) => {
        RedisService.set(user.id, token, () => {
          console.log(`${user.email} logged in.`);
          delete(user.password);

          res.ok({
            token,
            user,
            message: "Logged in successfully."
          });
        });
      });
      // res.ok({
      //   user,
      //   message: 'Verification link sent to your email. Please verify.'
      // });

      //   }
      // });
    } else {
      res.ok({
        message: 'User already exists with either email, username.'
      });
    }
  },

  register: async (req, res) => {
    let data = req.body;
    let check = await User.find({
      email: data.email
    });

    if (check == undefined || check.length == 0) {
      let user = await User.create(data).fetch();

      EmailService.sendMail({
        email: user.email,
        subject: 'Account Details',
        message: `Your credentials are:
          username ${user.username}
          password: ${data.password}
        `
      });

      res.ok({
        user,
        message: "User created successfully."
      });
    } else {
      res.ok({
        message: 'User already exists with either email, username.'
      });
    }
  },

  sendMail: async (req, res) => {
    let body = req.body;

    EmailService.sendMail({
      email: body.email,
      subject: body.subject,
      message: `${body.message}`
    }, () => {
      res.ok({
        message: 'Email Sent.'
      })
    });
  }

};
