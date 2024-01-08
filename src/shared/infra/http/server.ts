import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'

import 'reflect-metadata'

import AppError from '@shared/errors/AppError'
import { AppDataSource } from '@shared/infra/typeorm'

import '@shared/container'
import shortenRoutes from './routes/shorten.routes'
import managementRoutes from './routes/management.routes'

AppDataSource.initialize().then(() => {
  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use('/', shortenRoutes)
  app.use('/user', managementRoutes)

  app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          status: 'error',
          message: err.message,
        })
      }

      return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
      })
    },
  )

  app.listen(3333, () => {
    console.log('Server started on port 3333! 🔥')
  })
})
