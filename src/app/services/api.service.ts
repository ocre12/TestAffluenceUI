import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {}

  async checkDateTime(dateTime: string): Promise<any> {
    return await lastValueFrom(
      this.http.get(`http://localhost:8080/resource/1337/available?datetime=${dateTime}`)
    );
  }
}
