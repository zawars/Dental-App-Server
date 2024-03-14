/**
 * DoctorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  searchDoctor: async (req, res) => {
    let nameQuery = req.query.name;

    if (nameQuery) {
      let docs = await Doctor.find({
        name: {
          'contains': nameQuery.toString()
        }
      }).meta({
        makeLikeModifierCaseInsensitive: true,
      });

      res.ok(docs);
    } else {
      res.ok({
        message: 'query parameter name must not be null'
      });
    }
  },

};
