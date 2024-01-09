import { injectable, inject } from 'tsyringe'

import IUrlRepository from '../repositories/IUrlsRepository'

interface Request {
  shorted_url_id: string
}

@injectable()
class DisableUserUrlService {
  constructor(
    @inject('UrlRepository')
    private urlsRepository: IUrlRepository,
  ) {}

  public async execute({ shorted_url_id }: Request): Promise<void> {
    return this.urlsRepository.delete(shorted_url_id)
  }
}

export default DisableUserUrlService
