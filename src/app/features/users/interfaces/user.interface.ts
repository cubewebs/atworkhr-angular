export interface UsersResponse {
  ok: boolean,
  users: User[]
}

export interface UserResponse {
  ok: boolean,
  user: User
}

export interface User {
  name: string,
  email: string,
  role: string,
  google: boolean,
  uid: string,
}
