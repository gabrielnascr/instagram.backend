/* eslint-disable consistent-return */
import { Router } from 'express';

import multer from 'multer';

import ApiError from '../errors/ApiError';
import isAuthenticated from '../middlewares/isAuthenticated';
import PhotoService from '../services/PhotoService';

const router = Router();

const upload = multer({
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png'
      || file.mimetype === 'image/jpg'
      || file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new ApiError(400, 'Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

router.get('/feed', isAuthenticated, async (req, res) => {
  const { id: userId } = req.user;

  const photos = await PhotoService.findRelevantPhotos({ userId });

  return res.send(photos);
});

router.post('/', upload.single('image'), isAuthenticated, async (req, res) => {
  const storedPhoto = await PhotoService.store({
    userId: req.user.id,
    caption: req.body.caption,
    file: req.file,
  });

  return res.status(200).send(storedPhoto);
});

export default router;
