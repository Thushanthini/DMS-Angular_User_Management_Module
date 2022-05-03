import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  readonly userAPIUrl = "https://localhost:7085/api";

  constructor(private http:HttpClient) { }

  getUserList():Observable<any[]> {
    return this.http.get<any>(this.userAPIUrl + '/users');
  }

  addUser(data:any) {
    return this.http.post(this.userAPIUrl + '/users', data);
  }

  updateUser(id:number|string, data:any) {
    return this.http.put(this.userAPIUrl + `/users/${id}`, data);
  }

  deleteUser(id:number|string) {
    return this.http.delete(this.userAPIUrl + `/users/${id}`);
  }

}
