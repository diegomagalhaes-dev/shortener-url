import { Response, Request } from 'express'
import { container } from 'tsyringe'

import RecoverShortenedUrlService from '../../../services/RecoverShortenedUrlSerivce'
import GenerateShortenedUrlService from '../../../services/GenerateShortenedUrlService'
import Url from '../../typeorm/entities/Url'

export default class ShortenerUrlsController {
  public async recover(
    request: Request,
    response: Response,
  ): Promise<Response | void> {
    const { id } = request.params

    const recoverUrlService = container.resolve(RecoverShortenedUrlService)

    const recoveredUrl = await recoverUrlService.execute({
      shorted_url_id: id,
    })

    if (!recoveredUrl?.original_url)
      return response.status(404).json({ message: 'Url not found' })

    response.redirect(recoveredUrl.original_url)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user?.id

    const { original_url } = request.body

    const shortenedUrlService = container.resolve(GenerateShortenedUrlService)

    const shortenedUrl = await shortenedUrlService.execute({
      original_url,
      user_id,
    })

    if (shortenedUrl instanceof Url) {
      return response.json({
        shortened_url: shortenedUrl.shortened_url,
        access_count: shortenedUrl.access_count,
      })
    }

    return response.json(shortenedUrl)
  }
}
