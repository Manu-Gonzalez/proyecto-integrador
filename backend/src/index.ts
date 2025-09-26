import express from 'express';
import { userRoutes } from '@presentation/routes/user-routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Health check
app.get('/health', (req: any, res: any) => {
  res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});