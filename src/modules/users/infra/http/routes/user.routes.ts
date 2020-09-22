import CreateUserService from '@modules/users/services/CreateUserService'
import { Router } from 'express'
import { container } from 'tsyringe'

const usersRouter = Router()

usersRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const createUser = container.resolve(CreateUserService)

  const user = await createUser.execute({ email, password })

  return response.json(user)
})

export default usersRouter
