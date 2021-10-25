import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _user: User | undefined;

  get user(): User {
    return { ...this._user! };
  }

  constructor(private http: HttpClient) {}

  verifyAuth(): Observable<boolean> {
    if (!localStorage.getItem('id')) return of(false);
    return this.http.get<User>(`${this.baseUrl}/usuarios/1`).pipe(
      map((user) => {
        this._user = user;
        return true;
      })
    );
  }

  login(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/usuarios/1`).pipe(
      tap((user) => (this._user = user)),
      tap((user) => localStorage.setItem('id', user.id.toString()))
    );
  }

  logout() {
    this._user = undefined;
  }
}
