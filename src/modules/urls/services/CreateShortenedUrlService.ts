import { injectable, inject } from 'tsyringe'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import { nanoid } from 'nanoid'
import IUrlRepository from '../repositories/IUrlsRepository'
import Url from '../infra/typeorm/entities/Url'

interface Request {
  original_url: string
  user_id?: string
}

@injectable()
class GenerateShortenedUrlService {
  constructor(
    @inject('UrlRepository')
    private urlsRepository: IUrlRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    original_url,
    user_id,
  }: Request): Promise<Url | string> {
    const shorted_url_id = nanoid(6)

    const shortened_url = `${process.env.APP_URL}/${shorted_url_id}`

    if (!user_id) {
      await this.cacheProvider.save(
        shorted_url_id,
        {
          original_url,
          shortened_url,
        },
        24 * 60 * 60,
      )
      return shortened_url
    }

    const url = await this.urlsRepository.create({
      id: shorted_url_id,
      original_url,
      shortened_url,
      user_id,
    })

    return url
  }
}

export default GenerateShortenedUrlService
