import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  selector: 'app-wine-detail',
  templateUrl: './wine-detail.component.html',
  styleUrls: ['./wine-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WineDetailComponent implements OnInit {
  details: UserDetails;
  wine = {};

  constructor(private router: Router, private route: ActivatedRoute, private auth: AuthenticationService, private http: HttpClient) { }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });

    this.getWineDetail(this.route.snapshot.params['id']);
  }

  getWineDetail(id) {
    this.http.get('/wine/'+id).subscribe(data => {
      this.wine = data;
    });
  }

  addProduct(userID, wineID) {
    this.http.put('/wine/'+ userID + '/' + wineID , {userID}).subscribe(res => {
    }, (err) => {
      console.log(err);
    }
  );
  }
}