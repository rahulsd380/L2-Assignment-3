import express from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import globalErrorHabdeler from './app/middlewares/globalErrorHandeler';
import notFoundHandler from './app/middlewares/notFoundHandeler';

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for handling CORS
app.use(cors());

app.get('/', (req, res) => {
  res.send("Welcome to bike rental");
});

// Application routes
app.use('/api', router);

// For catching the incorrect routes
app.use(notFoundHandler);

// Error handling middleware
app.use(globalErrorHabdeler);
app.use(notFound);

export default app;
