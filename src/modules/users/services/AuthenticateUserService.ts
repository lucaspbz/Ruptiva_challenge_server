import { inject, injectable } from 'tsyringe'
import { sign } from 'jsonwebtoken'

import AppError from '@shared/errors/AppError'
import User from '../infra/typeorm/entities/User'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import IUserRepository from '../repositories/IUserRepository'

import authConfig from '@config/auth'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: Omit<User, 'password'>
  token: string
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email or password incorrect.', 401)
    }

    const correctPassword = await this.hashProvider.compareHash(
      password,
      user.password
    )

    if (!correctPassword) {
      throw new AppError('Email or password incorrect.', 401)
    }

    const { expiresIn, secret } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    })

    const { password: whatever, ...userWithoutPassword } = user

    return { user: userWithoutPassword, token }
  }
}
