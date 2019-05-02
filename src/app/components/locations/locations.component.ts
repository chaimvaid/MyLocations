import {Component, Inject, OnInit} from '@angular/core';
import * as Redux from 'redux';
import {
    AppState,
} from '../../app.reducer';
import { AppStore } from '../../app.store';
import * as LocationsActions from '../../reducers/locations/locations.actions';
import {Location} from '../../interfaces/interfaces';
@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  sortTypes = ['Not Grouped', 'Grouped by Category'];
  sortType: number;
  sortedLocation: Location[];
  filterBy: number[] = [];
  constructor(@Inject(AppStore) public store: Redux.Store<AppState>) {
      this.sortedLocation = this.store.getState().locations.slice().sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
  }

  ngOnInit() {
  }

  delete(locationId): void {
    this.store.dispatch(LocationsActions.deleteLocation(locationId));
  }

  displayCategories(location: Location): string {
    return this.store.getState().categories.filter((c) => {
      return location.categories.indexOf(c.id) >= 0;
    }).map(c => c.name).join(',');
  }

  locations(): Location[] {
    let locations;
    switch (this.sortType) {
        case 1:
            const groupedArray = []
            this.store.getState().categories.forEach((c) => {
                this.sortedLocation.filter(l => l.categories.indexOf(c.id) >= 0).reduce((arr, location) => {
                arr.push(location);
                return arr;
              }, groupedArray);
            });
            locations =  groupedArray;
            break
        default:
            locations = this.sortedLocation;
    }
    if (this.filterBy.length > 0) {
      return locations.filter( (l) => {
        for (const i in this.filterBy) {
          if (l.categories.indexOf(this.filterBy[i]) >= 0) {
            return true;
          }
        }
      });
    } else {
      return locations;
    }

  }

  setSortType(i: number): void {
    this.sortType = i;
  }

  filter(e): void {
    this.filterBy = e.value;
  }
}
