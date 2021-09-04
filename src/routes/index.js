import { Router } from 'express';

import commentsRoutes from './comments.routes';
import friendshipsRoutes from './friendships.routes';
import likesRoutes from './likes.routes';
import photosRoutes from './photos.routes';
import sessionsRoutes from './sessions.routes';
import usersRoutes from './users.routes';

const router = Router();

router.use('/comments', commentsRoutes);
router.use('/friendships', friendshipsRoutes);
router.use('/likes', likesRoutes);
router.use('/photos', photosRoutes);
router.use('/sessions', sessionsRoutes);
router.use('/users', usersRoutes);

export default router;
