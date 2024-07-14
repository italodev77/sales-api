import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import UsersTokensRepository from '../typeorm/repositories/UsersTokensRepository';

interface IRequest {
    email: string;
}
class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);

        const userTokensRepository = getCustomRepository(UsersTokensRepository);

        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exists.');
        }

        const token = await userTokensRepository.generete(user.id);

        console.log(token);
    }
}

export default SendForgotPasswordEmailService;
