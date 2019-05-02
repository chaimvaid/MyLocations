import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup,  Validators, FormControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {ValidationServiceService} from '../../services/validation-service.service';
import * as CategoriesActions from '../../reducers/categories/categories.actions';
import {MatSnackBar} from '@angular/material';
import * as Redux from 'redux';
import {
    AppState,
} from '../../app.reducer';
import { AppStore } from '../../app.store';
import * as LocationsActions from '../../reducers/locations/locations.actions';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  constructor(
      @Inject(AppStore) public store: Redux.Store<AppState>,
      private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private vs: ValidationServiceService,
      private snackBar: MatSnackBar,
  ) {
      let category;
      this.route.params.subscribe((params) => {
          if (!params['id']) {
              category = {id: null, name: ''};
          } else {
              category = this.store.getState().categories.find((l) => {
                  return l.id == params['id'];
              });
          }
          this.categoryForm = this.fb.group(
              {
                  id: category.id ,
                  name: [category.name, Validators.required],
              }
          );
      });

  }

  ngOnInit() {
  }

    submit(): void {
        if (this.categoryForm.valid) {
            const formValue = this.categoryForm.value;
            this.store.dispatch(formValue.id ? CategoriesActions.editCategory(this.categoryForm.value)
                : CategoriesActions.addCategory(this.categoryForm.value));
            this.router.navigate(['/categories']);
        } else {
            this.snackBar.open('There Is Required Fields !', null, {
                duration: 2000,
            });
            this.categoryForm.controls['name'].markAsTouched();
        }
    }

}

