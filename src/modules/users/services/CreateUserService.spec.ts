import AppError from '@shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import IUserRepository from '../repositories/IUserRepository'
import CreateUserService from './CreateUserService'

let fakeUsersRepository: IUserRepository
let fakeHashProvider: IHashProvider
let createUser: CreateUserService

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
  })

  it('should be able to create a user', async () => {
    const user = await createUser.execute({
      email: 'johndoe@example.com',
      password: '12345678'
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a user with same email as other user', async () => {
    await createUser.execute({
      email: 'johndoe@example.com',
      password: '12345678'
    })

    await expect(
      createUser.execute({
        email: 'johndoe@example.com',
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
