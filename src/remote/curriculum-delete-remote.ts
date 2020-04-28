import { curriculaClient } from "./CurriculaClient";
/**
 *
 * @param curriculum_id the parameter is the curriculum id which will be used by the remote server to delete the curriculum
 */
export const curriculaDeleteCurriculum = async (curriculum_id: number) => {
	try {
		let response = await curriculaClient.delete("/curriculum/" + curriculum_id);
		return response.data;
	} catch (e) {
		if (e.status === 500) {
			throw e;
		} else {
		}
	}
};
