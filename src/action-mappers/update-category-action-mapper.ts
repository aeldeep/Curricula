import { Dispatch } from "redux";
import { Category } from "../models/Category";
import { updateCategory } from "../remote/category-remote";

export const updateCategoryTypes = {
  UPDATE_CATEGORY: "UPDATE_CATEGORY",
  FAILED_TO_UPDATE_CATEGORY: "FAILED_TO_UPDATE_CATEGORY"
};

export const updateCategoryActionMapper = (
  categoryId: number,
  categoryColor: string,
  categoryName: string
) => async (dispatch: Dispatch) => {
  // try to update category from a remote function
  try {
    let updatedCategory: Category = await updateCategory(
      categoryId,
      categoryColor,
      categoryName
    );
    //if we do call dispatch with the updated category
    dispatch({
      type: updateCategoryTypes.UPDATE_CATEGORY,
      payload: {
        updatedCategory
      }
    });
  } catch (e) {
    //catch any errors and dispatch a bad action
    dispatch({
      type: updateCategoryTypes.FAILED_TO_UPDATE_CATEGORY
    });
  }
  //function completes
};
