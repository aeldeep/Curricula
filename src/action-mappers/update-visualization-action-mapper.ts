import { Dispatch } from "redux"
import { updateVisualization } from "../remote/visualization-remote"
import { Visualization } from "../models/Visualization"


export const visualizationUpdateTypes ={
    UPDATE_VISUALIZATION_SUCCESSFUL: 'UPDATE_VISUALIZATION_SUCCESSFUL',
    FAILED_TO_UPDATE_VISUALIZATION: 'FAILED_TO_UPDATE_VISUALIZATION'
}

export const updateVisualizationActionMapper = (visualizationToUpdate:Visualization) => async (dispatch:Dispatch) => {
    try {
        let updatedVisualization = await updateVisualization(visualizationToUpdate)

        dispatch({
            type: visualizationUpdateTypes.UPDATE_VISUALIZATION_SUCCESSFUL,
            payload:{
                updatedVisualization
            }
        })
    }catch (e){
        dispatch({
            type:visualizationUpdateTypes.FAILED_TO_UPDATE_VISUALIZATION
        })
    }
}