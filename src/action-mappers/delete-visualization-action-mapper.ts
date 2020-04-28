import { Dispatch } from "redux"
import { deleteVisualization } from "../remote/visualization-remote"


export const deleteVisualizationType ={
    SUCCESSFUL_DELETE_VISUALIZATION: 'SUCCESSFUL_DELETE_VISUALIZATION',
    FAILED_DELETE_VISUALIZATION: 'FAILED_DELETE_VISUALIZATION'
}

export const deleteOneVisualizationActinoMapper = (id:number) => async (dispatch:Dispatch)=>{
    try {
        let deletedVisualization = await deleteVisualization(id)
        dispatch({
            type: deleteVisualizationType.SUCCESSFUL_DELETE_VISUALIZATION,
            payload:{
                deletedVisualization //empty Visualization
            }
        })
    } catch (e) {
        if(e.status === 404){
            dispatch({
                type: deleteVisualizationType.FAILED_DELETE_VISUALIZATION
            })
        }
    }
}