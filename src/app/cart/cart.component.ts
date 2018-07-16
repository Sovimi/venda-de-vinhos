import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  details: UserDetails;
  order = {};
  product = {}
  total = 0;

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthenticationService, private http: HttpClient) {}

  ngOnInit() {
    let total = 0;

    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
    
    this.getCartDetail(this.route.snapshot.params['id'], 'processing');
  }

  setTotal(productPrice, productQuantity){
    this.total += productPrice * productQuantity;
    return 0;
  }

  getCartDetail(id, state) {
    this.http.get('/order/'+ id + '/' + state).subscribe(data => {
      this.order = data;
    });
  }

  incProductQuantity(userID, id, wineID, quantity){
    console.log(quantity);
    quantity = quantity + 1;
    this.updateProductQuantity(userID, id, wineID, quantity);
  }

  decProductQuantity(userID, id, wineID, quantity){
    if (quantity > 1) {
      quantity = quantity - 1;      
      this.updateProductQuantity(userID, id, wineID, quantity);
    }
    else {
      this.deleteProduct(userID, id, wineID);
    }
  }

  updateProductQuantity(userID, id, wineID, data) {
    this.http.put('/order/'+ id + '/' + wineID + '/' + data, {})
      .subscribe(res => {
        this.getCartDetail(userID, 'processing');
      }, (err) => {
        console.log(err);
      }
    );
  }

  deleteProduct(userID, id, wineID) {
    this.http.put('/order/'+ id + '/' + wineID, wineID)
      .subscribe(res => {
        this.getCartDetail(userID, 'processing');
        }, (err) => {
          console.log(err);
        }
      );
  }

  updateTotalPrice(id, userID){
    this.http.put('/order/'+ id + '/' + this.total, {})
      .subscribe(res => {
        this.getCartDetail(userID, 'processing');
        return res;
      }, (err) => {
        console.log(err);
      }
    );

  }

  deleteOrder(id, userID) {
    this.http.delete('/order/'+id)
    .subscribe(res => {
        this.newOrder(userID);
        this.router.navigate(['/wines']);
      }, (err) => {
        console.log(err);
      }
    );
  }

  completeOrder(id, userID) {
    this.http.put('/order/'+ id, this.order)
      .subscribe(res => {
          this.newOrder(userID);
          this.router.navigate(['/wines']);
        }, (err) => {
          console.log(err);
        }
      );
  }

  newOrder(userID) {
    this.http.post('/order', {'userID': userID, 'state': 'processing', 'total': 0})
      .subscribe(res => {
        }, (err) => {
          console.log(err);
        }
      );
  }
}
