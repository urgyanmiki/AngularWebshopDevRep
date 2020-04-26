import { Component, OnInit } from '@angular/core';
import { Product } from "src/app/admin/product-form/product.model";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import {ProductmanageService} from './productmanage.service';
@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  private prodSub: Subscription;

  constructor(public productmanagement: ProductmanageService,config: NgbModalConfig, private modalService: NgbModal ) { }

  onDelete(id: string){
    this.productmanagement.deleteProduct(id);
    console.log(id);
  }

  openModal(content,id){
    this.modalService.open(content,id);
    this.productmanagement.findOne(id);
    console.log(id);
    //updatebyid(form)
  }
  saveEditedProduct(product){
    
    console.log("called");
  }

  ngOnInit() {
    this.productmanagement.getProducts();
    this.prodSub = this.productmanagement.getProductUpdateListener().subscribe((products: Product[])=>{
      this.products=products;
    })
  }

}
