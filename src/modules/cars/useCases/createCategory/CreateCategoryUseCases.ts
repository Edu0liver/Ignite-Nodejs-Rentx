import { inject, injectable } from 'tsyringe';
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from '@shared/errors/AppErrors';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCases {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ){}

    async execute({ name, description }: IRequest): Promise<void> {    
    
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if(categoryAlreadyExists){
        throw new AppError("Category already exists!");
    };

    await this.categoriesRepository.create({name, description});
    }
}

export { CreateCategoryUseCases };