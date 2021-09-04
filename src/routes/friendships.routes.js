import { Router } from 'express';
import isAuthenticated from '../middlewares/isAuthenticated';
import FriendshipsService from '../services/FriendshipsService';

const router = Router();

router.get('/:userId/followers', isAuthenticated, async (req, res) => {
  const { userId } = req.params;

  const followers = await FriendshipsService.followers({
    userId,
  });

  return res.status(200).send(followers);
});

router.post('/:userId/follow', isAuthenticated, async (req, res) => {
  const { userId } = req.params;
  const { id: followerId } = req.user;

  const follow = await FriendshipsService.follow({ userId, followerId });

  return res.status(200).send(follow);
});

router.post('/:userId/unfollow', isAuthenticated, async (req, res) => {
  const { userId } = req.params;

  const { id: followerId } = req.user;

  const unfollow = await FriendshipsService.unFollow({
    userId,
    followerId,
  });

  return res.status(200).send(unfollow);
});

export default router;
