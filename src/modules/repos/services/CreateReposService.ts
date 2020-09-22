import CreateReposService from './CreateReposService.spec'

let createRepo: CreateReposService
describe('CreateRepo', () => {
  beforeEach(() => {
    createRepo = new CreateReposService()
  })

  it('should be able to create a Repository', async () => {
    const repo = await createRepo.execute()

    expect(repo).toHaveProperty('id')
  })
})
