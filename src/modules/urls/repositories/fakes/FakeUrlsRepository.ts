import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import { uuid } from 'uuidv4'
import Url from '@modules/urls/infra/typeorm/entities/Url'
import User from '@modules/users/infra/typeorm/entities/User'
import ICreateUrlDTO from '@modules/urls/dtos/ICreateUrlDTO'
import { nanoid } from 'nanoid'
import IUrlRepository from '../IUrlsRepository'

class FakeUrlsRepository implements IUrlRepository {
  private urls: Url[] = []

  public async findById(id: string): Promise<Url | null> {
    const findUrl = this.urls.find((url) => url.id === id)

    return findUrl ?? null
  }

  public async create(data: ICreateUrlDTO): Promise<Url> {
    const url = new Url()

    Object.assign(url, { id: nanoid(6) }, data)

    this.urls.push(url)

    return url
  }

  public async findAllFromUser(userId: string): Promise<Url[]> {
    const findUrls = this.urls.filter((url) => url.user_id === userId)

    return findUrls
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.urls.findIndex((url) => url.id === id)

    this.urls.splice(findIndex, 1)
  }

  public async save(data: Url): Promise<Url> {
    const findIndex = this.urls.findIndex((url) => url.id === data.id)

    this.urls[findIndex] = data

    return data
  }
}

export default FakeUrlsRepository
