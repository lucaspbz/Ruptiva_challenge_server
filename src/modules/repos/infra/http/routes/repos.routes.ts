import { Router } from 'express'
import { container } from 'tsyringe'

import CreateReposService from '@modules/repos/services/CreateReposService'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import validateFields from '@modules/repos/infra/http/middlewares/validateFields'
import ListUsersReposService from '@modules/repos/services/ListUserReposService'

const reposRouter = Router()

reposRouter.use(ensureAuthenticated)

reposRouter.post('/', validateFields, async (request, response) => {
  const { id } = request.user
  const { description, full_name, owner_avatar_url, owner_login } = request.body

  const createRepo = container.resolve(CreateReposService)

  const repo = await createRepo.execute({ user_id: id, description, full_name, owner_avatar_url, owner_login })

  return response.json(repo)
})

reposRouter.get('/', async (request, response) => {
  const { id } = request.user

  const listRepos = container.resolve(ListUsersReposService)

  const repos = await listRepos.execute(id)

  return response.json(repos)
})



export default reposRouter
