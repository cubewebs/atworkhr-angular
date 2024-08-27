import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User, UsersResponse} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient)

  public getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>('http://localhost:3000/api/users', { headers: { 'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NmM0NTZmNTM4MjkyMGVkNDYyOTE5ZjYiLCJpYXQiOjE3MjQxNDMzNDksImV4cCI6MTcyNDIyOTc0OX0.BSo12kd2flJY0jFDL7mhG8nv2D7VY8yhDaNbM3jh3tw'}});
  }

  public getUser(uid: string): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/api/users/${uid}`);
  }
}
