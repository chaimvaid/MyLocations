import {Component, Inject, OnInit} from '@angular/core';
import * as Redux from 'redux';
import {
    AppState,
} from '../../app.reducer';
import { AppStore } from '../../app.store';
import * as CategoriesActions from '../../reducers/categories/categories.actions';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(
      @Inject(AppStore) public store: Redux.Store<AppState>,
      private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

    delete(categoryId): void {
      if (this.store.getState().locations.filter(l => l.categories.indexOf(categoryId) >= 0).length > 0) {
          this.snackBar.open('You can\' delete related category !', null, {
              duration: 2000,
          });
          return;
      }
        this.store.dispatch(CategoriesActions.deleteCategory(categoryId));
    }

}
