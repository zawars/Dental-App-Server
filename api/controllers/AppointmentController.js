/**
 * AppointmentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const moment = require("moment")

module.exports = {
  create: async (req, res) => {
    let body = req.body;

    let patient = await Patient.findOne({
      phone: body.phone
    });

    if (patient) {
      let conversation = await Conversation.findOne({
        patient: patient.id
      });

      let messageList = body.conversation;
      messageList.forEach(message => message.conversation = conversation.id);
      let messages = await Message.createEach(messageList);

      let appointment = await Appointment.create({
        time: moment().valueOf,
        patient: patient.id,
        // doctor
        conversation: conversation.id
      }).fetch();

      await Notification.create({
        time: moment().valueOf(),
        title: 'New appointment created'
      });

      res.ok(appointment);
    } else {
      let pat = await Patient.create({
        name: body.name,
        phone: body.phone
      }).fetch();

      let conversation = await Conversation.create({
        name: body.name,
        patient: pat.id
      }).fetch();

      let messageList = body.conversation;
      messageList.forEach(message => message.conversation = conversation.id);

      let messages = await Message.createEach(messageList);
      let appointment = await Appointment.create({
        time: moment().valueOf,
        patient: pat.id,
        // doctor
        conversation: conversation.id
      }).fetch();

      await Notification.create({
        time: moment().valueOf(),
        title: 'New appointment created'
      });

      res.ok(appointment);
    }
  }

};
