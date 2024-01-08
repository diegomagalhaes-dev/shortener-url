import { injectable, inject } from 'tsyringe'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import IUrlRepository from '../repositories/IUrlsRepository'
import Url from '../infra/typeorm/entities/Url'

interface Request {
  shorted_url_id: string
}

@injectable()
class RecoverShortenedUrlService {
  constructor(
    @inject('UrlRepository')
    private urlsRepository: IUrlRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    shorted_url_id,
  }: Request): Promise<Partial<Url> | null> {
    const url = await this.urlsRepository.findById(shorted_url_id)

    if (url) {
      const updatedAccessCount = url.access_count + 1
      return this.urlsRepository.save(
        Object.assign(url, { access_count: updatedAccessCount }),
      )
    }

    return this.cacheProvider.recover<Url>(shorted_url_id)
  }
}

export default RecoverShortenedUrlService
