/**
 * PatientController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async (req, res) => {
    const patients = await Patient.find().paginate(req.query.page || 0, 20).sort('updatedAt desc').populateAll();
    res.ok(patients);
  }

};
