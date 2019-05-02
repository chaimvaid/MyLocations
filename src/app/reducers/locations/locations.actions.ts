import {
  Action,
  ActionCreator
} from 'redux';
import {
  Location
} from '../../interfaces/interfaces';


export const ADD_LOCATION = '[Location] Add Location';
export interface AddLocationAction extends Action {
  location: Location;
}
export const addLocation: ActionCreator<AddLocationAction> =
  (location) => ({
    type: ADD_LOCATION,
    location: location
  });

export const EDIT_LOCATION = '[Location] Edit Location';
export interface EditLocationAction extends Action {
    location: Location;
}
export const editLocation: ActionCreator<EditLocationAction> =
    (location) => ({
        type: EDIT_LOCATION,
        location: location
    })


export const DELETE_LOCATION = '[Location] Delete Location';
export interface DeleteLocationAction extends Action {
    locationId: number;
}
export const deleteLocation: ActionCreator<DeleteLocationAction> =
    (locationId) => ({
        type: DELETE_LOCATION,
        locationId: locationId
    })



