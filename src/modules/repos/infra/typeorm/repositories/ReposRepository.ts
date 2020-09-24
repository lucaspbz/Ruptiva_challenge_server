import { getRepository, Repository } from 'typeorm'

import IRepoRepository from '@modules/repos/repositories/IRepoRepository'
import Repo from '../entities/Repo'
import ICreateRepoDTO from '@modules/repos/dtos/ICreateRepoDTO'

export default class ReposRepository implements IRepoRepository {
  private ormRepository: Repository<Repo>

  constructor() {
    this.ormRepository = getRepository(Repo)
  }

  public async create(repoData: ICreateRepoDTO): Promise<Repo> {
    const repo = this.ormRepository.create(repoData)

    await this.ormRepository.save(repo)

    return repo
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }

  public async listByUserId(user_id: string): Promise<Repo[] | undefined> {
    const repos = await this.ormRepository.find({ where: { user_id } })

    return repos
  }
}
