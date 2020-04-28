import { Dispatch } from "redux"
import { getAllVisualizations, getOneVisualization } from "../remote/visualization-remote"



export const visualizationTypes = {
    GET_ALL_VISUALIZATIONS: 'GET_ALL_VISUALIZATIONS',
    GET_ONE_VISUALIZATION: 'GET_ONE_VISUALIZATION',
    FAILED_TO_RETRIEVE_VISUALIZATIONS: 'FAILED_TO_RETRIEVE_VISUALIZATIONS',
    FAILED_TO_RETRIEVE_ONE_VISUALIZATION: 'FAILED_TO_RETRIEVE_ONE_VISUALIZATION'
}

export const getAllVisualizationsActionMapper = () => async (dispatch:Dispatch) => {
    try {
        let allVisualizations = await getAllVisualizations()

        dispatch({
            type: visualizationTypes.GET_ALL_VISUALIZATIONS,
            payload:{
                allVisualizations
            }
        })
    } catch (e) {
        dispatch({
            type:visualizationTypes.FAILED_TO_RETRIEVE_VISUALIZATIONS
        })
    }
}

export const getOneVisualizationActionMapper = (id:number) => async (dispatch:Dispatch) => {
try {
    let oneVisualization = await getOneVisualization(id)

    dispatch({
        type: visualizationTypes.GET_ONE_VISUALIZATION,
        payload:{
            oneVisualization
        }
    })
} catch (e) {
    dispatch({
        type:visualizationTypes.FAILED_TO_RETRIEVE_ONE_VISUALIZATION
    })
}


}