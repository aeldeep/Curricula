import { Dispatch } from "redux";
import { curriculaGetCurriculum } from "../remote/curriculum-update-remote";
import { Curriculum } from "../models/Curriculum";
/**
 * Type that could get back from the controller
 */
export const getCurriculumTypes = {
    GET_CURRICULUM: "CURRICULA_GET_CURRICULUM",
    FAILED_TO_GET_CURRICULUM: "CURRICULA_FAILED_TO_GET_CURRICULUM"
}
/**
 * Gets back a curriculum from the database, and sends back the curriculum
 * @param {number} curriculum_id Id of curriculum
 */
export const getCurriculumByIdActionMapper = (curriculum_id:number) => async (dispatch:Dispatch) => {
    try {
        let curriculum:Curriculum = await curriculaGetCurriculum(curriculum_id);
        dispatch({
            type: getCurriculumTypes.GET_CURRICULUM,
            payload:{
                curriculum
            }
        })
    } catch (e) {
        dispatch({
            type: getCurriculumTypes.FAILED_TO_GET_CURRICULUM,
            payload:{
              errorMessage: "Internal Server Error" + e
            }
        })
    }
}