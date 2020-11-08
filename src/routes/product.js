import ProductController from '../controllers/product';
import express from 'express';
import Authenticator from '../middlewares/auth';
import Permission from '../middlewares/permission'

export const router = express.Router();

router.get('/', Authenticator.verifyToken, ProductController.list);
router.get('/:product_id',  Authenticator.verifyToken, ProductController.single);

router.post('/', Authenticator.verifyToken, Permission.isAdmin, ProductController.create);
router.patch('/:product_id', Authenticator.verifyToken, Permission.isAdmin, ProductController.update);
router.delete('/:product_id', Authenticator.verifyToken, Permission.isAdmin, ProductController.delete);

export default router;
