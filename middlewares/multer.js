// PACKAGES
import multer from 'multer';
import { generate as getId } from 'shortid';

const upload = multer({

  fileFilter: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const regExt = /^png|jpe?g|webp$/;
    req.fileExtension = ext;
    if (regExt.test(ext)) cb(null, true);
    if (!regExt.test(ext)) cb(({ message: "Type de fichier non accepté" }));
  },

  limits: { fileSize: 3145728 },

  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },

    filename: (req, file, cb) => {
      const name = getId() + '.' + req.fileExtension;
      cb(null, name);
    }
  })
}).single('image');


export default (req, res, next) => {

  upload(req, res, (err) => err
    ? res.status(400).json(err)
    : next());
};

