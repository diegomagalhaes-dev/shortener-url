import { injectable, inject } from 'tsyringe'

import AppError from '../../../shared/errors/AppError'
import User from '../infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/Models/IHashProvider'

interface Request {
  name: string
  email: string
  password: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError('Email address already used.')
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return user
  }
}

export default CreateUserService
