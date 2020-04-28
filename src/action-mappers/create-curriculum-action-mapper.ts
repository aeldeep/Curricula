import { Curriculum } from "../models/Curriculum"
import { curriculaCreateCurriculum } from "../remote/curriculum-create-remote"
import { Dispatch } from "redux";

/**
 * Result types that could occur
 */
export const curriculumTypes = {
  CREATE_CURRICULUM: "CURRICULA_CREATE_CURRICULUM",
  FAILED_TO_CREATE_CURRICULUM: "CURRICULA_FAILED_TO_CREATE_CURRICULUM"
}
/**
 * Action Mapper to create a curriculum and dispatch the results.
 * @param {Curriculum} curriculum Takes in a curriculum to create
 */
export const createCurriculumActionMapper = (curriculum:Curriculum) => async (dispatch:Dispatch) => {
  try{
    let createCurriculum = await curriculaCreateCurriculum(curriculum);
    dispatch({
      type:curriculumTypes.CREATE_CURRICULUM,
      payload:{
        createCurriculum
      }
    })
  }
  catch(e){
    //TODO Throw internal server error
    dispatch({
      type:curriculumTypes.FAILED_TO_CREATE_CURRICULUM,
      payload:{
        errorMessage: "Internal Server Error"
      }
    })
  }
}