import { AppError } from '@shared/errors/AppErrors';
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

interface IRequest {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    categoryId: string;
}

@injectable()
class CreateCarUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ){}

    async execute({ name, description, daily_rate, license_plate, fine_amount, brand, categoryId }: IRequest): Promise<Car>{

        const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate);

        if(carAlreadyExists){
            throw new AppError("Car Already Exists!");
        }

        const car = await this.carsRepository.create({ 
            name, 
            description, 
            daily_rate, 
            license_plate, 
            fine_amount, 
            brand, 
            categoryId 
        });

        return car;
    }
}

export { CreateCarUseCase };