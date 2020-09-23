import { Router } from 'express'
import { container } from 'tsyringe'

import CreateReposService from '@modules/repos/services/CreateReposService'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import validateFields from '@modules/repos/infra/http/middlewares/validateFields'

const reposRouter = Router()

reposRouter.use(ensureAuthenticated)

reposRouter.post('/', validateFields, async (request, response) => {
  const { id } = request.user
  const { title, url } = request.body

  const createRepo = container.resolve(CreateReposService)

  const repo = await createRepo.execute({ title, url, user_id: id })

  return response.json(repo)
})

export default reposRouter
