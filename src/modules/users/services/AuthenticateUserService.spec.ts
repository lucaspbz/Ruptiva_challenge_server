import AppError from '@shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import IUserRepository from '../repositories/IUserRepository'
import AuthenticateUserService from './AuthenticateUserService'

let authenticateUser: AuthenticateUserService
let fakeHashProvider: IHashProvider
let fakeUsersRepository: IUserRepository

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )
  })

  it('should be able to authenticate a user', async () => {
    await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      password: '12345678'
    })
    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '12345678'
    })

    expect(response).toHaveProperty('token')
  })

  it('should not be able to authenticate a user with wrong email', async () => {
    await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      password: '12345678'
    })
    await expect(
      authenticateUser.execute({
        email: 'wrong-email@email.com',
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate a user with wrong password', async () => {
    await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      password: '12345678'
    })
    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
