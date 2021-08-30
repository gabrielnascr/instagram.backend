import { Router } from 'express';
import isAuthenticated from '../middlewares/isAuthenticated';
import PhotoRepository from '../repositories/PhotoRepository';
import UserService from '../services/UserService';

const router = Router();

router.get('/profile', isAuthenticated ,async (req, res) => {
   const loggedUser = await UserService.profile(req.user.id);

   return res.send(loggedUser);
});

router.get('/feed', isAuthenticated, async (req, res) => {
   return res.send(await PhotoRepository.findByUser(req.user.id));
})

export default router;
