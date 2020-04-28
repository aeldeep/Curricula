import { Curriculum } from "../models/Curriculum";
import { IDeleteCategoryByIdState } from '.';
import {deleteCategoryType} from '../action-mappers/delete-category-action-mappers'
import { AnyAction } from "redux";


const initialState: IDeleteCategoryByIdState = {
    deleteCategoryById: 0,
    errorMessage:''
  }


  
  export const deleteCategoryByIdReducer = (state=initialState,action:AnyAction)=>{

    switch(action.type){
        case deleteCategoryType.SUCCESSFUL:{
          return {
            ...state,
            deleteCategoryById:action.payload.deletedCategory
          }
        }
        case deleteCategoryType.CATEGORY_NOT_FOUND:{
          return {
            ...state,
            errorMessage:action.payload.errorMessage
          }
        }
        default: return state;
      }
    }

