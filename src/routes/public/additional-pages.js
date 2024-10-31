import { Router } from 'express';
import {
  createAdditionalPages,
  getAdditionalPages,
} from '../../controllers/admin.js/additional-pages.js';
import { isAdmin } from '../../middleware/auth.js';

const router = new Router();

router.get('/additional-pages', getAdditionalPages);
router.get('/additional-pages/:id', getAdditionalPages);

export default router;
