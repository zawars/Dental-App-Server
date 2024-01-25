/**
 * ConversationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const moment = require("moment");

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

    conversations.forEach(convo => {
      convo.messages = groupMessagesByDate(convo.messages);
    });

    res.ok(conversations);
  },

  groupMessagesByDate: (messages) => {
    const groupedMessages = {};

    messages.forEach(message => {
      const date = moment(message.createdAt).format("YYYY-MM-DD")
      if (!groupedMessages[date]) {
        groupedMessages[date] = [];
      }
      groupedMessages[date].push(message);
    });

    return groupedMessages;
  }

};

const groupMessagesByDate = (messages) => {
  const groupedMessages = {};

  messages.forEach(message => {
    const date = moment(message.createdAt).format("YYYY-MM-DD")
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  return groupedMessages;
}
