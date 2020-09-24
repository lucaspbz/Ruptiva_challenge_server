import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import IUserRepository from '@modules/users/repositories/IUserRepository'
import CreateUserService from '@modules/users/services/CreateUserService'
import FakeRepoRepository from '../repositories/fakes/FakeRepoRepository'
import IRepoRepository from '../repositories/IRepoRepository'
import CreateReposService from './CreateReposService'
import DeleteRepoService from './DeleteRepoService'

let createRepo: CreateReposService
let fakeRepoRepository: IRepoRepository
let fakeUsersRepository: IUserRepository
let createUser: CreateUserService
let fakeHashProvider: IHashProvider
let deleteRepo: DeleteRepoService

describe('DeleteRepo', () => {
  beforeEach(() => {
    fakeRepoRepository = new FakeRepoRepository()
    createRepo = new CreateReposService(fakeRepoRepository)

    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
    deleteRepo = new DeleteRepoService(fakeRepoRepository)
  })

  it('should be able to delete a Repository', async () => {
    const fakeDeleteRepo = jest.spyOn(fakeRepoRepository, 'delete')

    const user = await createUser.execute({
      email: 'johndoe@example.com',
      password: '12345678'
    })

    const repo = await createRepo.execute({
      user_id: user.id,
      description: 'test description',
      full_name: 'user/repo_name',
      owner_avatar_url: 'http://url.com.br',
      owner_login: 'example_owner',
    })

    await deleteRepo.execute(repo.id)

    expect(fakeDeleteRepo).toHaveBeenCalledWith(repo.id)
  })
})
