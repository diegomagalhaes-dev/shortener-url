import { injectable, inject } from 'tsyringe'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import { nanoid } from 'nanoid'
import AppError from '@shared/errors/AppError'
import IUrlRepository from '../repositories/IUrlsRepository'
import Url from '../infra/typeorm/entities/Url'

interface Request {
  shorted_url_id: string
}

@injectable()
class FindUrlService {
  constructor(
    @inject('UrlRepository')
    private urlsRepository: IUrlRepository,
  ) {}

  public async execute({ shorted_url_id }: Request): Promise<Url | null> {
    const url = await this.urlsRepository.findById(shorted_url_id)

    return url
  }
}

export default FindUrlService
