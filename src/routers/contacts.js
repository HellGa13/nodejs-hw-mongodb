import { Router } from 'express';

import {
    createContactsController, deleteContactController,
    getContactByIdController, getContactsController,
    patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/contacts.js';
import { updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';


const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController));
router.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createContactsController));
router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactController));
router.patch('/contacts/:contactId', validateBody(updateContactSchema), ctrlWrapper(patchContactController));


export default router;
