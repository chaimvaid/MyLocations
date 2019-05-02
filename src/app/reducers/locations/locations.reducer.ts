import { Action } from 'redux';
import * as LocationsActions from './locations.actions';


import {Location} from '../../interfaces/interfaces';

export type LocationsState = Location[];

const initialState: LocationsState = [];

export const LocationsReducer =
  function(state: LocationsState = initialState, action: Action): LocationsState {
  let location;
  let filteredLocation;
  switch (action.type) {
    case LocationsActions.ADD_LOCATION:
        location = (<LocationsActions.AddLocationAction>action).location;
        // Insert random id for simple purpose
        location.id = Math.floor(1000 + Math.random() * 9000);
        return [... state, location];
    case LocationsActions.EDIT_LOCATION:
        location = (<LocationsActions.AddLocationAction>action).location;
        filteredLocation = state.filter((l) => {
            return l.id !== location.id;
        });
        return [... filteredLocation, location];
    case LocationsActions.DELETE_LOCATION:
        const locationId = (<LocationsActions.DeleteLocationAction>action).locationId;
        filteredLocation = state.filter((l) => {
            return l.id !== locationId;
        });
          return filteredLocation;
    default:
      return state;
  }
};

// export const getOrdersState = (state): OrdersState => state.orders;

// export const getCustomer = createSelector(
//   getCustomersState,
//   ( state: CustomersState ) => state.customers );
