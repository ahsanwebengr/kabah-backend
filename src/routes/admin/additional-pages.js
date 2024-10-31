import { Router } from 'express';
import {
  createAdditionalPages,
  deleteAdditionalPage,
  updateAdditionalPage,
} from '../../controllers/admin.js/additional-pages.js';
import { isAdmin } from '../../middleware/auth.js';

const router = new Router();

router.post('/additional-pages', isAdmin, createAdditionalPages);
router.delete('/additional-pages/:id', isAdmin, deleteAdditionalPage);
router.put('/additional-pages/:id', isAdmin, updateAdditionalPage);

export default router;
