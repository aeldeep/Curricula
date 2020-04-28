import { AnyAction } from "redux";
import { ICreateCategoryState } from ".";
import { CreateCatTypes } from "../action-mappers/create-categories-action-mappers";
import { Category } from "../models/Category";


  
const initialState:ICreateCategoryState = {
    createCat: new Category (0,'',''), //createCategory
    errorMessage:''
}

export const createReducer = (state = initialState, action:AnyAction ) =>{
    switch (action.type) {
        case CreateCatTypes.CREATE_CATEGORY:{
            return {
                ...state,
                createCat:action.payload.createCat
            }
        }  
        case CreateCatTypes.FAILED_TO_CREATE_CATEGORY:{
            return {
                ...state,
            
                errorMessage:'Failed to Create The Category' //changed
            }
        } 
        default:
            return state;
            
            
    }
}




