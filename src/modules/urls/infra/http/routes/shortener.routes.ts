import { Router } from 'express'

import determinePersistence from '../middlewares/determinePersistence'
import CreateAndRecoverUrlsController from '../controllers/ShortenerUrlsController'

const shortenerUrlsRouter = Router()
const shortenerUrlsController = new CreateAndRecoverUrlsController()

shortenerUrlsRouter.get('/:id', shortenerUrlsController.recover)
shortenerUrlsRouter.post(
  '/shorten',
  determinePersistence,
  shortenerUrlsController.create,
)

export default shortenerUrlsRouter
