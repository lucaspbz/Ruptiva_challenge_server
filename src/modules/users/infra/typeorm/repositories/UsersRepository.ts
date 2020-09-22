import { getRepository, Repository } from 'typeorm'

import IUserRepository from '@modules/users/repositories/IUserRepository'
import User from '../entities/User'
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO'

export default class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>
  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async create(userData: ICreateUsersDTO): Promise<User> {
    const user = this.ormRepository.create(userData)

    await this.ormRepository.save(user)

    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } })

    return user
  }
}
