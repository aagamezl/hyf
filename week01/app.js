import express from 'express'
import {StatusCodes} from 'http-status-codes'
import knex from 'knex'

import { getVersion, PORT, } from './get-version.js'

const knexInstance = knex({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'sys'
  }
})

// The code from before is down here
// [...]

const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello Class!')
})

app.get('/info', (req, res) => {
  res.status(StatusCodes.BAD_REQUEST).send(getVersion())
})

app.get('/db-info', async (req, res) => {
  const [rows] = await knexInstance.raw('SELECT * from sys_config')

  res.json({
    nodeVersion: process.version,
    rows
  })
})

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`)
})
