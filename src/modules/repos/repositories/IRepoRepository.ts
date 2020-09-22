import Repo from '@modules/repos/infra/typeorm/entities/Repo'
import ICreateRepoDTO from '../dtos/ICreateRepoDTO'

export default interface IRepoRepository {
  create(data: ICreateRepoDTO): Promise<Repo>

  listByUserId(user_id: string): Promise<Repo[] | undefined>

  delete(id: string): Promise<void>
}
