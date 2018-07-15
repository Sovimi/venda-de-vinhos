import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  details: UserDetails;
  orders:any;

  constructor(private route: ActivatedRoute, private auth: AuthenticationService, private http: HttpClient) {}

  ngOnInit() {
        
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  
    this.getOrdersDetail(this.route.snapshot.params['id']);
  }

  getOrdersDetail(id) {
    this.http.get('/order/'+ id).subscribe(data => {
      this.orders = data;
    });
  }
}
