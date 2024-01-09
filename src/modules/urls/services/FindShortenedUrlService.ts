import { injectable, inject } from 'tsyringe'

import ICacheProvider from '../../../shared/container/providers/CacheProvider/models/ICacheProvider'
import IUrlRepository from '../repositories/IUrlsRepository'
import Url from '../infra/typeorm/entities/Url'

interface Request {
  shorted_url_id: string
  user_id: string
}

@injectable()
class FindShortenedUrlService {
  constructor(
    @inject('UrlRepository')
    private urlsRepository: IUrlRepository,
  ) {}

  public async execute({
    shorted_url_id,
    user_id,
  }: Request): Promise<Partial<Url> | null> {
    return this.urlsRepository.findOneFromUser(shorted_url_id, user_id)
  }
}

export default FindShortenedUrlService
