import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';

interface user {
  id: number;
  user: {
    name: string;
    email: string;
    password: string;
  };
}
interface users extends Array<user> {}
@Injectable({
  providedIn: 'root',
})
export class AppService {
  blurStatus = new Subject<boolean>();
  userLoggedIn = new Subject();
  user: any = null;
  loading = new Subject<boolean>();
  constructor(private http: HttpClient) {}
  getData() {
    return this.http.get('http://localhost:3000/users').pipe(
      map((responseData) => {
        const users = [];
        for (let key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            users.push(responseData[key]);
          }
        }
        return users;
      })
    );
  }
  postUser(user: any) {
    return this.http.post('http://localhost:3000/users', {
      user,
    });
  }
  getLoggedUser(id: number) {
    return this.http.get('http://localhost:3000/users/' + id).pipe(
      map((responseData) => {
        let newArray;
        for (let key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            newArray = responseData;
          }
        }
        return newArray;
      })
    );
  }
}
