import { Component, Inject } from '@angular/core';
import { AppStore } from './app.store';
import * as Redux from 'redux';
import {
    AppState,
} from './app.reducer';
import throttle from 'lodash/throttle';
import {saveState, loadState} from './reducers/localStorage';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'well-done';
    constructor(@Inject(AppStore) public store: Redux.Store<AppState>) {
        this.store.subscribe(
             throttle(
            () => {
                saveState({
                    categories: this.store.getState().categories,
                    locations: this.store.getState().locations,
                });
            }
             , 1000)
        );

    }
}
