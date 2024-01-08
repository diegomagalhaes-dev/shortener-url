import ICreateUrlDTO from '../dtos/ICreateUrlDTO'
import Url from '../infra/typeorm/entities/Url'

export default interface IUrlRepository {
  create(data: ICreateUrlDTO): Promise<Url>
  findById(id: string): Promise<Url | null>
  findAllFromUser(userId: string): Promise<Url[]>
  delete(id: string): Promise<void>
  save(data: Url): Promise<Url>
}
