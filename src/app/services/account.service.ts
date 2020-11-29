import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Fellow } from '../models/fellow';

@Injectable({ providedIn: 'root' })

export class AccountService {

  private fellowSubject: BehaviorSubject<Fellow>;
  public fellow: Observable<Fellow>;

  constructor(
      private router: Router,
      private http: HttpClient
  ) {
      this.fellowSubject = new BehaviorSubject<Fellow>(JSON.parse(localStorage.getItem('fellow')));
      this.fellow = this.fellowSubject.asObservable();
  }

  public get fellowValue(): Fellow {
    return this.fellowSubject.value;
  }

  login(fellowId, password) {
      return this.http.post<Fellow>(`${environment.apiUrl}/api/login`, { fellowId, password })
          .pipe(map(res => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('fellow', JSON.stringify(res));
              this.fellowSubject.next(res);
              return res;
          }));
  }

  updateStudentAccess(students) {
    return this.http.put(`${environment.apiUrl}/api/updateStudentAccess`, { students : students })
        .pipe(map((res:any) => {
          return res;
        }), catchError(er=>{
          return throwError("Error in API");
        }));
  }

  updateStudentsEvents(insertRows, deleteRows) {
    return this.http.put(`${environment.apiUrl}/api/updateStudentsEvents`, { insertRows : insertRows, deleteRows: deleteRows})
        .pipe(map((res:any) => {
          return res;
        }), catchError(er=>{
          return throwError("Error in API");
        }));
  }

  changePassword(password){
    // const headers = new Headers({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${this.fellowValue.token}`
    // })
    return this.http.post(`${environment.apiUrl}/api/changePassword`, { fellow_id : this.fellowValue.fellow_id ,password })
        .pipe(map((res:any) => {
          // if(res.status==200){
          //   return 'Password changed successfully';
          // }
          // else {
          //   return 'Error in password change';
          // }
          return res;
        }), catchError(er=>{
          return throwError("Error in API");
        }));
  }

  logout() {
      // remove user from local storage and set current user to null
      // localStorage.removeItem('user');
      // this.userSubject.next(null);
      localStorage.removeItem('fellow');
      this.fellowSubject.next(null);
      this.router.navigate(['/account/login']);
  }

  // register(user: User) {
  //     return this.http.post(`${environment.apiUrl}/users/register`, user);
  // }

  // getAll() {
  //     return this.http.get<User[]>(`${environment.apiUrl}/users`);
  // }

  // getById(id: string) {
  //     return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  // }

  // update(id, params) {
  //     return this.http.put(`${environment.apiUrl}/users/${id}`, params)
  //         .pipe(map(x => {
  //             // update stored user if the logged in user updated their own record
  //             if (id == this.userValue.id) {
  //                 // update local storage
  //                 const user = { ...this.userValue, ...params };
  //                 localStorage.setItem('user', JSON.stringify(user));

  //                 // publish updated user to subscribers
  //                 this.userSubject.next(user);
  //             }
  //             return x;
  //         }));
  // }

  // delete(id: string) {
  //     return this.http.delete(`${environment.apiUrl}/users/${id}`)
  //         .pipe(map(x => {
  //             // auto logout if the logged in user deleted their own record
  //             if (id == this.userValue.id) {
  //                 this.logout();
  //             }
  //             return x;
  //         }));
  // }
}
