import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository{
    
    cars: Car[] = [];
    
    async create({ name, description, license_plate, brand, categoryId, daily_rate, fine_amount, id }: ICreateCarDTO): Promise<Car> {
        const car = new Car();
        
        Object.assign(car, {
            name, 
            description, 
            license_plate, 
            brand, 
            categoryId, 
            daily_rate, 
            fine_amount,
            id
        });
        
        this.cars.push(car);
        
        return car;
    }
    
    async findByLicensePlate(license_plate: string): Promise<Car>{
        return this.cars.find((car)=> car.license_plate === license_plate);
    }
    
    async findAvailable(categoryId?: string, brand?: string, name?: string): Promise<Car[]> {
        const all = this.cars.filter((car)=> {
            if(car.available === true ||
                ((brand && car.brand === brand) ||
                (categoryId && car.categoryId === categoryId) ||
                (name && car.name === name))
                ) {
                    return car;
                }
            return null;
        })
            
        return all;
    }

    async findById(id: string): Promise<Car> {
        const car = this.cars.find((car)=> car.id === id);
        return car;
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        const findIndex = this.cars.findIndex(car=> car.id === id);

        this.cars[findIndex].available = available;
        
        // const car = this.cars.find(car=> car.id === id);
        // car.available = available;
    }
}
    
export { CarsRepositoryInMemory };