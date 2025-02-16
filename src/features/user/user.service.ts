import { Injectable } from '@nestjs/common';
import { UserType } from 'src/common/enums/usertype.enum';
import { CreateUserRequest } from '../../common/models/dto/request/createUserRequest';
import { UserDetailsResponse, UserResponse } from '../../common/models/dto/response/userResponse';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

    constructor(private userRepository: UserRepository) { }

    async createUser(createUserRequest: CreateUserRequest): Promise<UserResponse> {

        createUserRequest.userType = UserType.Basic;
        createUserRequest.createdAt = new Date();

        const user = await this.userRepository.createUser(createUserRequest);
        const name = `${user.firstName} ${user.lastName}`;
        return new UserResponse(user.id, user.email, name);
    }

    async getUserDetails(id: string): Promise<UserDetailsResponse> {

        const user = await this.userRepository.getUserDetails(id);

        return new UserDetailsResponse(
            user.id, user.username, user.email, user.firstName, user.lastName, user.phone,
            user.status, user.createdAt, user.updatedAt, UserType[user.userType as keyof UserType]
        );

    }
}
