import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'

import 'reflect-metadata'

import AppError from '../../errors/AppError'
import shortenRoutes from './routes/shorten.routes'
import managementRoutes from './routes/management.routes'
import { AppDataSource } from '../typeorm'

import '../../container'

const port = process.env.PORT || 3333

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

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`)
  })
})
