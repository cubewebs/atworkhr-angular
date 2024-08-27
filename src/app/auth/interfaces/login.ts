import { Office } from '../../features/offices/interfaces/office.interface';
import { User } from '../../features/users/interfaces/user.interface';

export interface Login {
  email: string;
  password: string;
}

export interface LoginResponse extends Office {
  "ok": boolean,
  "token": string,
  "user": User,
  office: Office
}
