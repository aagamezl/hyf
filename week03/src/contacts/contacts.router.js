import { randomUUID } from 'node:crypto'

import express from 'express'
import { StatusCodes } from 'http-status-codes'

import { knexInstance } from '../database.js'
import { Contact, UpdateContact, validations } from './contacts.validation.js'
import { validate } from '../middlewares/validate.middleware.js'

export const router = express.Router()
const domain = 'contacts'

router.get(`/api/${domain}`, async (req, res) => {
  try {
    const contacts = await knexInstance().select().from(domain)

    res.status(StatusCodes.OK).json(contacts)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

router.get(`/api/${domain}/:id`, async (req, res) => {
  try {
    const [contact] = await knexInstance().select().from(domain).where({ id: req.params.id })

    res.status(StatusCodes.OK).json(contact)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

router.post(`/api/${domain}`, validate(validations.create), async (req, res) => {
  try {
    const [id] = await knexInstance().insert({ ...req.body }).into(domain)

    res.status(StatusCodes.OK).json({ id })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

// console.log(Contact);
// console.log(UpdateContact);

router.put(`/api/${domain}/:id`, validate(validations.update), async (req, res) => {
  try {
    const id = await knexInstance(domain).update({ ...req.body }).where('id', '=', req.params.id)

    res.status(StatusCodes.OK).json({ id })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

router.delete(`/api/${domain}`, (req, res) => {
  try {
    res.status().json()
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  }

})