import express from 'express'
import { StatusCodes } from 'http-status-codes'

import { router as contactsRouter } from './contacts/contacts.router.js'

const app = express()
const PORT = process.env.PORT

// Parsing body into request
app.use(express.json())

app.get('/', (req, res) => {
  res.status(StatusCodes.BAD_REQUEST).send({
    status: 'OK'
  })
})

app.use(contactsRouter)

app.listen(PORT, () => {
  console.log(`Application running at http://localhost:${PORT}`);
})