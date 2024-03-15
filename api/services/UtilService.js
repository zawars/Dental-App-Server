const moment = require('moment');

module.exports = {
  startTime: '2023-01-01T09:00:00+05:00',
  endTime: '2023-01-01T18:00:00+05:00',

  isWorkingHours: (datetime, start, end, day = '') => {
    if (day != 'Saturday') {
      day = '';
      return (
        (moment(datetime).valueOf() > moment(moment(datetime).format('L') + ' ' + start, "MM/DD/YYYY h:mm A").valueOf()) &&
        (moment(datetime).valueOf() < moment(moment(datetime).format('L') + ' ' + end, "MM/DD/YYYY h:mm A").valueOf())
      );
    } else {
      return (
        (moment(datetime).format('dddd') === day) &&
        (moment(datetime).valueOf() > moment(moment(datetime).format('L') + ' ' + start, "MM/DD/YYYY h:mm A").valueOf()) &&
        (moment(datetime).valueOf() < moment(moment(datetime).format('L') + ' ' + end, "MM/DD/YYYY h:mm A").valueOf())
      );
    }
  }
}
