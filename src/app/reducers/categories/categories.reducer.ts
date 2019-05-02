import { Action } from 'redux';
import * as CategoryActions from './categories.actions';


import {Category} from '../../interfaces/interfaces';


export type CategoriesState = Category[];

const initialState: CategoriesState = [{id: 1, name: 'Jerusalem'}];

export const CategoriesReducer =
  function(state: CategoriesState = initialState, action: Action): CategoriesState {
    let category;
    let filteredCategory;
  switch (action.type) {
    case CategoryActions.ADD_CATEGORY:
        category = (<CategoryActions.AddCategoryAction>action).category;
        // Insert random id for simple purpose
        category.id = Math.floor(1000 + Math.random() * 9000);
        return [... state, category];
      case CategoryActions.EDIT_CATEGORY:
          category = (<CategoryActions.AddCategoryAction>action).category;
          filteredCategory = state.filter((c) => {
              return c.id !== category.id;
          });
          return [... filteredCategory, category];
      case CategoryActions.DELETE_CATEGORY:
          const categoryId = (<CategoryActions.DeleteCategoryAction>action).categoryId;
          filteredCategory = state.filter((c) => {
              return c.id !== categoryId;
          });
          return filteredCategory;
    default:
      return state;
  }
};

// export const getOrdersState = (state): OrdersState => state.orders;

// export const getCustomer = createSelector(
//   getCustomersState,
//   ( state: CustomersState ) => state.customers );
