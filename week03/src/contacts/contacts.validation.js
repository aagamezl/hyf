import { z } from 'zod/v4'
import { SEGMENTS } from '../segments.js';

export const Contact = z.strictObject({
    name: z.string("name is required"),
    phonenumber: z.string("phonenumber is required").min(11).max(15)
});

export const ContactId = z.object({
  id: z.string().refine(val => !Number.isNaN(Number(val))).min(1)
});

export const UpdateContact = Contact.partial();

export const validations = {
    // POST /contacts
    create: {
        [SEGMENTS.BODY]: Contact
    },
    // DELETE /contacts/:id
    delete: {
        [SEGMENTS.PARAMS]: ContactId
    },
    // GET /contacts/:id
    getById: {
        [SEGMENTS.PARAMS]: ContactId
    },
    // PATCH /contacts/:id
    update: {
        [SEGMENTS.PARAMS]: ContactId,
        [SEGMENTS.BODY]: UpdateContact
    }
}