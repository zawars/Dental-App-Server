// const sendmail = require('sendmail')({});

const nodemailer = require("nodemailer");
// let transporter = nodemailer.createTransport({
//   name: 'www.bkw-oneview.com',
//   host: 'mail3.gridhost.co.uk', //"mail.infomaniak.com",
//   port: 25, //587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: 'claims@crekey.com', //'project.notification@bkw-oneview.com', // generated ethereal user
//     pass: 'Crekey2019$$', //'kitcHlew2277$$$' // generated ethereal password
//   },
// });

let opts = {
  service: 'Gmail',
  auth: {
    user: 'princebajwa129@gmail.com',
    pass: 'bfcd xbum blph awux'
  }
};
let transporter = nodemailer.createTransport(opts);

module.exports = {

  // sendMail: (options, done) => {
  //   sendmail({
  //     from: 'zawar_shahid93@hotmail.com',
  //     to: options.email,
  //     subject: options.subject,
  //     html: options.message
  //   }, function (err, reply) {
  //     if (err) {
  //       return done(err);
  //     }
  //     return done();
  //   });
  // }

  sendMail: (options, done) => {
    transporter.sendMail({
      from: 'zawar_shahid93@hotmail.com', //'project.notification@bkw-oneview.com',
      to: options.email,
      subject: options.subject,
      html: options.message
    }, (err, info) => {
      if (err) {
        return done(err);
      }

      console.log("Message sent: %s", info.messageId);
      return done();
    });
  }

};
