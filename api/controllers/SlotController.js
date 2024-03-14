/**
 * SlotController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const moment = require('moment');

module.exports = {
  isSlotAvailable: async (req, res) => {
    const body = req.body;

    let doctor = await Doctor.findOne({
      phone: body.doctor
    });

    if (doctor) {
      let slot = await Slot.count({
        datetime: moment().valueOf(body.datetime),
        doctor: doctor.id
      });

      if (slot > 0) {
        res.ok({
          isSlotAvailable: false
        });
      } else {
        res.ok({
          isSlotAvailable: true
        });
      }
    }
  },

};
