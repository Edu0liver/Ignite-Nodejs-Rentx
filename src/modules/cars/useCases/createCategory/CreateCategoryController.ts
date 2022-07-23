import { Request, Response } from 'express';
import { CreateCategoryUseCases } from './CreateCategoryUseCases';
import { container } from 'tsyringe';

class CreateCategoryController {
    
    async handle( request: Request, response: Response): Promise<Response>{
        const { name, description } = request.body;
        const createCategoryUseCases = container.resolve(CreateCategoryUseCases);
    
        await createCategoryUseCases.execute({ name, description });
    
        return response.status(201).send();    
    }
}

export { CreateCategoryController };