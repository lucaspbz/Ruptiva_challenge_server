import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import IUserRepository from '../repositories/IUserRepository'
import AuthenticateUserService from './AuthenticateUserService'

let authenticateUser: AuthenticateUserService
let usersRepository: IUserRepository

describe('AuthenticateUser', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository()
    authenticateUser = new AuthenticateUserService(usersRepository)
  })
  it('should be able to authenticate a user', async () => {
    await usersRepository.create({
      email: 'johndoe@example.com',
      password: '12345678'
    })
    const response = await authenticateUser.execute({ email: '', password: '' })

    expect(response).toHaveProperty('token')
  })
})
