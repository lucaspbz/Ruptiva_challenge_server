import { uuid } from 'uuidv4'

import ICreateRepoDTO from '@modules/repos/dtos/ICreateRepoDTO'
import Repo from '@modules/repos/infra/typeorm/entities/Repo'
import IRepoRepository from '../IRepoRepository'

export default class FakeRepoRepository implements IRepoRepository {
  private repos: Repo[] = []
  public async create(repoData: ICreateRepoDTO): Promise<Repo> {
    const repo = new Repo()

    Object.assign(repo, { id: uuid(), ...repoData })

    this.repos.push(repo)

    return repo
  }

  public async delete(id: string) {
    const foundIndex = this.repos.findIndex((repo) => repo.id === id)

    this.repos.splice(foundIndex, 1)
  }

  public async listByUserId(user_id: string) {
    const filteredRepos = this.repos.filter((repo) => repo.user_id === user_id)

    return filteredRepos
  }
}
