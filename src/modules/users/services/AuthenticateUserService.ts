import { inject, injectable } from 'tsyringe'
import User from '../infra/typeorm/entities/User'
import IUserRepository from '../repositories/IUserRepository'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute({ email, password }: IRequest) {
    const user = await this.usersRepository.findByEmail(email)
  }
}
