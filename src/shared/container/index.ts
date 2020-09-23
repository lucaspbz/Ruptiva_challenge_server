import { container } from 'tsyringe'

import '@modules/users/providers'

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import IUserRepository from '@modules/users/repositories/IUserRepository'

import IRepoRepository from '@modules/repos/repositories/IRepoRepository'
import ReposRepository from '@modules/repos/infra/typeorm/repositories/ReposRepository'

container.registerSingleton<IUserRepository>('UsersRepository', UsersRepository)

container.registerSingleton<IRepoRepository>('ReposRepository', ReposRepository)
