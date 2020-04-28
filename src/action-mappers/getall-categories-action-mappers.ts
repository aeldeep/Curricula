import { Dispatch } from "redux";
import { FetchAllCategories } from '../remote/category-remote'


export const categoriesTypes = {
    GET_ALL_CATEGORIES: 'PROJECT-2_GET_ALL_CATEGORIES',
    FAILED_TO_RETRIEVE_CATEGORIES:'PROJECT-2_FAILED_TO_RETRIEVE_CATEGORIES'
}



export const getAllCategoriesActionMapper = () => async (dispatch:Dispatch) => {
    // try to get all categories from a remote function
    try{
        let categoryArray = await FetchAllCategories()
        //if we do call dispatch with those categories
        dispatch({
            type: categoriesTypes.GET_ALL_CATEGORIES,
            payload:{
                     categoryArray
                    }
        })
    } catch (e){
            //catch any errors and dispatch a bad action
        dispatch({
            type:categoriesTypes.FAILED_TO_RETRIEVE_CATEGORIES
        })
    }
    //function completes
}
