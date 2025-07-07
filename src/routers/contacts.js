import { Router } from 'express';

import {
    getContactsController,
    getContactByIdController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper';


const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.post('/contacts', ctrlWrapper(getContactsController));
router.delete('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.patch('/contacts/:contactId', ctrlWrapper(getContactByIdController));


export default router;
