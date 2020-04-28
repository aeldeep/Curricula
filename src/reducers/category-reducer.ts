import { ICategoriesState } from ".";
import { AnyAction } from "redux";
import { Category } from "../models/Category";
import { updateCategoryTypes } from "../action-mappers/update-category-action-mapper";
import { categoriesTypes } from "../action-mappers/getall-categories-action-mappers";
import {deleteCategoryType} from '../action-mappers/delete-category-action-mappers'

const initialState: ICategoriesState = {
  allCategory: [],
  updatedCategory: new Category(0, "", ""),
  errorMessage: ""
};

export const categoriesReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case categoriesTypes.GET_ALL_CATEGORIES: {
      return {
        ...state,
        allCategory: action.payload.categoryArray
      };
    }
    case categoriesTypes.FAILED_TO_RETRIEVE_CATEGORIES: {
      return {
        ...state,
        errorMessage: "Failed to Retrieve Categories"
      };
    }
    case updateCategoryTypes.UPDATE_CATEGORY: {
      return {
        ...state,
        updatedCategory: action.payload.updatedCategory
      };
    }
    case updateCategoryTypes.FAILED_TO_UPDATE_CATEGORY: {
      return {
        ...state,
        errorMessage: "Failed to Update Category"
      };
    }

    case deleteCategoryType.SUCCESSFUL:{
      return {
        ...state,
        deleteCategoryById:action.payload.deletedCategory
      }
    }
    case deleteCategoryType.CATEGORY_NOT_FOUND:{
      return {
        ...state,
        errorMessage:"Failed to Delete Category"
      }
    }




    default:
      return state;
  }
};
