/**
 * ConversationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getChatBoxData: async (req, res) => {
    let conversations = await Conversation.find().limit(3).sort('createdAt desc').populateAll();
    res.ok(conversations);
  },

  index: async (req, res) => {
    let conversations = await Conversation.find().paginate({page: req.query.page, limit: 20}).sort('createdAt desc').populateAll();
    res.ok(conversations);
  }

};
