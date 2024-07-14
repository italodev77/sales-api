import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
class UsersTokensRepository extends Repository<UserToken> {
    public async findByToekn(token: string): Promise<UserToken | undefined> {
        const userToken = await this.findOne({
            where: {
                token,
            },
        });
        return userToken;
    }
    public async generete(user_id: string): Promise<UserToken | undefined> {
        const userToken = await this.create({
            user_id,
        });

        await this.save(userToken);

        return userToken;
    }
}

export default UsersTokensRepository;