import { Router } from 'express'
import { container } from 'tsyringe'

import validateFields from '../middlewares/validateFields'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', validateFields, async (request, response) => {
  const { email, password } = request.body

  const authenticateUser = container.resolve(AuthenticateUserService)

  const { token, user } = await authenticateUser.execute({ email, password })

  return response.json({ token, user })
})

export default sessionsRouter
