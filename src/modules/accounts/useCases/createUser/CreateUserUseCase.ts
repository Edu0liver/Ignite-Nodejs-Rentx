import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { hash } from 'bcrypt';
import { AppError } from "@shared/errors/AppErrors";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({ name, password, email, driver_license }: ICreateUserDTO): Promise<void>{
        const passwordHash = await hash(password, 8)
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if(userAlreadyExists){
            throw new AppError("User already Exists!");
        }

        await this.usersRepository.create({
            name,
            password: passwordHash,
            email, 
            driver_license
        });
    }
}

export { CreateUserUseCase };