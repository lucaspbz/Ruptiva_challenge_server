import { inject, injectable } from "tsyringe";
import Repo from "../infra/typeorm/entities/Repo";
import IRepoRepository from "../repositories/IRepoRepository";

@injectable()
export default class ListUsersReposService {
    constructor(
        @inject('ReposRepository')
        private repoRepository: IRepoRepository
    ) { }
    public async execute(id: string): Promise<Repo[] | undefined> {
        const repos = await this.repoRepository.listByUserId(id)

        return repos
    }
}