import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId, // Додано userId як параметр
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  // Додано фільтр по userId для пошуку тільки контактів поточного користувача
  const contactsQuery = ContactsCollection.find({ userId });

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (typeof filter.isFavourite === 'boolean') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  // Виправлено підрахунок кількості контактів з урахуванням userId
  const contactsCount = await ContactsCollection.find({ userId })
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

// Змінено з findById на findOne для пошуку по двом параметрам
export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ 
    _id: contactId, 
    userId 
  });
  return contact;
};

// Додано userId до payload при створенні контакту
export const createContact = async (payload, userId) => {
  const contact = await ContactsCollection.create({
    ...payload,
    userId,
  });
  return contact;
};

// Змінено на пошук по двом параметрам: _id та userId
export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};

// Змінено на пошук по двом параметрам: _id та userId
export const updateContact = async (contactId, payload, userId, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true, includeResultMetadata: true, ...options },
  );

  if (!rawResult || !rawResult.value) return null;
  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};