import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ProductService } from 'src/app/service/product/product.service';
import { Constants } from 'src/app/shared/constants';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class ProductAddEditComponent implements OnInit {

  @Output()cancelEmitter: EventEmitter<any> = new EventEmitter();
  @Input()product: any;

  form!: FormGroup;
  isAddMode: boolean = true;
  submitted = false;

  PRICE_VALIDATOR: string = '^[1-9][0-9]*(\.[0-9]?[0-9]?)?';
  DISCOUNT_VALIDATOR: string = '^[0-9]*(\.[0-9]?[0-9]?)?';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private productService: ProductService,
  ) { }


  ngOnInit() {
    if (this.product && this.product.id) {
        this.isAddMode = true;
    }

    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.maxLength(250), Validators.required]],
      description: ['', [Validators.maxLength(2500), Validators.required]],
      price: [, [Validators.required, Validators.pattern(this.PRICE_VALIDATOR)]],
      discount: [0, [Validators.required, Validators.pattern(this.DISCOUNT_VALIDATOR)]],
      defaultImage: ['']
    });

    if (this.isAddMode) {
      this.form.patchValue(this.product);
    }
  }

  cancel() {
    this.cancelEmitter.emit(true);
  }

  // convenience getter for easy 
  // access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.spinner.show();
    if (this.isAddMode) {
      this.createProduct();
    } else {
      this.updateProduct();
    }
  }

  private createProduct() {
    this.productService.addProduct(this.form.value)
      .pipe(first())
      .subscribe((data: any) => {
        this.cancel();
      }, err => {
        this.spinner.hide();
      })
      .add(() => this.spinner.hide());
  }

  private updateProduct() {
    this.productService.editProduct(this.product.id, this.form.value)
      .pipe(first())
      .subscribe((data: any) => {
        this.cancel();
      }, err => {
        this.spinner.hide();
      })
      .add(() => this.spinner.hide());
  }
}
