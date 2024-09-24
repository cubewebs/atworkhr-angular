import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {User, UserResponse, UsersResponse} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient)
  private _user = signal<User>({name: '', email: '', role: '', google: false, uid: ''})

  public getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>('http://localhost:3000/api/users', { headers: { 'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NmM0NTZmNTM4MjkyMGVkNDYyOTE5ZjYiLCJpYXQiOjE3MjQxNDMzNDksImV4cCI6MTcyNDIyOTc0OX0.BSo12kd2flJY0jFDL7mhG8nv2D7VY8yhDaNbM3jh3tw'}});
  }

  public getUser(uid: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`http://localhost:3000/api/users/${uid}`).pipe(
      tap(res => this._user.set(res.user))
    )
  }

  get user() {
    return this._user();
  }

  public deleteUser(uid: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/users/${uid}`).pipe(
      tap(res => console.info(res))
    )
  }

  public editUser(uid: string, user: User): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/api/users/${uid}`, user).pipe(
      tap(res => console.info(res))
    )
  }
}
