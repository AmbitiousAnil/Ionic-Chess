import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpAuthService {

  apiUrl = 'http://localhost:9000/';

  constructor(private http: HttpClient) { }

  login (data): Observable<any> {

    console.log("login data");
    console.log(data);
    
    let username = data.username;
    let password = data.password;

    username='abc';
    password='1233';
  
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) ,});
    
    return this.http.get(this.apiUrl + 'user/login',{headers})
  }

  signUp(user: Object): Observable<Object> {
    return this.http.post(`${this.apiUrl}` + `user/registerUser`, user);
  }
  

  logout (): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'signout')
      .pipe(
        tap(_ => this.log('logout')),
        catchError(this.handleError('logout', []))
      );
  }

  getTransactions (userId): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('abc' + ':' + '1233') });
    return this.http.get(this.apiUrl + `transactions/${userId}`,{headers});
  }

  getUserGamesHistory(userId): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('abc' + ':' + '1233') });
    return this.http.get(this.apiUrl + `games/${userId}`,{headers});
  }

  getChallenges(userId): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('abc' + ':' + '1233') });
    return this.http.get(this.apiUrl + `challenges/${userId}`,{headers});
  }

  getUserDetails(userName): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('abc' + ':' + '1233') });
    return this.http.get(this.apiUrl + `${userName}/details`,{headers});
  }

  

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}