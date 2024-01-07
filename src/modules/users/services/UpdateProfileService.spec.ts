import AppError from '@shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/Fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateProfileService from './UpdateProfileService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let updateProfile: UpdateProfileService

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    )
  })

  it('shold be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exple.com',
      password: '1231',
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johnDoe@example.com',
    })

    expect(updatedUser.name).toBe('John Doe')
    expect(updatedUser.email).toBe('johnDoe@example.com')
  })

  it('should not be able to update email to an already using email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456',
    })

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johnDoe@example.com',
      password: '123123',
      old_password: '123456',
    })

    expect(updateUser.password).toBe('123123')
  })

  it('should not be able to update the password with wrong current password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Pica',
        email: 'picadasgalaxias@example.com',
        old_password: 'zapkkk',
        password: 'zap2',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update the password without current password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        email: 'novoemail@example.com',
        name: 'kkkNovo nome',
        password: 'senhaNovaEOsCRLH',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update the profile of a non-exising user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user',
        name: 'Teste',
        email: 'test@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
