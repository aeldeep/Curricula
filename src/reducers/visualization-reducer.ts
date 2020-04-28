import { IViewAllVisualizationsState } from ".";
import { visualizationTypes } from "../action-mappers/get-all-visualizations-action-mapper";
import { AnyAction } from "redux";
import { Visualization } from "../models/Visualization";
import { visualizationUpdateTypes } from "../action-mappers/update-visualization-action-mapper";


const initialState: IViewAllVisualizationsState = {
    allVisualizations:[],
    errorMessage:'',
    visualization: new Visualization(0,"",[]),
}

export const visualizationReducer = (state = initialState, action:AnyAction) =>{
    switch(action.type){
        case visualizationTypes.GET_ALL_VISUALIZATIONS:{
            return{
                ...state,
                allVisualizations: action.payload.allVisualizations
            }
        }
        case visualizationTypes.FAILED_TO_RETRIEVE_VISUALIZATIONS:{
            return{
                ...state,
                errorMessage:'Fail to Retrieve visualizations'
            }
        }
        case visualizationTypes.GET_ONE_VISUALIZATION:{
            return{
                ...state,
                visualization: action.payload.oneVisualization
            }
        }
        case visualizationTypes.FAILED_TO_RETRIEVE_ONE_VISUALIZATION:{
            return{
                ...state,
                errorMessage:'Failed to retrieve visualization'
            }
        }
        case visualizationUpdateTypes.UPDATE_VISUALIZATION_SUCCESSFUL:{
            return{
                ...state,
                visualization: action.payload.updatedVisualization
            }
        }
        case visualizationUpdateTypes.FAILED_TO_UPDATE_VISUALIZATION:{
            return{
                ...state,
                errorMessage:'Failed to Update Visualization'
            }
        }
        default:
            return state
    }
}