import { Curriculum } from "../models/Curriculum";
// import { IDeleteCurriculumState } from ".";
// import { deleteCurriculumTypes } from "../action-mappers/delete-curriculum-action-mapper";
// import { AnyAction } from "redux";
// /**
//  * Initial states for the delete curriculum reducer
//  */
// const initialState: IDeleteCurriculumState = {
// 	deleteCurriculum: new Curriculum(0, "", []),
// 	errorMessage: "",
// };
// /**
//  * This is the delete curriculum reducer that will evaluate the action and return the corresponding state
//  * @param state The initial state
//  * @param action The action that will guide the Reducer response
//  */
// export const deleteCurriculumReducer = (
// 	state = initialState,
// 	action: AnyAction
// ) => {
// 	switch (action.type) {
// 		case deleteCurriculumTypes.DELETE_CURRICULUM: {
// 			return {
// 				...state,
// 				deleteCurriculum: action.payload.deleteCurriculum,
// 			};
// 		}
// 		case deleteCurriculumTypes.FAILED_TO_DELETE_CURRICULUM: {
// 			return {
// 				...state,
// 				errorMessage: action.payload.errorMessage,
// 			};
// 		}
// 		default:
// 			return state;
// 	}
// };
