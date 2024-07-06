import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface IRequest {
    name: string;
    email: string;
    password: string;
}
class CreateUserService {
    public async execute({
        name,
        email,
        password,
    }: IRequest): Promise<User | undefined> {
        const usersRepository = getCustomRepository(UsersRepository);

        const emailExists = await usersRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('Email address alredy used.');
        }

        const user = usersRepository.create({
            name,
            email,
            password,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;