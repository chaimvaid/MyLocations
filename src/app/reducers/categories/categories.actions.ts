import {
  Action,
  ActionCreator
} from 'redux';
import {
  Category
} from '../../interfaces/interfaces';


export const ADD_CATEGORY = '[Category] Add Category';
export interface AddCategoryAction extends Action {
  category: Category;
}
export const addCategory: ActionCreator<AddCategoryAction> =
  (category) => ({
    type: ADD_CATEGORY,
    category: category
  });

export const EDIT_CATEGORY = '[Category] Edit Category';
export interface EditCategoryAction extends Action {
    category: Category;
}
export const editCategory: ActionCreator<EditCategoryAction> =
    (category) => ({
        type: EDIT_CATEGORY,
        category: category
    });

export const DELETE_CATEGORY = '[Category] Delete Category';
export interface DeleteCategoryAction extends Action {
    categoryId: number;
}
export const deleteCategory: ActionCreator<DeleteCategoryAction> =
    (categoryId) => ({
        type: DELETE_CATEGORY,
        categoryId: categoryId
    });

