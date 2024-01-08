import shortenerUrlsRouter from '@modules/urls/infra/http/routes/shortener.routes'
import { Router } from 'express'

const shortenRoutes = Router()

shortenRoutes.use('/', shortenerUrlsRouter)

export default shortenRoutes
