import { Router } from 'express';
import isAuthenticated from '../middlewares/isAuthenticated';
import PhotoRepository from '../repositories/PhotoRepository';
import UserService from '../services/UserService';

const router = Router();

router.get('/profile', isAuthenticated, async (req, res) => {
  const loggedUser = await UserService.getProfile(req.user.id);

  return res.send(loggedUser);
});

router.get('/posts', isAuthenticated, async (req, res) => {
  const posts = await PhotoRepository.findByUser(req.user.id);

  return res.send(posts);
});

export default router;
