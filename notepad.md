model User {
  id          String    @id @default(cuid()) // Unique identifier for the user
  username    String    @unique
  email       String    @unique
  firstName   String
  lastName    String
  phone       String?
  status      UserStatus @default(ACTIVE)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  userTypeId  String
  userType    UserType  @relation(fields: [userTypeId], references: [id])
  roles       UserRole[]
  permissions UserPermission[]
  subscription Subscription?
}

model UserType {
  id          String   @id @default(cuid())
  name        String   @unique
  description String?
  users       User[]
}

model Role {
  id          String       @id @default(cuid())
  name        String       @unique
  description String?
  permissions RolePermission[]
  users       UserRole[]
}

model Permission {
  id          String       @id @default(cuid())
  name        String       @unique
  description String?
  roles       RolePermission[]
  users       UserPermission[]
}

model Subscription {
  id          String   @id @default(cuid())
  type        String   // e.g., FREE, BASIC, PREMIUM
  startDate   DateTime
  endDate     DateTime?
  status      SubscriptionStatus @default(ACTIVE)
  features    String[] // JSON array of features (can be normalized if needed)
  userId      String 
  user        User     @relation(fields: [userId], references: [id])
}

model UserRole {
  id      String @id @default(cuid())
  userId  String
  roleId  String
  user    User   @relation(fields: [userId], references: [id])
  role    Role   @relation(fields: [roleId], references: [id])
}

model UserPermission {
  id          String       @id @default(cuid())
  userId      String
  permissionId String
  user        User         @relation(fields: [userId], references: [id])
  permission  Permission   @relation(fields: [permissionId], references: [id])
}

model RolePermission {
  id          String       @id @default(cuid())
  roleId      String
  permissionId String
  role        Role         @relation(fields: [roleId], references: [id])
  permission  Permission   @relation(fields: [permissionId], references: [id])
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}

enum SubscriptionStatus {
  ACTIVE
  CANCELLED
  EXPIRED
}


## Sample Folder Structure 

src/
├── auth/                      # Authentication module
│   ├── controllers/           # Handle HTTP requests
│   │   └── auth.controller.ts # Login, registration, token generation
│   ├── services/              # Business logic related to authentication
│   │   └── auth.service.ts    # JWT handling, password hashing
│   ├── strategies/            # Authentication strategies
│   │   ├── jwt.strategy.ts    # JWT verification strategy
│   │   └── local.strategy.ts  # Username/password validation strategy
│   ├── middleware/            # Middleware for auth (e.g., token validation)
│   │   └── auth.middleware.ts
│   ├── guards/                # Route protection guards
│   │   └── auth.guard.ts
│   └── dtos/                  # Data Transfer Objects for auth
│       └── login.dto.ts       # Login payload validation
├── users/                     # User management module
│   ├── controllers/           # Handle user-related HTTP requests
│   │   └── user.controller.ts # Create, update, delete, assign roles
│   ├── services/              # Business logic for user management
│   │   └── user.service.ts    # Manage roles, permissions, etc.
│   ├── repositories/          # Data access layer for users
│   │   └── user.repository.ts # User database queries
│   ├── entities/              # Database entities or models
│   │   └── user.entity.ts     # User schema/model definition
│   ├── dtos/                  # Data Transfer Objects for users
│   │   └── create-user.dto.ts # Payload for creating a user
│   ├── roles/                 # Role and permission management
│   │   ├── role.entity.ts     # Role schema/model
│   │   └── role.service.ts    # Manage role-based access
│   ├── permissions/           # Permission management
│   │   ├── permission.entity.ts # Permission schema/model
│   │   └── permission.service.ts # Assign/revoke permissions
│   └── validators/            # Input validation for users
│       └── user.validator.ts
├── common/                    # Shared resources across modules
│   ├── utils/                 # Utility functions (e.g., hashing, token generation)
│   │   ├── hash.util.ts
│   │   └── token.util.ts
│   ├── constants/             # Shared constants
│   │   ├── auth.constants.ts
│   │   └── user.constants.ts
│   ├── exceptions/            # Custom error handling
│   │   └── auth-exception.filter.ts
│   ├── interceptors/          # Intercept requests/responses globally
│   └── decorators/            # Custom decorators for route guards, etc.
│       └── roles.decorator.ts
├── config/                    # Configuration files
│   ├── auth.config.ts         # Authentication-related configurations (e.g., secret keys)
│   └── database.config.ts     # Database configurations
└── main.ts                    # Application entry point



