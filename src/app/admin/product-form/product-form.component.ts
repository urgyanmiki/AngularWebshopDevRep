import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators, FormGroup } from "@angular/forms";
import { NewproductService} from './newproduct.service';
import { Product } from "./product.model";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  imagePreview: string;
  private products: Product[] = [];
  
  constructor(private service: NewproductService) { }

  save(product){
    console.log(product);
    this.service.addProduct(product);
    ///form.resetForm();
  }
  
  imagePicked(event: Event) {
    console.log('woow');
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get("image").updateValueAndValidity();
    /*const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);*/
  }

  ngOnInit() {
    image: new FormControl(null);
  }

}
///name,gender,type,price,quantity,description