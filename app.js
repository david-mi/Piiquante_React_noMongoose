//PACKAGES
import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

//CLASSES
import Connection from './database.js';

//MIDDLEWARES
import jwtAuth from './middlewares/jwtAuth.js';

//ROUTES
import userRoutes from './routes/userRoutes.js';
import sauceRoutes from './routes/sauceRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

Connection.connect();

const app = express();
app.listen(3000, () => console.log("Server launched..."));
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const dir = dirname(__filename);

app.use('/api/auth', userRoutes);
app.use('/api/sauces', jwtAuth, sauceRoutes);
app.use('/images', express.static(join(dir, 'images')));
app.use(errorHandler);

export default app;
