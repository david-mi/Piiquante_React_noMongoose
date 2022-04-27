import express from 'express';
import Connection from './database.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import jwtAuth from './middlewares/jwtAuth.js';
import cors from 'cors';

Connection.connect();

const app = express();
app.listen(3000, () => console.log("Server launched..."));
app.use(express.json());
app.use(cors());

// ROUTING
import userRoutes from './routes/userRoutes.js';
import sauceRoutes from './routes/sauceRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const dir = dirname(__filename);

app.use('/api/auth', userRoutes);
app.use('/api/sauces', jwtAuth, sauceRoutes);
app.use('/images', express.static(join(dir, 'images')));

export default app;
