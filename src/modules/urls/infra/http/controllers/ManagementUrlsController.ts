import { Response, Request } from 'express'
import { container } from 'tsyringe'
import ListUserUrlsService from '../../../services/ListUserUrlsService'
import DisableUserUrlService from '../../../services/DisableUserUrlService'
import FindShortenedUrlService from '../../../services/FindShortenedUrlService'

export default class ManagementUrlsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const listUrlsService = container.resolve(ListUserUrlsService)

    const urls = await listUrlsService.execute({
      user_id,
    })

    return response.json(urls)
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const shorted_url_id = request.query.shorted_url_id as string

    const findUrl = container.resolve(FindShortenedUrlService)

    const url = await findUrl.execute({
      shorted_url_id,
      user_id,
    })

    if (!url) return response.status(404).json({ message: 'Url not found' })

    return response.json({
      original_url: url.original_url,
      shortened_url: url.shortened_url,
      access_count: url.access_count,
    })
  }

  public async disable(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id
    const shorted_url_id = request.query.shorted_url_id as string

    const disableUrl = container.resolve(DisableUserUrlService)

    await disableUrl.execute({
      shorted_url_id,
      user_id,
    })

    return response.status(204).send()
  }
}
