import {
 Reducer,
 combineReducers
} from 'redux';

import {CategoriesReducer, CategoriesState} from './reducers/categories/categories.reducer';
import {LocationsReducer, LocationsState} from './reducers/locations/locations.reducer';

export * from './reducers/categories/categories.reducer';
export * from './reducers/locations/locations.reducer';

export interface AppState {
    categories: CategoriesState;
    locations: LocationsState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
    categories: CategoriesReducer,
    locations: LocationsReducer,

});

export default rootReducer;