The **auth module** and **user module** have distinct responsibilities in a system, following the principle of **separation of concerns**. Here’s a detailed breakdown of what each does:

---

### **Auth Module**
The **auth module** handles **authentication**, i.e., validating a user's identity and managing access to the system. Its main focus is to determine **who** is accessing the system and whether their access is valid.

#### **Responsibilities:**
1. **User Login:**
   - Validate user credentials (username/email and password).
   - Generate and return tokens (e.g., JWT, OAuth tokens).

2. **Token Management:**
   - Issue, validate, and refresh tokens.
   - Handle token expiration and renewal (e.g., refresh tokens).

3. **Access Control:**
   - Middleware or guards to ensure that only authenticated users access protected resources.

4. **Password Management:**
   - Hash and verify passwords securely (e.g., using bcrypt or Argon2).
   - Handle password reset requests.

5. **Authentication Strategies:**
   - Support for multiple authentication mechanisms:
     - JWT-based authentication.
     - OAuth2 (e.g., Google, Facebook, etc.).
     - API keys for third-party integrations.

6. **Session Management (Optional):**
   - Handle user sessions in server-side applications.

7. **Logout:**
   - Invalidate tokens or sessions during logout.

#### **Key Features in Code:**
- **Login API** (`POST /auth/login`)
- **Logout API** (`POST /auth/logout`)
- **Token Validation Middleware**
- **Password Reset API** (`POST /auth/reset-password`)

#### **Example Responsibilities in Context:**
- **Auth Module Tasks:**
  - Check if the user's email/password combination is correct.
  - Generate a JWT containing the user's ID and roles.
  - Middleware validates incoming requests to ensure the JWT is valid.

---

### **User Module**
The **user module** handles **user management**, i.e., managing user-related data, profiles, roles, and permissions. Its main focus is to manage **what** a user can do within the system.

#### **Responsibilities:**
1. **User Profiles:**
   - Create, read, update, and delete user information.
   - Manage profile details (e.g., name, email, phone, address).

2. **Roles and Permissions:**
   - Assign and revoke roles (e.g., Admin, Editor, Viewer).
   - Define and enforce permissions tied to roles.
   - Manage role-based access control (RBAC).

3. **User CRUD Operations:**
   - Administer users (e.g., create, deactivate, or delete users).
   - Search and list users (e.g., `GET /users`).

4. **Subscription Management (Optional):**
   - Manage subscription plans for users (e.g., Free, Premium).

5. **Data Access Layer:**
   - Interact with the database to store and retrieve user information.

6. **Validators:**
   - Ensure that user data is validated during creation and updates (e.g., email format, password strength).

#### **Key Features in Code:**
- **User Registration API** (`POST /users`)
- **User Update API** (`PATCH /users/:id`)
- **Role Management APIs** (`POST /users/:id/roles`)
- **Permission Management APIs** (`POST /users/:id/permissions`)

#### **Example Responsibilities in Context:**
- **User Module Tasks:**
  - Store and retrieve user data in the database.
  - Provide APIs to create or edit user profiles.
  - Assign and manage roles and permissions for users.

---

### **Summary of Key Differences**

| Feature                  | **Auth Module**                                      | **User Module**                                        |
| ------------------------ | ---------------------------------------------------- | ------------------------------------------------------ |
| **Focus**                | Authentication: Verify user identity.                | User Management: Manage user-related data.             |
| **Primary Purpose**      | "Who are you?"                                       | "What can you do?"                                     |
| **Key Functions**        | Login, token generation, logout, session management. | CRUD operations, role/permission management.           |
| **Validation**           | Validate credentials and tokens.                     | Validate user data (e.g., email, password strength).   |
| **Database Interaction** | Minimal: Usually just checks user credentials.       | Extensive: Handles user profiles, roles, permissions.  |
| **APIs**                 | `/auth/login`, `/auth/refresh-token`, `/auth/logout` | `/users`, `/users/:id/roles`, `/users/:id/permissions` |

---

### **How They Work Together**
1. **Auth Module:**
   - Handles authentication (e.g., login and token validation).
   - Issues tokens containing user IDs and roles after successful login.

2. **User Module:**
   - Manages user data and roles.
   - When a user logs in, the auth module fetches user information (like roles) from the user module/database.
   - Role and permission assignments in the user module influence what a user can access after authentication.

---

By separating these concerns into distinct modules, you ensure a clear boundary between **auth logic** and **user management logic**, making your application more maintainable and scalable.