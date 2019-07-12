import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private loginSubject = new Subject<any>();

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    
    login(email:string, password:string) {
        return this.http.post<any>(`http://localhost:3000/users/login`, {email, password}).pipe(tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
    }))
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    register(name:string, email:string, password:string) {
        return this.http.post<any>('http://localhost:3000/users', {name, email, password}).pipe(tap(user => {
        this.login(email, password);
    }))
    }

    getLoginPublisher(){
        return this.loginSubject;
    }
    
    getLoginSubscriber(){
      return this.loginSubject.asObservable();
    }

}