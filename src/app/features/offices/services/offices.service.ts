import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Office, OfficeResponse} from "../interfaces/office.interface";
import {environment} from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class OfficesService {
  private ENDPOINT = environment.API_ENDPOINT
  private http = inject(HttpClient)

  public getOffices(): Observable<Office[]> {
    return this.http.get<OfficeResponse>(`${this.ENDPOINT}/offices`).pipe(
      map(res => {
        const offices: Office[] = [];
        res.offices.forEach((office: Office) => {

          offices.push({
            uid: office.uid,
            name: office.name,
            code: office.code,
            // @ts-ignore
            user: office.user.name
          })
        });
        return [...offices]
      })
    )
  }
}
