import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderDetailComponent implements OnInit {
  order = {};

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getOrderDetail(this.route.snapshot.params['id']);
  }

  getOrderDetail(id) {
    this.http.get('/order/'+id).subscribe(data => {
      this.order = data;
    });
  }


}
