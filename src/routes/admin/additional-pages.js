import { Router } from 'express';
import {
  createAdditionalPages,
  deleteAdditionalPage,
  getAdditionalPages,
  getOneAdditionalPage,
  updateAdditionalPage,
} from '../../controllers/admin.js/additional-pages.js';

const router = new Router();

router.post('/additional-pages', createAdditionalPages);
router.get('/additional-pages', getAdditionalPages);
router.get('/additional-pages/:id', getOneAdditionalPage);
router.delete('/additional-pages/:id', deleteAdditionalPage);
router.put('/additional-pages/:id', updateAdditionalPage);

export default router;
