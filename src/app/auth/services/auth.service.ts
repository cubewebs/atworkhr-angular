import {inject, Injectable, signal} from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {LoginResponse} from "../interfaces/login";
import {Register} from "../interfaces/register";
import {User} from "../../features/users/interfaces/user.interface";
import {Office} from "../../features/offices/interfaces/office.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ENDPOINT = environment.API_ENDPOINT;

  private http = inject(HttpClient);

  activeUser = signal<LoginResponse>({} as LoginResponse);

  public loginUser(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.ENDPOINT}/auth/login`, {email, password}).pipe(
      tap(res => {
        console.log(res.user.uid)
        this.activeUser.set(res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('id', res.user.uid);
      })
    )
  }

  public registerUser(name: string, email: string, password: string, role: string): Observable<Register> {
    console.log(role)
    return this.http.post<Register>(`${this.ENDPOINT}/users`, {name, email, password, role})
  }

  public logoutUser(): void {
    localStorage.clear();
  }

  public getActiveUser(): LoginResponse {
    return this.activeUser()
  }

}
