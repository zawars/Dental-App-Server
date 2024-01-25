/**
 * ConversationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getChatBoxData: async (req, res) => {
    let conversations = await Conversation.find().limit(3).sort('updatedAt desc').populateAll();
    res.ok(conversations);
  },

  index: async (req, res) => {
    let conversations = await Conversation.find().paginate({
      page: req.query.page,
      limit: 20
    }).sort('updatedAt desc').populateAll();

    const groupedMessages = {};

    conversations.messages.forEach(message => {
      const date = message.timestamp.toISOString().split('T')[0]; // Extract date from timestamp
      if (!groupedMessages[date]) {
        groupedMessages[date] = [];
      }
      groupedMessages[date].push(message);
    });

    conversations.messages = groupedMessages;
    res.ok(conversations);
  }

};
