import { ensuredAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { Router } from 'express';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post("/", ensuredAuthenticated, createRentalController.handle);
rentalsRoutes.post("/devolution/:id", ensuredAuthenticated, devolutionRentalController.handle);
rentalsRoutes.get("/user", ensuredAuthenticated, listRentalsByUserController.handle);

export { rentalsRoutes };