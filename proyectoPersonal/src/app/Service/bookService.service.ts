import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../Models/Book';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  url = 'http://localhost:8080/book'; //conectamos al webService que pone en disposición

  constructor(private http: HttpClient) {} //dependenci injection

  getBooks() {
    return this.http.get<Book[]>(this.url);
  }
}
