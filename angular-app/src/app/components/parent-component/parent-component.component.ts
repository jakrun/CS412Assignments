// src/app/components/parent-component.component.ts
import { Component } from '@angular/core';
//import { DataService } from '../services/data.service';  // Adjust the path as necessary
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  fetchData(query: string): Observable<any> {
    // Ensure the URL is correct and corresponds to your backend setup
    return this.http.get<any>(`http://localhost:3000/api/data?query=${query}`);
  }
}

@Component({
  selector: 'app-parent-component',
  templateUrl: './parent-component.component.html'
})
export class ParentComponent {
  data: any[] = [];  // Initialized as an empty array

  constructor(private dataService: DataService) { }

  // In your ParentComponent or where you are subscribing to the fetchData method

  handleQuery(query: string) {
    this.dataService.fetchData(query).subscribe({
      next: (data: any[]) => { // Explicitly type 'data' as 'any[]' or better yet, as a specific type if known
        this.data = data;
      },
      error: (error: any) => { // Explicitly type 'error' as 'any'
        console.error('There was an error!', error);
      }
    });
  }

}
