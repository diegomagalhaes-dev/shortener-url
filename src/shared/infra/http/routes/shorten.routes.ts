import { Router } from 'express'
import shortenerUrlsRouter from '../../../../modules/urls/infra/http/routes/shortener.routes'

const shortenRoutes = Router()

shortenRoutes.use('/', shortenerUrlsRouter)

export default shortenRoutes
