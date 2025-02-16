import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserRequest } from '../../common/models/dto/request/createUserRequest';
import { ApiResponse } from '../../common/models/dto/response/response';
import { UserDetailsResponse, UserResponse } from '../../common/models/dto/response/userResponse';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Post("")
    async createUser(@Body() createUserRequest: CreateUserRequest): Promise<ApiResponse<UserResponse>> {
        const user = await this.userService.createUser(createUserRequest);
        const userResponse = new UserResponse(user.id, user.email, user.name);
        const apiResponse = new ApiResponse(
            userResponse, 201, "User Created Successfully", [], new Date())
        return apiResponse;
    }

    @Get(":id")
    async updateUserDetails(@Param("id") id: string): Promise<ApiResponse<UserDetailsResponse>> {
        const user = await this.userService.getUserDetails(id);
        const apiResponse = new ApiResponse(
            user, 201, "User Retrieved Successfully", [], new Date())
        return apiResponse;
    }

}
