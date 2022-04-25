import express from 'express';
import './database.js';
import Connection from './database.js';

const app = express();
app.listen(3000, () => console.log("Server launched..."));
app.use(express.json());

Connection.connect();

// ROUTING
import userRoutes from './routes/userRoutes.js';
import sauceRoutes from './routes/sauceRoutes.js';

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

export default app;
