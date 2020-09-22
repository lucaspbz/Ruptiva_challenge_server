import { inject, injectable } from 'tsyringe'
import ICreateRepoDTO from '../dtos/ICreateRepoDTO'
import IRepoRepository from '../repositories/IRepoRepository'

@injectable()
export default class CreateReposService {
  constructor(
    @inject('ReposRepository')
    private reposRepository: IRepoRepository
  ) {}

  public async execute({ title, url, user_id }: ICreateRepoDTO) {
    const repo = await this.reposRepository.create({ user_id, url, title })

    return repo
  }
}
