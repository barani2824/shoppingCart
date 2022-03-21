import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { User } from '../../components/user/model/user.model';
import { modules } from 'src/config/module';
import { Constants } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.baseUrl + modules.users.list).pipe(
      map(users => users.map(user => new User(user)))
    );
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(environment.baseUrl + modules.users.detail
      .replace(Constants.USER_ROUTE_PARAM_USER_ID, JSON.stringify(userId))).pipe(
        map(user => new User(user))
      );
  }
}
