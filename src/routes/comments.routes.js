import { Router } from 'express';
import CommentService from '../services/CommentService';
import isAuthenticated from '../middlewares/isAuthenticated';

const router = Router();

router.get('/:photoId', async (req, res) => {
  const { photoId } = req.params;

  const comments = await CommentService.findByPhoto({ photoId });

  return res.send(comments);
});

router.post('/:photoId/add', isAuthenticated, async (req, res) => {
  const { photoId } = req.params;
  const { id: authorId } = req.user;

  const commentAdded = await CommentService.store({
    photoId,
    authorId,
    text: req.body.text,
  });

  return res.send(commentAdded);
});

router.post('/:postId/remove', async (req, res) => {});

export default router;
