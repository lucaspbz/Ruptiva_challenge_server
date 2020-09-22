import ICreateUsersDTO from '../dtos/ICreateUsersDTO'
import User from '../infra/typeorm/entities/User'

export default interface IUserRepository {
  create(data: ICreateUsersDTO): Promise<User>
  findByEmail(email: string): Promise<User | undefined>
}
