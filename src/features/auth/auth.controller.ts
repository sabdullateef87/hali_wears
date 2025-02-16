import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserRequest } from "src/common/models/dto/request/createUserRequest";
import { ApiResponse } from "src/common/models/dto/response/response";
import { UserDetailsResponse } from "src/common/models/dto/response/userResponse";
import { hash } from "src/common/security/encryption.security";
import { AuthService } from "./auth.service";



@Controller("auth")
export class AuthController {

  constructor(private authService: AuthService) { }

  @Get()
  findAll(): string {
    return "Testing auth controller";
  }

  @Post()
  async registerUser(@Body() registrationData: CreateUserRequest): Promise<ApiResponse<UserDetailsResponse>> {

    const hashedPassword = await hash(registrationData.password);
    try {
      const createdUser = await this.authService.createUser({ ...registrationData, password: hashedPassword });
      const apiResponse = new ApiResponse(
        createdUser, 201, "User Created Successfully", [], new Date())
      return apiResponse;
    } catch (error) {

      console.log(error)
      throw error;
    }
  }
}
