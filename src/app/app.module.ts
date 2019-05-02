import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    AppStore,
    appStoreProviders
} from './app.store';

import {
    RouterModule,
    Routes
} from '@angular/router';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { LocationsComponent } from './components/locations/locations.component';
import {
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    MatRadioModule,
    MatSnackBarModule,
} from '@angular/material';
import { LocationFormComponent } from './components/location-form/location-form.component';


export const routes: Routes = [
// basic routes
    {
        path: '', redirectTo: 'locations', pathMatch: 'full', data: {
            name: ''
        }
    },
    {
        path: 'categories', component: CategoriesComponent, data: {
            name: ''
        }
    },
    {
        path: 'locations', component: LocationsComponent, data: {
            name: ''
        }
    },
    {
        path: 'category-form', component: CategoryFormComponent, data: {
            name: ''
        }
    },
    {
        path: 'location-form', component: LocationFormComponent, data: {
            name: ''
        }
    },
    {
        path: 'category-form/:id', component: CategoryFormComponent, data: {
            name: ''
        }
    },
    {
        path: 'location-form/:id', component: LocationFormComponent, data: {
            name: ''
        }
    },

]
@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    CategoryFormComponent,
    LocationsComponent,
    LocationFormComponent
  ],
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {
      // initialNavigation: false // the propery to delay navigation
    }),
  ],
  providers: [appStoreProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
