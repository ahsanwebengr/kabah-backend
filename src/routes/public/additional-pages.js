import { Router } from 'express';
import {
  getAdditionalPages,
  getOneAdditionalPage,
} from '../../controllers/admin.js/additional-pages.js';

const router = new Router();

router.get('/additional-pages', getAdditionalPages);
router.get('/additional-pages/:slug', getOneAdditionalPage);

export default router;
