import { inject, injectable } from 'tsyringe'
import AppError from '../../../shared/errors/AppError'
import User from '../infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequestDTO {
  user_id: string
}

@injectable()
export default class ShowProfileService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found.')
    }

    return user
  }
}
