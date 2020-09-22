import { inject, injectable } from 'tsyringe'
import IRepoRepository from '../repositories/IRepoRepository'

@injectable()
export default class DeleteRepoService {
  constructor(
    @inject('ReposRepository')
    private reposRepository: IRepoRepository
  ) {}
  public async execute(id: string) {
    await this.reposRepository.delete(id)
  }
}
