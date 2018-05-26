import { Injectable } from '@angular/core';
import { Adult } from './adult';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AdultService {

	private Url = 'http://127.0.0.1:8000/';
	details: Adult [];
	sex: any[];
	relationship: any[];
	relationships: any[];
	race: any[];
	
	constructor(private http: HttpClient) { }

		getDetails(): Observable<Adult[]> {
		return this.http.get<Adult[]>(this.Url, httpOptions)
		.pipe(
		tap(adults => {console.log('recieved data Successfully!') ; this.details = adults ; }),
		catchError(this.handleError('getDetails', []))
		);
	}

	getSexDetails(): Observable<Adult[]> {
		return this.http.get<Adult[]>(this.Url + 'sex', httpOptions)
		.pipe(
		tap(sex => {console.log('recieved Male & Female count Successfully!') ; this.sex = sex; }),
		catchError(this.handleError('getDetails', []))
		);
	}

	getRelDetails(): Observable<Adult[]> {
		return this.http.get<Adult[]>(this.Url + 'rel', httpOptions)
		.pipe(
		tap(relationship => {console.log('recieved Relationships Successfully!') ; this.relationship = relationship; }),
		catchError(this.handleError('getDetails', []))
		);
	}

	getRaceDetails(): Observable<Adult[]> {
		return this.http.get<Adult[]>(this.Url + 'race', httpOptions)
		.pipe(
		tap(race => {console.log('recieved Race Successfully!') ; this.race = race; }),
		catchError(this.handleError('getDetails', []))
		);
	}

	getDetailsObject(): Adult[] {
		return this.details;
	}
	
	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T> (operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {

		// TODO: send the error to remote logging infrastructure
		console.error(error); // log to console instead

		// TODO: better job of transforming error for user consumption
		console.error(`${operation} failed: ${error.message}`);

		// Let the app keep running by returning an empty result.
		return of(result as T);
	  };
	}
}
