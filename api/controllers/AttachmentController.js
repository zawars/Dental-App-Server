/**
 * AttachmentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: (req, res) => {
    try {
      req.file('attachment').upload({
        dirname: '../../../uploads/'
      }, async (err, uploadedFiles) => {
        if (err) {
          return res.send(500, err);
        }

        if (uploadedFiles.length > 0) {
          if (uploadedFiles[0].fd.includes("..")) {
            while (uploadedFiles[0].fd.includes("..")) {
              uploadedFiles[0].fd = uploadedFiles[0].fd.replace(`..\\`, ``);
            }
          }

          let attachmentObj = {
            path: uploadedFiles[0].fd,
            // fileName: uploadedFiles[0].fd.split("\\").pop(),
            fileName: uploadedFiles[0].fd.split("/").pop(),
            originalName: uploadedFiles[0].filename,
            size: uploadedFiles[0].size,
            type: uploadedFiles[0].type,
          };

          let createdObj = await Attachment.create(attachmentObj).fetch();

          return res.ok(createdObj);
        } else {
          res.ok({
            message: 'Files are not uploaded.',
            uploadedFiles
          });
        }
      });
    } catch {
      res.badRequest('Error while uploading attachment.');
    }
  },

  download: (req, res) => {
    let Path = require('path');
    let fs = require('fs');

    // If a relative path was provided, resolve it relative
    // to the cwd (which is the top-level path of this sails app)
    // fs.createReadStream(Path.resolve(req.param('path'))).on('error', function (err) {
    fs.createReadStream(req.param('path')).on('error', function (err) {
      return res.serverError(err);
    }).pipe(res);
  },

  delete: async (req, res) => {
    const fs = require('fs');

    let obj = await Attachment.destroy({
      id: req.params.id
    }).fetch();

    fs.unlink(obj[0].path, (err) => {
      if (err) return console.log(err); // handle error as you wish

      return res.json(obj[0]);
    });
  },

};
