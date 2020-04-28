import { Curriculum } from "../models/Curriculum"
import { curriculaGetCurriculumList } from "../remote/curriculum-create-remote";
import { Dispatch } from "redux";

/**
 * Result types for when failed
 */
export const curriculumListTypes = {
  CURRICULUM_LIST_SUCCESSFUL: "CURRICULUM_LIST_SUCCESSFUL",
  CURRICULUM_LIST_FAILED: "CURRICULUM_LIST_FAILED"
}
/**
 * Gets a list of curriculums from the database
 */
export const viewCurriculumListActionMapper = () => async (dispatch:Dispatch) => {
  try{
    const curriculumList:Array<Curriculum> = await curriculaGetCurriculumList();
    dispatch({
      type:curriculumListTypes.CURRICULUM_LIST_SUCCESSFUL,
      payload:{
        curriculumList
      }
    })
  }
  catch(e){
    dispatch({
      type:curriculumListTypes.CURRICULUM_LIST_FAILED,
      payload:{
        errorMessage: "Internal Server Error"
      }
    })
  }
}