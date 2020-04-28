import { Dispatch } from "redux";
import { curriculaDeleteCurriculum } from "../remote/curriculum-delete-remote";
import { Curriculum } from "../models/Curriculum";
/**
 *   These are the result types that can happen in this action mapper
 */
export const deleteCurriculumTypes = {
	DELETE_CURRICULUM: "CURRICULA_DELETE_CURRICULUM",
	FAILED_TO_DELETE_CURRICULUM: "CURRICULA_FAILED_TO_DELETE_CURRICULUM",
};
/**
 * The action mapper calls a function to make a remote call to the server
 * @param curriculum_id uses this parameter to find the curriculum that will be deleted at the server
 * This function will call the server function to delete
 */
export const deleteCurriculumActionMapper = (curriculum_id: number) => async (
	dispatch: Dispatch
) => {
	try {
		let deleteCurriculum: Curriculum = await curriculaDeleteCurriculum(
			curriculum_id
		);
		dispatch({
			type: deleteCurriculumTypes.DELETE_CURRICULUM,
			payload: {
				deleteCurriculum,
			},
		});
		dispatch({
			type: deleteCurriculumTypes.FAILED_TO_DELETE_CURRICULUM,
			payload: {
				deleteCurriculum,
			},
		});
	} catch (e) {
		//todo
	}
};
