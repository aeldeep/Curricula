import { Dispatch } from "redux";
import { CreateCategory } from "../remote/category-remote";


export const CreateCatTypes = {
    CREATE_CATEGORY: 'CAT_CREATE_CATEGORY',
    FAILED_TO_CREATE_CATEGORY:'CAT_FAIL_TO_CREATE_CATEGORY'
}



export const createCatActionMapper = ( categoryId:number, categoryColor:string, categoryName:string) => async  (dispatch:Dispatch) => {
    try {
     //   console.log(categoryColor, categoryName, categoryId);
        let createCat = await CreateCategory(categoryId, categoryColor, categoryName)
        console.log(createCat);
        dispatch({
          type:  CreateCatTypes.CREATE_CATEGORY,
          payload:{
            createCat
          }
        })
    }catch(e){
        console.log('error in action mapper'+e);
       
            dispatch({
                type:CreateCatTypes.FAILED_TO_CREATE_CATEGORY,
            })
        }
    }