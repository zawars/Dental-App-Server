/**
 * NotificationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getRecentNotifications: async (req, res) => {
    let notifications = await Notification.find().sort('createdAt desc').limit(10).populateAll();

    res.ok(notifications);
  }
};
