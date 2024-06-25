import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  api = 'https://jsonplaceholder.typicode.com/todos';
  getData() {
    return this.http.get(this.api);
  }
}
