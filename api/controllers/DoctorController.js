/**
 * DoctorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  searchDoctor: async (req, res) => {
    let nameQuery = req.query.name;

    let docs = await Doctor.find({
      name: {
        contains: nameQuery
      }
    }).limit(20).populateAll();

    res.ok(docs);
  },

};
