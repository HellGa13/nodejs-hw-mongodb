import { getAllContacts, getContactById } from '../services/contacts.js';

export const getContactsController = async (req, res) => {
    const contact = await getAllContacts();
    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contact,
    });
};

export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

      if (!contact) {
        return res.status(404).json({
          message: 'Contact not found',
        });
      }

      res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });  
};
