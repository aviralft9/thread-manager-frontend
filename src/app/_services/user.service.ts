import { Thread } from './../_models/thread';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`localhost:3000/users`);
    }
    addNewThread(title:string, description:string, tags:string[]){
        return this.http.post<any>('http://localhost:3000/threads', {title, description, tags}).subscribe(
            data  => {
            console.log("POST Request is successful ", data);
            },
            error  => {console.log("Error", error);});
            
    }

    getOwnerName(){
       return this.http.get<User>('http://localhost:3000/users/me');
      }

    getAllThreads(){
        return this.http.get('http://localhost:3000/threads');
    }

}