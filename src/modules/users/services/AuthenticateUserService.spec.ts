import AppError from '../../../shared/errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/Fakes/FakeHashProvider'
import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserService
let authenticateUser: AuthenticateUserService

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    )
  })

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'Diêgo',
      email: 'johndoe@mail.com',
      password: 'diego123user',
    })

    const response = await authenticateUser.execute({
      email: 'johndoe@mail.com',
      password: 'diego123user',
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe@mail.com',
        password: 'diego123user',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'Diêgo',
      email: 'johndoe@mail.com',
      password: '123456',
    })

    await expect(
      authenticateUser.execute({
        email: 'johndoe@mail.com',
        password: 'wrongpassword',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
