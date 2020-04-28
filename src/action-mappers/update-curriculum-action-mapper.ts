import { Curriculum } from "../models/Curriculum";
import { Dispatch } from "redux";
import { curriculaUpdateCurriculum } from "../remote/curriculum-update-remote";

export const updateCurriculumTypes = {
    UPDATE_CURRICULUM: "CURRICULA_VIEW_AND_UPDATE_CURRICULUM",
    FAILED_TO_VIEW_AND_UPDATE_CURRICULUM: "CURRICULA_FAILED_TO_VIEW_AND_UPDATE_CURRICULUM"
}

/**
 * Updates a curriculum in the database. 
 * @param curriculum 
 */
export const updateCurriculumActionMapper = (curriculum:Curriculum) => async (dispatch:Dispatch) => {
    try {
        let updateCurriculum = await curriculaUpdateCurriculum(curriculum);
        dispatch({
            type: updateCurriculumTypes.UPDATE_CURRICULUM,
            payload:{
                updateCurriculum
            }
        })
        dispatch({
            type: updateCurriculumTypes.FAILED_TO_VIEW_AND_UPDATE_CURRICULUM,
            payload:{
                updateCurriculum
            }
        })
    } catch (e) {
        //todo
    }
}