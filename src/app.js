import express from 'express';
import cors from 'cors';

import 'express-async-errors';
import 'dotenv/config';

import handleErrors from './middlewares/handleErrors';

import likesRoutes from './routes/likes.routes';
import sessionsRoutes from './routes/sessions.routes';
import photosRoutes from './routes/photos.routes';
import usersRoutes from './routes/users.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/sessions', sessionsRoutes);
app.use('/likes', likesRoutes);
app.use('/photos', photosRoutes);

app.use(handleErrors);


export default app;
