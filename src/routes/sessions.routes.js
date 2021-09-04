import { Router } from 'express';
import SessionService from '../services/SessionService';
import { signUpSchema } from '../validation';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const userLogged = await SessionService.login({ email, password });

  return res.send(userLogged);
});

router.post('/signup', async (req, res) => {
  await signUpSchema.validateAsync(req.body, { abortEarly: false });
  const userRegistered = await SessionService.signUp(req.body);

  return res.send(userRegistered);
});

export default router;
