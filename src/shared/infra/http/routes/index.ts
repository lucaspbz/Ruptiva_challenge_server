import { Router } from 'express'

import usersRouter from '@modules/users/infra/http/routes/users.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import reposRouter from '@modules/repos/infra/http/routes/repos.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/session', sessionsRouter)
routes.use('/repos', reposRouter)

export default routes
