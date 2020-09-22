import { uuid } from 'uuidv4'

import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO'
import User from '@modules/users/infra/typeorm/entities/User'
import IUserRepository from '../IUserRepository'

export default class FakeUsersRepository implements IUserRepository {
  private users: User[] = []

  public async create({ email, password }: ICreateUsersDTO) {
    const user = new User()

    Object.assign(user, { id: uuid(), email, password })
    this.users.push(user)

    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const foundUser = this.users.find((user) => user.email === email)

    return foundUser
  }
}
