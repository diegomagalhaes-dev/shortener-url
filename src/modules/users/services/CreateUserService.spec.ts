import AppError from '../../../shared/errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserService from './CreateUserService'
import FakeHashProvider from '../providers/HashProvider/Fakes/FakeHashProvider'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserService

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
  })

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: 'changeme',
    })

    expect(user).toHaveProperty('id')
  })

  fit('should not be able to create a new user with same email from another', async () => {
    const email = 'userusr@gmail.com'
    await createUser.execute({
      name: 'John Doe',
      email,
      password: 'changeme',
    })

    await expect(
      createUser.execute({
        name: 'Usuario Qualquer',
        email,
        password: '123user',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
