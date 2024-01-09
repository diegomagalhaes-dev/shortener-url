import { Repository } from 'typeorm'
import { AppDataSource } from '../../../../../shared/infra/typeorm'
import IUrlRepository from '../../../repositories/IUrlsRepository'
import ICreateUrlDTO from '../../../dtos/ICreateUrlDTO'
import Url from '../entities/Url'

class UrlsRepository implements IUrlRepository {
  private ormRepository: Repository<Url>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Url)
  }

  public async create(data: ICreateUrlDTO): Promise<Url> {
    const url = this.ormRepository.create(data)

    await this.ormRepository.save(url)

    return url
  }

  public async findById(id: string): Promise<Url | null> {
    const url = await this.ormRepository.findOne({ where: { id } })

    return url
  }

  public async findAllFromUser(userId: string): Promise<Url[]> {
    const urls = await this.ormRepository.find({ where: { user_id: userId } })

    return urls
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete(id)
  }

  public async save(user: Url): Promise<Url> {
    return this.ormRepository.save(user)
  }
}

export default UrlsRepository
