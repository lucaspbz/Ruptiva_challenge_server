import 'reflect-metadata'
import 'express-async-errors'
import '@shared/infra/typeorm'

import cors from 'cors'
import routes from './routes'

import express, { NextFunction, Request, Response } from 'express'
import AppError from '@shared/errors/AppError'

import '@shared/container'

const app = express()
app.use(cors())

app.use(express.json())

app.use(routes)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message
      })
    }

    console.log(err)

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
)

app.listen(3333, () => {
  console.log('Server running on port 3333')
})
