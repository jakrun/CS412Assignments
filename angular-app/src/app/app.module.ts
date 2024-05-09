// src/app/app.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app';
  data: any = [];
  isLoading = false;

  constructor(private http: HttpClient) { }

  fetchData() {
    this.isLoading = true;
    this.http.get('/assets/data.json').subscribe(response => {
      this.data = response;
      this.isLoading = false;
    });
  }
}
