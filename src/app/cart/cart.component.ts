import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  details: UserDetails;
  orders:any;

  constructor(private route: ActivatedRoute, private auth: AuthenticationService, private http: HttpClient) {}

  ngOnInit() {
        
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
    this.getCartDetail(this.route.snapshot.params['id'], 'processing');
  }

  getCartDetail(id, state) {
    this.http.get('/order/'+ id + '/' + state).subscribe(data => {
      this.orders = data;
    });
  }
}
