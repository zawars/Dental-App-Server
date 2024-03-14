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
    let conversations = await Conversation.find().paginate(req.query.page, 20).sort('updatedAt desc').populateAll();

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
  },

  search: async (req, res) => {
    let nameQuery = req.query.name;

    if (nameQuery) {
      let convs = await Conversation.find({
        name: {
          contains: nameQuery
        }
      }).meta({
        makeLikeModifierCaseInsensitive: true,
      }).limit(20).populateAll();

      res.ok(convs);
    } else {
      res.ok({
        message: 'query parameter name must not be null'
      });
    }
  },

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
