import { randomUUID } from 'node:crypto'

import express from 'express'
import { StatusCodes } from 'http-status-codes'

import { knexInstance } from '../database.js'

export const router = express.Router()
const domain = 'users'

router.get(`/${domain}`, async (req, res) => {
  const users = await knexInstance.select().from(domain)

  res.status(StatusCodes.OK).json(domain)
})

router.post(`/${domain}`, async (req, res) => {
  const result = await knexInstance
    .insert({ ...req.body, token: randomUUID() })
    .into(domain);

  res.status(StatusCodes.CREATED).json(result[0])
})
