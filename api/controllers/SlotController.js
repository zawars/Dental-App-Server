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

    try {
      const doctor = await Doctor.findOne({
        phone: body.doctor
      });

      if (!doctor) {
        return res.badRequest({
          message: 'Doctor not found'
        });
      }

      if (!doctor.workingDays[moment(body.datetime).format('dddd').toLowerCase()]) {
        return res.badRequest({
          message: 'Requested day is not in the schedule of doctor.'
        });
      }

      const isSaturday = UtilService.isWorkingHours(body.datetime, '9:00 AM', '1:30 PM', 'Saturday');
      const isWeekday = UtilService.isWorkingHours(body.datetime, '9:00 AM', '6:00 PM') && moment(body.datetime).format('dddd') !== 'Saturday';

      if (!isSaturday && !isWeekday) {
        return res.ok({
          message: 'Requested slot is out of doctor availablity!'
        });
      }

      const slotCount = await Slot.count({
        datetime: moment(body.datetime).valueOf(),
        doctor: doctor.id
      });

      res.ok({
        isSlotAvailable: slotCount === 0
      });

    } catch (error) {
      res.serverError({
        message: 'An error occurred while checking the slot',
        error
      });
    }
  }

};
