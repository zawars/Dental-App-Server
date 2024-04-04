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
      if (body.doctor) {
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

        if (slotCount === 0) {
          res.ok({
            isSlotAvailable: slotCount === 0,
            doctor
          });
        } else {
          const startDateTime = moment(body.datetime).hour(9).minute(0).unix();
          const endDateTime = moment(body.datetime).hour(17).minute(30).unix();
          const bookedSlotTimes = [];
          const slots = await Slot.find({
            datetime: {
              '>=': moment(body.datetime).hour(9).minute(0).valueOf(),
              '<=': moment(body.datetime).hour(17).minute(30).valueOf()
            }
          });

          // Populate bookedSlotTimes with the times of booked slots
          slots.forEach(slot => {
            const time = moment(slot.datetime).format('h:mm A');
            bookedSlotTimes.push(time);
          });

          // Generate available slot times
          const availableSlots = [];
          let currentTime = startDateTime;

          while (currentTime <= endDateTime) {
            const time = moment.unix(currentTime).format('h:mm A');
            if (!bookedSlotTimes.includes(time)) {
              availableSlots.push(time);
            }
            currentTime += 30 * 60; // Move to the next half-hour slot
          }

          res.ok({
            isSlotAvailable: slotCount === 0,
            doctor,
            availableSlots
          });
        }
      } else {
        const doctors = await Doctor.find();

        if (doctors.length == 0) {
          return res.badRequest({
            message: 'No doctor is available.'
          });
        }

        for (let i = 0; i < doctors.length; i++) {
          let doc = doctors[i];

          if (!doc.workingDays[moment(body.datetime).format('dddd').toLowerCase()]) {
            return res.badRequest({
              message: 'Requested day is not in the schedule of doctor.'
            });
          }

          const isSaturday = UtilService.isWorkingHours(body.datetime, '9:00 AM', '1:30 PM', 'Saturday');
          const isWeekday = UtilService.isWorkingHours(body.datetime, '9:00 AM', '6:00 PM') && moment(body.datetime).format('dddd') !== 'Saturday';

          if (isSaturday && isWeekday) {
            const slotCount = await Slot.count({
              datetime: moment(body.datetime).valueOf(),
              doctor: doc.id
            });

            return res.ok({
              isSlotAvailable: slotCount === 0,
              doctor: doc
            });
          } else {
            console.log('else blcok')
            res.ok({
              isSlotAvailable: false,
            });
          }
        }
      }
    } catch (error) {
      res.serverError({
        message: 'An error occurred while checking the slot',
        error
      });
    }
  },

};

checkAvailability: async (doctor, body) => {
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

  return slotCount;
}
