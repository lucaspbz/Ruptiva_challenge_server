import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider"
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository"
import CreateUserService from "@modules/users/services/CreateUserService"
import FakeRepoRepository from "../repositories/fakes/FakeRepoRepository"
import CreateReposService from "./CreateReposService"
import ListUsersReposService from "./ListUserReposService"

let fakeRepoRepository: FakeRepoRepository
let createRepo: CreateReposService

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider

let createUser: CreateUserService
let listUserRepos: ListUsersReposService

describe('ListUserRepos', () => {
    beforeEach(() => {
        fakeRepoRepository = new FakeRepoRepository()
        createRepo = new CreateReposService(fakeRepoRepository)

        fakeUsersRepository = new FakeUsersRepository()
        fakeHashProvider = new FakeHashProvider()

        createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
        listUserRepos = new ListUsersReposService()
    })
    it('should be able to list a user repositories', async () => {
        const user = await createUser.execute({
            email: 'johndoe@example.com',
            password: '12345678'
        })
        await createRepo.execute({
            user_id: user.id,
            description: 'test description',
            full_name: 'user/repo_name',
            owner_avatar_url: 'http://url.com.br',
            owner_login: 'example_owner',
        })

        const repos = await listUserRepos.execute()

        expect(repos).toHaveLength(1)
    })
})