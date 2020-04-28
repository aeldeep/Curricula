import { Dispatch } from "redux";
import { deleteCategoryById } from '../remote/category-remote'


export const deleteCategoryType = {
    SUCCESSFUL : 'DELETE_CATEGORY',
    CATEGORY_NOT_FOUND: 'DELETE_CATEGORY_NOT_FOUND',
    INTERNAL_SERVER: 'DELETE_CATEGORY_INTERNAL_SERVER_ERROR'
}

export const CategoryDeleteByIdActionMapper = (categoryId:number) => async  (dispatch:Dispatch) => {
    try{
        let deletedCategory  = await deleteCategoryById(categoryId)   // returned type == void or 200 OK ???
        dispatch({
            type:  deleteCategoryType.SUCCESSFUL,
            payload:{
                deletedCategory     //   should return object or id  or ===void=== ???
            }
        })
    }catch(e){
        if(e.status === 404){
            dispatch({
                type:  deleteCategoryType.CATEGORY_NOT_FOUND
            })
        }else {
            dispatch({
                type:  deleteCategoryType.INTERNAL_SERVER
            })
        }
    }

}