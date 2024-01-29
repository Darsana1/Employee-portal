import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSchema } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UserapiService {
SERVER_URL = "https://employee-portal-server-6463.onrender.com"
  constructor(private http:HttpClient) { }
  //adduser api
  addUserAPI(user:UserSchema){
    return this.http.post(`${this.SERVER_URL}/users`,user)
  }
  //getball user
  getAllUserAPI(){
    return this.http.get(`${this.SERVER_URL}/users`)
  }
  //deleteuser
  deleteUserAPI(id:string){
    return this.http.delete(`${this.SERVER_URL}/users/${id}`)
  }
  viewUserAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/users/${id}`)
  }
  updateUserAPI(id:any,user:UserSchema){
    return this.http.put(`${this.SERVER_URL}/users/${id}`,user)
  }
}
