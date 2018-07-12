import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wine-detail',
  templateUrl: './wine-detail.component.html',
  styleUrls: ['./wine-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WineDetailComponent implements OnInit {

  wine = {};

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getWineDetail(this.route.snapshot.params['id']);
  }

  getWineDetail(id) {
    this.http.get('/wine/'+id).subscribe(data => {
      this.wine = data;
    });
  }
}