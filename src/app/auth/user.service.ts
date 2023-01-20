import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiHttpServer } from 'src/url';

import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn: boolean = Boolean(localStorage.getItem('loggedIn'));

  get isLoggedIn() {
    return this.loggedIn;
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  login(user: User) {
    if (user.accountId.trim().length > 0 && user.password.trim().length > 0) {
      const test1 = this.http.post(`${apiHttpServer}/accounts/signin`, user)
        .pipe(
          catchError(this.handleError<any>('login', []))
        )
      test1.subscribe(x => {
        // console.log(x)
        if (x.result) {
          localStorage.setItem('id', x.data._id)
          localStorage.setItem('agencyId', x.data.agencyId)
          localStorage.setItem('loggedIn', "true")
          // this.loggedIn = true;
          if (x.data.hospitalId) {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/crm']);
          }
        } else {
          alert("계정을 확인해주세요.");
        }
      })
    }
  }

  logout() {
    localStorage.clear();
    // this.loggedIn = false;
    this.router.navigate(['/auth/login']);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: 리모트 서버로 에러 메시지 보내기
      console.error(error); // 지금 콘솔에 로그를 출력


      // TODO: 사용자가 이해할 수 있는 형태로 변환하기
      console.log(`${operation} failed: ${error.message}`);

      // alert("로그인실패")

      return of(result as T)
    }
  }
}
