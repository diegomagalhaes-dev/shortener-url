import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import ManagementUrlsController from '../controllers/ManagementUrlsController'

const managementUrlsRouter = Router()
const managementUrlsController = new ManagementUrlsController()

managementUrlsRouter.use(ensureAuthenticated)

managementUrlsRouter.get('/urls', managementUrlsController.show)
managementUrlsRouter.delete('/url', managementUrlsController.disable)
managementUrlsRouter.get('/url', managementUrlsController.find)

export default managementUrlsRouter
