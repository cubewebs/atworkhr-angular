import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginResponse} from "../interfaces/login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ENDPOINT = environment.API_ENDPOINT;

  private http = inject(HttpClient);

  public loginUser(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.ENDPOINT}/auth/login`, {email, password})
  }

}
