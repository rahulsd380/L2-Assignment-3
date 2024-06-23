import express from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import globalErrorHabdeler from './app/middlewares/globalErrorHandeler';

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for handling CORS
app.use(cors());

// Application routes
app.use('/api', router);

// Error handling middleware
app.use(globalErrorHabdeler);
app.use(notFound);

export default app;
