import { UserType } from "src/common/enums/usertype.enum"

export class CreateUserRequest {
  id?: string
  username: string
  email: string
  firstName?: string | null
  lastName?: string | null
  phone?: string | null
  status: string
  createdAt?: Date | string
  updatedAt?: Date | string
  userType: UserType
  password: string
}