import { injectable, inject } from 'tsyringe'

import IUrlRepository from '../repositories/IUrlsRepository'
import Url from '../infra/typeorm/entities/Url'

interface Request {
  user_id: string
}

@injectable()
class ListUserUrlsService {
  constructor(
    @inject('UrlRepository')
    private urlsRepository: IUrlRepository,
  ) {}

  public async execute({ user_id }: Request): Promise<Url[]> {
    return this.urlsRepository.findAllFromUser(user_id)
  }
}

export default ListUserUrlsService
