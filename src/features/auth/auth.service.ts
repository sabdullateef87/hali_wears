import { Injectable } from "@nestjs/common";
import { UserType } from "src/common/enums/usertype.enum";
import { UserDetailsResponse } from "src/common/models/dto/response/userResponse";
import { CreateUserRequest } from "../../common/models/dto/request/createUserRequest";
import { AuthRepository } from "./auth.repository";

@Injectable()
export class AuthService {

  constructor(private authRepo: AuthRepository) { };

  async createUser(createUserRequest: CreateUserRequest): Promise<UserDetailsResponse> {
    const user = await this.authRepo.createUser(createUserRequest);

    try {
      return new UserDetailsResponse(
        user.id, user.username, user.email, user.firstName, user.lastName, user.phone,
        user.status, user.createdAt, user.updatedAt, UserType[user.userType as keyof UserType]
      );
    } catch (error) {
      throw error;
    }

    


  }
}