import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

import ICreateUsersDTO from '../dtos/ICreateUsersDTO'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import IUserRepository from '../repositories/IUserRepository'

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }
  public async execute({ email, password }: ICreateUsersDTO) {
    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new AppError('Email address already taken!')
    }

    const user = await this.usersRepository.create({
      email,
      password: await this.hashProvider.generateHash(password)
    })

    const { password: empty, ...userWithoutPassword } = user
    return userWithoutPassword
  }
}
