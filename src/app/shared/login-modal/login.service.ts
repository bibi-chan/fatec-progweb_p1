import { Login } from './login';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  url = 'http://localhost:3000/login'; // api rest fake
  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  usuario: Login[] = [];

  // salva um usuario
  addUser(user: Login): Observable<Login> {
    return this.httpClient
      .post<Login>(this.url, JSON.stringify(user), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

    // Obtem todos os usuarios
    getUser(): Observable<Login[]> {
      return this.httpClient.get<Login[]>(this.url)
        .pipe(
          retry(2),
          catchError(this.handleError));
    }

      // Obtem um usuario pelo id
  getUserById(id: number): Observable<Login> {
    return this.httpClient.get<Login>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateUser(user: Login): Observable<Login> {
    return this.httpClient.put<Login>(this.url + '/' + user.id, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // deleta um user
  deleteUser(user: Login) {
    return this.httpClient.delete<Login>(this.url + '/' + user.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
