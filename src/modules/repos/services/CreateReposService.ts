import { inject, injectable } from 'tsyringe'
import ICreateRepoDTO from '../dtos/ICreateRepoDTO'
import IRepoRepository from '../repositories/IRepoRepository'

@injectable()
export default class CreateReposService {
  constructor(
    @inject('ReposRepository')
    private reposRepository: IRepoRepository
  ) { }

  public async execute(repoData: ICreateRepoDTO) {
    const repo = await this.reposRepository.create(repoData)

    return repo
  }
}
