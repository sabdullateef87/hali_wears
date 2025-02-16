import { UserType } from "src/common/enums/usertype.enum";

export class UserResponse {
  id: string;
  email: string;
  name?: string
  constructor(id: string, email: string, name?: string) {
    this.id = id;
    this.email = email;
    this.name = name;
  }
}

export class UserDetailsResponse {
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

  constructor(
    id: string | undefined,
    username: string,
    email: string,
    firstName: string | null | undefined,
    lastName: string | null | undefined,
    phone: string | null | undefined,
    status: string,
    createdAt: Date | string | undefined,
    updatedAt: Date | string | undefined,
    userType: UserType
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.firstName = firstName ?? null;
    this.lastName = lastName ?? null;
    this.phone = phone ?? null;
    this.status = status;
    this.createdAt = createdAt || new Date().toISOString();
    this.updatedAt = updatedAt || new Date().toISOString();
    this.userType = userType;
  }
}