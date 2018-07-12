import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wine',
  templateUrl: './wine.component.html',
  styleUrls: ['./wine.component.css']
})
export class WineComponent implements OnInit {

  wines: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/wine').subscribe(data => {
      this.wines = data;
    });
  }
}
