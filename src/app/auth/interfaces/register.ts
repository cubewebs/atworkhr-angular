import {User} from "../../features/users/interfaces/user.interface";
import {Office} from "../../features/offices/interfaces/office.interface";

export interface Register {
  name: string,
  email: string,
  password: string,
  role: string,
  user: User,
  office: Office
}
