import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUserResponseDTO } from '../dtos/IUserResponseDTO';
import { instanceToInstance } from 'class-transformer';

class UserMap {

    static toDTO({ name, avatar, email, id, driver_license, avatar_url }: User): IUserResponseDTO {
        const user = instanceToInstance({
            name,
            avatar,
            email,
            id,
            driver_license,
            avatar_url
        });

        return user;
    }
}

export { UserMap };