import { Router } from 'express'
import usersRouter from '../../../../modules/users/infra/http/routes/users.routes'
import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.routes'
import profileRouter from '../../../../modules/users/infra/http/routes/profile.routes'
import managementUrlsRouter from '../../../../modules/urls/infra/http/routes/management.routes'

const managementRoutes = Router()

managementRoutes.use('/sessions', sessionsRouter)
managementRoutes.use('/profile', profileRouter)
managementRoutes.use('/', usersRouter)
managementRoutes.use('/', managementUrlsRouter)

export default managementRoutes
