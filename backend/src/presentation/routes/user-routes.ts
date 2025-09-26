import { Router } from 'express';
import { container } from '@shared/container';
import type { UserController } from '@presentation/controllers/user-controller';

const router: any = Router();
const userController = container.resolve<UserController>('UserController');

router.post('/users', (req: any, res: any) => userController.createUser(req, res));

export { router as userRoutes };